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
import SelectMenu from './UI/SelectMenu';
import { CreateTransaction } from '../types/api/transactionApi';
import { Transaction, TransactionType } from '../types/transaction';
import { TransactionApi } from '../api/transaction';

interface CreateTransactionFormProps {
  onTransactionCreated: (transaction: Transaction) => void;
  storeId: number;
  onClose: () => void;
}

const CreateTransactionForm: FC<CreateTransactionFormProps> = ({
  onTransactionCreated,
  storeId,
  onClose,
}) => {
  const [createTransaction, setCreateTransaction] = useState<CreateTransaction>(
    {
      amount: 0,
      type: TransactionType.Inflow,
      currency: '',
      storeId,
      comment: '',
    },
  );
  const [isAmountTouched, setIsAmountTouched] = useState(false);

  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isAmountError =
    createTransaction.amount <= 0 || Number.isNaN(createTransaction.amount);

  const handleBlurAmount = () => setIsAmountTouched(true);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCreateTransaction((prev) => ({
      ...prev,
      amount: e.target.valueAsNumber,
    }));

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCreateTransaction((prev) => ({
      ...prev,
      comment: e.target.value,
    }));

  const handleTransactionCurrencyChange = (currency: string | null) =>
    setCreateTransaction((prev) => ({
      ...prev,
      currency: currency ?? '',
    }));

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: CreateTransaction = { ...createTransaction };

    try {
      const res = await TransactionApi.create(newTransaction);
      onTransactionCreated(res.data.data);
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
    <form onSubmit={handleCreateTransaction}>
      <VStack>
        <FormControl isInvalid={isAmountError && isAmountTouched}>
          <FormLabel>Amount:</FormLabel>
          <Input
            type="number"
            value={createTransaction.amount}
            placeholder="Enter amount"
            onChange={handleAmountChange}
            onBlur={handleBlurAmount}
          />
          {isAmountError && (
            <FormErrorMessage>Amount is required.</FormErrorMessage>
          )}
        </FormControl>
        <SelectMenu
          options={options}
          selectedOption={createTransaction.currency}
          setSelectedOption={handleTransactionCurrencyChange}
        />
        <FormControl>
          <FormLabel>Comment:</FormLabel>
          <Input
            type="string"
            value={createTransaction.comment}
            placeholder="Enter comment"
            onChange={handleCommentChange}
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

export default CreateTransactionForm;
