import { ExpenseState } from "./expenses";

export interface BudgetState {
  _id?: string;
  budget: number;
  budgetDate: string;
}

export interface BudgetProps {
  budgetData: BudgetState;
  expenseData: Array<ExpenseState>;
  budgetIsFetching: boolean;
  budgetIsSuccess: boolean;
  expenseIsFetching: boolean;
  expenseIsSuccess: boolean;
}

export interface BudgetFormState {
  budget: number;
}

export interface BudgetFetchState {
  data: BudgetState;
}
