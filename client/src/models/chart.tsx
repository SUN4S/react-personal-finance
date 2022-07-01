import { BudgetState } from "./budget";
import { ExpenseState } from "./expenses";
import { ReportsState } from "./reports";

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
  weeklyData: Array<ReportsState>;
  weeklyIsFetching: boolean;
  weeklyIsSuccess: boolean;
}
