import { apiClient } from '../client/apiClient';
import { GetCurrenciesResponse } from '../types/api/currencyApi';

export class CurrencyApi {
  static async getAll(token: string) {
    return await apiClient.get<void, GetCurrenciesResponse>(`v1/currencies`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
