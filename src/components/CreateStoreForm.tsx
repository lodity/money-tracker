import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { CurrencyApi } from '../api/currency';
import { Store } from '../types/store';
import { CreateStoreRequest } from '../types/api/storeApi';
import { StoreApi } from '../api/store';
import { useAuth } from '../hooks/useAuth';

interface CreateStoreFormProps {
  onStoreCreated: (store: Store) => void;
  jarId: number;
  onClose: () => void;
}

const CreateStoreForm: FC<CreateStoreFormProps> = ({
  onStoreCreated,
  jarId,
  onClose,
}) => {
  const [createStore, setCreateStore] = useState<CreateStoreRequest>({
    name: '',
    jarId,
  });
  const [isNameTouched, setIsNameTouched] = useState(false);

  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useAuth();

  const isNameError = createStore.name.trim() === '';

  const handleBlurName = () => setIsNameTouched(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCreateStore((prev) => ({
      ...prev,
      name: e.target.value,
    }));

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    const newStore: CreateStoreRequest = { ...createStore };

    try {
      const res = await StoreApi.create(newStore, currentUser.token);
      onStoreCreated(res.data.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const fetchOptions = async () => {
      try {
        const response = await CurrencyApi.getAll(currentUser.token);
        setOptions(response.data.data.map((option) => option.name));
      } catch (e) {
        console.error(e);
        setError('Failed to load options');
      }
    };

    fetchOptions();
  }, [currentUser]);

  return (
    <form onSubmit={handleCreateStore}>
      <VStack>
        <FormControl isInvalid={isNameError && isNameTouched}>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            value={createStore.name}
            placeholder="Enter name"
            onChange={handleNameChange}
            onBlur={handleBlurName}
          />
          {isNameError && (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
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

export default CreateStoreForm;
