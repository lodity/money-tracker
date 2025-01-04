import { CurrencyBalance } from './currency';

export type Store = {
  id: number;
  name: string;
  balance: number;
};
export type DetailedStore = Store & {
  balances: CurrencyBalance[];
};
