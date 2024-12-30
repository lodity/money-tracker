import { apiClient } from '../client/apiClient';
import { AuthResponse, AuthRequest } from '../types/api/authApi';

export class AuthApi {
  static async signIn(dto: AuthRequest) {
    return await apiClient.post<AuthRequest, AuthResponse>(`v1/auth/sign-in`, {
      dto,
    });
  }

  static async signUp(dto: AuthRequest) {
    return await apiClient.post<AuthRequest, AuthResponse>(`v1/auth/sign-up`, {
      dto,
    });
  }
}
