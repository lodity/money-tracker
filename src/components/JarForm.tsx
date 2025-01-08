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
import { DetailedJar, Jar } from '../types/jar';
import { CurrencyApi } from '../api/currency';

interface JarFormProps {
  onCompleted: (jar: DetailedJar) => void;
  editData?: Jar;
  onClose: () => void;
}

const JarForm: FC<JarFormProps> = ({ onCompleted, onClose, editData }) => {
  const [jar, setJar] = useState<CreateJarRequest>({
    name: '',
    target: 0,
    targetCurrency: '',
  });
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isTargetTouched, setIsTargetTouched] = useState(false);

  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isNameError = jar.name.trim() === '';
  const isTargetError = jar.target <= 0 || Number.isNaN(jar.target);

  const handleBlurName = () => setIsNameTouched(true);
  const handleBlurTarget = () => setIsTargetTouched(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setJar((prev) => ({
      ...prev,
      name: e.target.value,
    }));

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setJar((prev) => ({
      ...prev,
      target: e.target.valueAsNumber,
    }));

  const handleTargetCurrencyChange = (currency: string | null) =>
    setJar((prev) => ({
      ...prev,
      targetCurrency: currency ?? '',
    }));

  const handleCreateJar = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await JarApi.create(jar);
      onCompleted(res.data.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditJar = async (e: React.FormEvent) => {
    if (!editData) return;
    e.preventDefault();

    try {
      const res = await JarApi.update(editData.id, jar);
      onCompleted(res.data.data);
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

  useEffect(() => {
    if (!editData) return;

    setJar({
      name: editData.name,
      target: editData.target,
      targetCurrency: editData.targetCurrency,
    });
  }, [editData]);

  return (
    <form onSubmit={editData ? handleEditJar : handleCreateJar}>
      <VStack>
        <FormControl isInvalid={isNameError && isNameTouched}>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            value={jar.name}
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
            value={jar.target}
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
            selectedOption={jar.targetCurrency}
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
          {editData ? 'Update' : 'Create'}
        </Button>
      </VStack>
    </form>
  );
};

export default JarForm;
