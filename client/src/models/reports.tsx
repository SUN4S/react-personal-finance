export interface WeeklyReportsState {
  totalAmount: number;
  essentialsAmount: number;
  wantsAmount: number;
  cultureAmount: number;
  unexpectedAmount: number;
  fromDate: string;
  toDate: string;
  _id: string;
}

export interface MonthlyReportsState {
  totalAmount: number;
  essentialsAmount: number;
  wantsAmount: number;
  cultureAmount: number;
  unexpectedAmount: number;
  monthDate: string;
  _id: string;
}

export interface WeeklyReportsFetchState {
  data: WeeklyReportsState[];
}

export interface MonthlyReportsFetchState {
  data: MonthlyReportsState[];
}
export interface WeeklyChangeChartProps {
  amount: number;
  date: string;
}
