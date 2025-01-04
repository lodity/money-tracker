import { DetailedJar, Jar } from '../jar';
import { ApiResponse } from './baseApi';

export type CreateJarRequest = {
  name: string;
  target: number;
  targetCurrency: string;
};

export type UpdateJarRequest = {
  name?: string;
  target?: number;
  targetCurrency?: string;
};

export type CreateJarResponse = ApiResponse<Jar>;
export type GetAllJarResponse = ApiResponse<Jar[]>;
export type DetailedJarResponse = ApiResponse<DetailedJar>;
