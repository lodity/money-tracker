import { Transaction, TransactionType } from '../transaction';
import { ApiResponse } from './baseApi';

export type CreateTransaction = {
  amount: number;
  type: TransactionType;
  currency: string;
  storeId: number;
  comment?: string;
};

export type CreateTransactionResponse = ApiResponse<Transaction>;
