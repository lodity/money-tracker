import { apiClient } from '../client/apiClient';
import {
  CreateTransaction,
  CreateTransactionResponse,
  GetTransactionResponse,
} from '../types/api/transactionApi';

export class TransactionApi {
  static async create(dto: CreateTransaction) {
    return await apiClient.post<CreateTransaction, CreateTransactionResponse>(
      `v1/stores`,
      dto,
    );
  }
  static async get(limit: number, offset: number, storeId?: number) {
    return await apiClient.get<void, GetTransactionResponse>(
      `v1/transactions?limit=${limit}&offset=${offset}${storeId != null ? `&storeId=${storeId}` : ''}`,
    );
  }
}
