import { apiClient } from '../client/apiClient';
import {
  CreateTransaction,
  CreateTransactionResponse,
  GetTransactionResponse,
} from '../types/api/transactionApi';

export class TransactionApi {
  static async create(dto: CreateTransaction, token: string) {
    return await apiClient.post<CreateTransaction, CreateTransactionResponse>(
      `v1/transactions`,
      dto,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }

  static async get(
    limit: number,
    offset: number,
    token: string,
    jarId?: number,
  ) {
    return await apiClient.get<void, GetTransactionResponse>(
      `v1/transactions?limit=${limit}&offset=${offset}${jarId !== undefined ? `&jarId=${jarId}` : ''}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }
}
