export const cashFlowData = [
  { month: "Jan", inflow: 42000, outflow: 31000 },
  { month: "Feb", inflow: 45000, outflow: 33000 },
  { month: "Mar", inflow: 48000, outflow: 35000 },
  { month: "Apr", inflow: 51000, outflow: 37000 },
  { month: "May", inflow: 47000, outflow: 34000 },
  { month: "Jun", inflow: 53000, outflow: 38000 },
  { month: "Jul", inflow: 56000, outflow: 40000 },
  { month: "Aug", inflow: 52000, outflow: 39000 },
  { month: "Sep", inflow: 58000, outflow: 41000 },
  { month: "Oct", inflow: 61000, outflow: 43000, forecast: true },
  { month: "Nov", inflow: 64000, outflow: 45000, forecast: true },
  { month: "Dec", inflow: 67000, outflow: 47000, forecast: true },
]

export const revenueExpenseData = [
  { month: "Jan", revenue: 42000, expenses: 31000 },
  { month: "Feb", revenue: 45000, expenses: 33000 },
  { month: "Mar", revenue: 48000, expenses: 35000 },
  { month: "Apr", revenue: 51000, expenses: 37000 },
  { month: "May", revenue: 47000, expenses: 34000 },
  { month: "Jun", revenue: 53000, expenses: 38000 },
]

export const transactions = [
  {
    id: "1",
    date: "2026-02-17",
    description: "Stripe Payment - Acme Corp",
    category: "Revenue",
    amount: 12500.0,
    status: "completed" as const,
  },
  {
    id: "2",
    date: "2026-02-16",
    description: "AWS Cloud Services",
    category: "Software",
    amount: -2340.0,
    status: "completed" as const,
  },
  {
    id: "3",
    date: "2026-02-15",
    description: "Employee Payroll - Feb",
    category: "Payroll",
    amount: -28500.0,
    status: "pending" as const,
  },
  {
    id: "4",
    date: "2026-02-15",
    description: "Stripe Payment - TechStart Inc",
    category: "Revenue",
    amount: 8750.0,
    status: "completed" as const,
  },
  {
    id: "5",
    date: "2026-02-14",
    description: "Office Supplies - Staples",
    category: "Office",
    amount: -456.89,
    status: "completed" as const,
  },
  {
    id: "6",
    date: "2026-02-14",
    description: "Google Workspace License",
    category: "Software",
    amount: -1200.0,
    status: "completed" as const,
  },
  {
    id: "7",
    date: "2026-02-13",
    description: "Client Payment - Global Solutions",
    category: "Revenue",
    amount: 18200.0,
    status: "completed" as const,
  },
  {
    id: "8",
    date: "2026-02-13",
    description: "Marketing - Facebook Ads",
    category: "Marketing",
    amount: -3200.0,
    status: "flagged" as const,
  },
  {
    id: "9",
    date: "2026-02-12",
    description: "Insurance Premium",
    category: "Insurance",
    amount: -1850.0,
    status: "completed" as const,
  },
  {
    id: "10",
    date: "2026-02-11",
    description: "Freelancer Payment - J. Smith",
    category: "Contractors",
    amount: -4500.0,
    status: "completed" as const,
  },
]

export const flaggedTransactions = [
  {
    id: "f1",
    date: "2026-02-13",
    description: "Marketing - Facebook Ads",
    amount: -3200.0,
    riskLevel: "high" as const,
    reason: "Amount 340% higher than average marketing spend",
  },
  {
    id: "f2",
    date: "2026-02-10",
    description: "Wire Transfer - Unknown Vendor",
    amount: -15000.0,
    riskLevel: "critical" as const,
    reason: "Unrecognized vendor with high-value wire transfer",
  },
  {
    id: "f3",
    date: "2026-02-08",
    description: "Duplicate Invoice - Office Supplies",
    amount: -456.89,
    riskLevel: "medium" as const,
    reason: "Potential duplicate of transaction on Feb 14",
  },
  {
    id: "f4",
    date: "2026-02-05",
    description: "Late Night Transaction - Equipment",
    amount: -8900.0,
    riskLevel: "medium" as const,
    reason: "Transaction processed at 3:42 AM outside business hours",
  },
]

export const taxData = {
  estimatedLiability: 47250,
  quarterlyPayment: 11813,
  nextDeadline: "2026-04-15",
  daysUntilDeadline: 57,
  effectiveRate: 24.5,
  suggestions: [
    {
      title: "Maximize Retirement Contributions",
      description: "Increase 401(k) contributions by $4,500 to reduce taxable income.",
      savings: 1103,
    },
    {
      title: "Section 179 Deduction",
      description: "Equipment purchases of $12,000 qualify for immediate expensing.",
      savings: 2940,
    },
    {
      title: "Home Office Deduction",
      description: "Claim $1,500 simplified deduction for home office use.",
      savings: 368,
    },
    {
      title: "Health Insurance Premium Deduction",
      description: "Self-employed health insurance premiums of $8,400 are deductible.",
      savings: 2058,
    },
  ],
}

export const alerts = [
  {
    id: "a1",
    type: "warning" as const,
    title: "Projected cash deficit in 45 days",
    description:
      "Based on current burn rate and projected revenue, cash balance may drop below safety threshold by April 3.",
  },
  {
    id: "a2",
    type: "danger" as const,
    title: "Unusual vendor payment detected",
    description:
      "Wire transfer of $15,000 to an unrecognized vendor flagged for review.",
  },
  {
    id: "a3",
    type: "info" as const,
    title: "Q1 tax payment due in 57 days",
    description:
      "Estimated quarterly payment of $11,813 is due by April 15, 2026.",
  },
]
