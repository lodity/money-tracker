import { ApiResponse } from './baseApi';

export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = ApiResponse<{
  token: string;
}>;
