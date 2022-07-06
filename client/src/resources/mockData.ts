export const mockExpense = [
  {
    category: "Unexpected",
    amount: 10,
    date: "2022-06-19T03:00:00.000+00:00",
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "",
  },
  {
    category: "Wants",
    amount: 16.5,
    date: "2022-06-18T03:00:00.000+00:00",
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "fake-img.jpg",
  },
  {
    category: "Essentials",
    amount: 160,
    date: "2022-06-15T03:00:00.000+00:00",
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "",
  },
  {
    category: "Culture",
    amount: 50.99,
    date: "2022-06-17T03:00:00.000+00:00",
    description: "This is a random description",
    tags: ["Dog", "Cat", "Cake"],
    receipt: "fake-img.jpg",
  },
];

export const mockBudget = {
  _id: "1234",
  budget: 645,
  budgetDate: "2022-06",
};

export const barChartData = [
  { name: "Essentials", value: 60 },
  { name: "Wants", value: 15.24 },
  { name: "Culture", value: 20 },
  { name: "Unexpected", value: 8 },
];

export const weeklyReportsData = [
  {
    totalAmount: 489,
    essentialsAmount: 205,
    wantsAmount: 51,
    cultureAmount: 200,
    unexpectedAmount: 30,
    fromDate: "2022-06-12T03:00:00.000+00:00",
    toDate: "2022-06-19T03:00:00.000+00:00",
    _id: "62bdf0685ef4725a57d4a6c4",
  },
  {
    totalAmount: 544,
    essentialsAmount: 301,
    wantsAmount: 40,
    cultureAmount: 100,
    unexpectedAmount: 103,
    fromDate: "2022-06-19T03:00:00.000+00:00",
    toDate: "2022-06-26T03:00:00.000+00:00",
    _id: "62bdf0685ef4725a57d4d984",
  },
];

export const weeklyChangeChartData = [
  {
    amount: 489,
    date: "06-19",
  },
  {
    amount: 544,
    date: "06-26",
  },
];
