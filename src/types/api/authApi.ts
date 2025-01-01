import { ApiResponse } from './baseApi';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
};

export type AuthResponse = ApiResponse<{
  token: string;
}>;
