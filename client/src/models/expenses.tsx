import { DateTime } from "luxon/src/datetime";

export interface ExpenseState {
  _id?: string;
  category: string;
  amount: number;
  date: string;
  tags?: Array<string>;
  description?: string;
  receipt?: string;
}

export interface ExpenseFormState {
  category: string;
  amount: number;
  date: string;
  tags?: string;
  description?: string;
  receipt?: File | Blob | string;
}

export interface ExpenseModalState {
  isOpen: boolean;
  editable?: boolean;
  data?: {
    _id?: string;
    category: string;
    amount: number;
    date: string;
    tags?: Array<string>;
    description?: string;
    receipt?: string;
  };
}

export interface ExpenseFetchState {
  data: ExpenseState[];
}

export interface ExpenseDeleteId {
  _id: string;
  receipt: string;
}
