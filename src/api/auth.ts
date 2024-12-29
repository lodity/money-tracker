import { apiClient } from '../client/apiClient';
import {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
} from '../types/api/authApi';

export class AuthApi {
  static async signIn(dto: SignInRequest) {
    return await apiClient.post<SignInRequest, AuthResponse>(
      `v1/auth/sign-in`,
      {
        dto,
      },
    );
  }

  static async signUp(dto: SignUpRequest) {
    return await apiClient.post<SignUpRequest, AuthResponse>(
      `v1/auth/sign-up`,
      {
        dto,
      },
    );
  }
}
