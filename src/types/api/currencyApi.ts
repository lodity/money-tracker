import { ApiResponse } from './baseApi';
import { Currency } from '../currency';

export type GetCurrenciesResponse = ApiResponse<Currency[]>;