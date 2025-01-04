import { CurrencyBalance } from './currency';
import { DetailedStore, Store } from './store';

export type Jar = {
  id: number;
  name: string;
  balance: number;
  target: number;
  targetCurrency: string;
};

export type DetailedJar = Jar & {
  currencies: CurrencyBalance[];
  stores: DetailedStore[];
};
