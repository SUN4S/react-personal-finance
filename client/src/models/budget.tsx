import { ExpenseState } from "./expenses";

export interface BudgetState {
  _id?: string;
  budget: number;
  budgetDate: string;
}

export interface BudgetProps {
  budgetData: Array<BudgetState>;
  expenseData: Array<ExpenseState>;
  budgetIsFetching: boolean;
  budgetIsSuccess: boolean;
  expenseIsFetching: boolean;
  expenseIsSuccess: boolean;
}
