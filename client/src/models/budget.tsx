export interface BudgetState {
  _id?: string;
  budget: number;
  budgetDate: string;
}

export interface BudgetProps {
  data: Array<BudgetState>;
  isFetching: boolean;
  isSuccess: boolean;
}
