import { apiClient } from '../client/apiClient';
import {
  CreateJarRequest,
  CreateJarResponse,
  GetAllJarResponse,
} from '../types/api/jarApi';

export class JarApi {
  static async create(dto: CreateJarRequest) {
    return await apiClient.post<CreateJarRequest, CreateJarResponse>(
      `v1/jars`,
      {
        dto,
      },
    );
  }

  static async getAll(token: string) {
    return await apiClient.get<void, GetAllJarResponse>(`v1/jars`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
