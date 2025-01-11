import { apiClient } from '../client/apiClient';
import {
  CreateJarRequest,
  CreateJarResponse,
  GetAllJarResponse,
  DetailedJarResponse,
  UpdateJarRequest,
} from '../types/api/jarApi';

export class JarApi {
  static async create(dto: CreateJarRequest, token: string) {
    return await apiClient.post<CreateJarRequest, CreateJarResponse>(
      `v1/jars`,
      dto,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }

  static async getAll(token: string) {
    return await apiClient.get<void, GetAllJarResponse>(`v1/jars`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static async getById(id: number, token: string) {
    return await apiClient.get<void, DetailedJarResponse>(`v1/jars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static async update(id: number, dto: UpdateJarRequest, token: string) {
    return await apiClient.patch<UpdateJarRequest, DetailedJarResponse>(
      `v1/jars/${id}`,
      dto,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }

  static async delete(id: number, token: string) {
    return await apiClient.delete<void, DetailedJarResponse>(`v1/jars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
