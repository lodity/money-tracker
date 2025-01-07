import { DetailedJar, Jar } from '../jar';
import { ApiResponse } from './baseApi';

export type CreateJarRequest = {
  name: string;
  target: number;
  targetCurrency: string;
};

export type UpdateJarRequest = CreateJarRequest;

export type CreateJarResponse = ApiResponse<DetailedJar>;
export type GetAllJarResponse = ApiResponse<Jar[]>;
export type DetailedJarResponse = ApiResponse<DetailedJar>;
