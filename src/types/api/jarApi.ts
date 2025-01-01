import { Jar } from '../jar';
import { ApiResponse } from './baseApi';

export type CreateJarRequest = {
  name: string;
  target: number;
  targetCurrencyId: number;
};



export type CreateJarResponse = ApiResponse<Jar>;
export type GetAllJarResponse = ApiResponse<Jar[]>;
