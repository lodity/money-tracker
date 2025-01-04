import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { JarApi } from '../api/jar';
import { CreateJarRequest } from '../types/api/jarApi';
import SelectMenu from './UI/SelectMenu';
import { Jar } from '../types/jar';
import { CurrencyApi } from '../api/currency';

interface CreateJarFormProps {
  onJarCreated: (jar: Jar) => void;
  onClose: () => void;
}

const CreateJarForm: FC<CreateJarFormProps> = ({ onJarCreated, onClose }) => {
  const [createJar, setCreateJar] = useState<CreateJarRequest>({
    name: '',
    target: 0,
    targetCurrency: '',
  });
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isTargetTouched, setIsTargetTouched] = useState(false);

  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isNameError = createJar.name.trim() === '';
  const isTargetError = createJar.target <= 0 || Number.isNaN(createJar.target);

  const handleBlurName = () => setIsNameTouched(true);
  const handleBlurTarget = () => setIsTargetTouched(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCreateJar((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCreateJar((prev) => ({
      ...prev,
      target: e.target.valueAsNumber,
    }));

  const handleTargetCurrencyChange = (currency: string | null) =>
    setCreateJar((prev) => ({
      ...prev,
      targetCurrency: currency ?? '',
    }));

  const handleCreateJar = async (e: React.FormEvent) => {
    e.preventDefault();
    const newJar: CreateJarRequest = { ...createJar };

    try {
      const res = await JarApi.create(newJar);
      onJarCreated(res.data.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await CurrencyApi.getAll();
        setOptions(response.data.data.map((option) => option.name));
      } catch (e) {
        console.error(e);
        setError('Failed to load options');
      }
    };

    fetchOptions();
  }, []);

  return (
    <form onSubmit={handleCreateJar}>
      <VStack>
        <FormControl isInvalid={isNameError && isNameTouched}>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            value={createJar.name}
            placeholder="Enter name"
            onChange={handleNameChange}
            onBlur={handleBlurName}
          />
          {isNameError && (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isTargetError && isTargetTouched}>
          <FormLabel>Target:</FormLabel>
          <Input
            type="number"
            value={createJar.target}
            placeholder="Enter target"
            onChange={handleTargetChange}
            onBlur={handleBlurTarget}
          />
          {isTargetError && (
            <FormErrorMessage>Target is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Currency:</FormLabel>
          <SelectMenu
            options={options}
            selectedOption={createJar.targetCurrency}
            setSelectedOption={handleTargetCurrencyChange}
          />
        </FormControl>
        <Button
          type="submit"
          display="block"
          colorScheme="blue"
          w="100px"
          mt="10px"
          mb="8px"
          ml="auto"
        >
          Create
        </Button>
      </VStack>
    </form>
  );
};

export default CreateJarForm;
