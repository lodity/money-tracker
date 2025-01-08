import { apiClient } from '../client/apiClient';
import {
  CreateTransaction,
  CreateTransactionResponse,
} from '../types/api/transactionApi';

export class TransactionApi {
  static async create(dto: CreateTransaction) {
    return await apiClient.post<CreateTransaction, CreateTransactionResponse>(
      `v1/transactions`,
      dto,
    );
  }
}
