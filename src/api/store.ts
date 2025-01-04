import { apiClient } from '../client/apiClient';
import { CreateStoreRequest, CreateStoreResponse } from '../types/api/storeApi';

export class StoreApi {
  static async create(dto: CreateStoreRequest) {
    return await apiClient.post<CreateStoreRequest, CreateStoreResponse>(
      `v1/stores`,
      dto,
    );
  }
}
