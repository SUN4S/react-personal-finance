export interface ReportsState {
  totalAmount: number;
  essentialsAmount: number;
  wantsAmount: number;
  cultureAmount: number;
  unexpectedAmount: number;
  fromDate: string;
  toDate: string;
  _id: string;
}

export interface ReportsFetchState {
  data: ReportsState[];
}

export interface WeeklyChangeChartProps {
  amount: number;
  date: string;
}
