import { BudgetState } from "./budget";
import { ExpenseState } from "./expenses";

export interface BudgetChartProps {
  budgetData: BudgetState;
  expenseData: Array<ExpenseState>;
  budgetIsFetching: boolean;
  budgetIsSuccess: boolean;
  expenseIsFetching: boolean;
  expenseIsSuccess: boolean;
}

export interface ExpenseChartProps {
  expenseData: Array<ExpenseState>;
  expenseIsFetching: boolean;
  expenseIsSuccess: boolean;
}
