export enum TransactionType {
  Inflow,
  Outflow,
}

export type Transaction = {
  id: number;
  amount: number;
  currency: string;
  type: TransactionType;
  comment: string;
  createdAt: string;
};
