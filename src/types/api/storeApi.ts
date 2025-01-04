import { ApiResponse } from './baseApi';
import { Store } from '../store';

export type CreateStoreRequest = {
  name: string;
  jarId: number;
};

export type CreateStoreResponse = ApiResponse<Store>;
