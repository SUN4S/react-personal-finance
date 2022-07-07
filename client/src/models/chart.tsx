import { BudgetState } from "./budget";
import { ExpenseState } from "./expenses";
import { WeeklyReportsState } from "./reports";

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

export interface WeeklyReportsProps {
  weeklyData: Array<WeeklyReportsState>;
  weeklyIsFetching: boolean;
  weeklyIsSuccess: boolean;
}
