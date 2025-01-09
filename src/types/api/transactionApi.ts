import { Transaction, TransactionType } from '../transaction';
import { ApiResponse, PaginatedApiResponse } from './baseApi';

export type CreateTransaction = {
  amount: number;
  type: TransactionType;
  currency: string;
  storeId: number;
  comment?: string;
};

export type CreateTransactionResponse = ApiResponse<Transaction>;
export type GetTransactionResponse = ApiResponse<
  {
    transactions: Transaction[];
  } & PaginatedApiResponse
>;
