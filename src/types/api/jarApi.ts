import { Jar } from '../jar';

export type CreateJarRequest = {
  name: string;
  target: number;
  targetCurrencyId: number;
};

export type CreateJarResponse = Jar;

export type GetAllJarResponse = {
  success: boolean;
  statusCode: number;
  data: Jar[];
};
