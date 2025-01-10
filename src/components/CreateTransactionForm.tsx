import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
  storeBalance: number;
  storeId: number;
  onClose: () => void;
}

const CreateTransactionForm: FC<CreateTransactionFormProps> = ({
  onTransactionCreated,
  storeBalance,
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
    createTransaction.amount <= 0 ||
    Number.isNaN(createTransaction.amount) ||
    (createTransaction.type === TransactionType.Outflow &&
      createTransaction.amount > storeBalance);

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

  const handleCreateTransaction = async (
    e: React.FormEvent,
    transactionType: TransactionType,
  ) => {
    e.preventDefault();
    const newTransaction: CreateTransaction = {
      ...createTransaction,
      type: transactionType,
    };

    if (
      transactionType === TransactionType.Outflow &&
      newTransaction.amount > storeBalance
    ) {
      setError('Insufficient funds for this transaction.');
      return;
    }

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
    <form>
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
            <FormErrorMessage>
              {createTransaction.type === TransactionType.Outflow &&
              createTransaction.amount > storeBalance
                ? 'Insufficient funds.'
                : 'Amount is required.'}
            </FormErrorMessage>
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
        <HStack>
          <Button
            onClick={(e) => handleCreateTransaction(e, TransactionType.Outflow)}
            type="submit"
            display="block"
            colorScheme="red"
            w="100px"
            mt="10px"
            mb="8px"
            ml="auto"
            background="red.400"
          >
            Outflow
          </Button>
          <Button
            onClick={(e) => handleCreateTransaction(e, TransactionType.Inflow)}
            type="submit"
            display="block"
            colorScheme="blue"
            w="100px"
            mt="10px"
            mb="8px"
            ml="auto"
          >
            Inflow
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default CreateTransactionForm;
