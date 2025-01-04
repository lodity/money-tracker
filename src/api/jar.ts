import { apiClient } from '../client/apiClient';
import {
  CreateJarRequest,
  CreateJarResponse,
  GetAllJarResponse,
  DetailedJarResponse,
  UpdateJarRequest,
} from '../types/api/jarApi';

export class JarApi {
  static async create(dto: CreateJarRequest) {
    return await apiClient.post<CreateJarRequest, CreateJarResponse>(
      `v1/jars`,
      dto,
    );
  }

  static async getAll() {
    return await apiClient.get<void, GetAllJarResponse>(`v1/jars`);
  }

  static async getById(id: number) {
    return await apiClient.get<void, DetailedJarResponse>(`v1/jars/${id}`);
  }

  static async update(id: number, dto: UpdateJarRequest) {
    return await apiClient.patch<UpdateJarRequest, DetailedJarResponse>(
      `v1/jars/${id}`,
      dto,
    );
  }

  static async delete(id: number) {
    return await apiClient.delete<void, DetailedJarResponse>(`v1/jars/${id}`);
  }
}
