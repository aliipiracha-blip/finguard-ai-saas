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

export const reconciliationData = {
  bankStatementBalance: 284500,
  bookBalance: 281340,
  asOfDate: "2026-02-17",
  bankName: "Mercury Business Checking",
  accountNumber: "****4821",
  lastReconciled: "2026-01-31",
  outstandingChecks: [
    { id: "oc1", date: "2026-02-14", payee: "Office Supplies - Staples", checkNo: "1042", amount: -456.89, daysOutstanding: 3 },
    { id: "oc2", date: "2026-02-11", payee: "Freelancer Payment - J. Smith", checkNo: "1041", amount: -4500.00, daysOutstanding: 6 },
    { id: "oc3", date: "2026-02-08", payee: "Insurance Premium - State Farm", checkNo: "1039", amount: -1850.00, daysOutstanding: 9 },
  ],
  depositsInTransit: [
    { id: "dt1", date: "2026-02-16", source: "Client Payment - NovaTech", amount: 5200.00, expectedClear: "2026-02-19" },
    { id: "dt2", date: "2026-02-17", source: "Stripe Payout - Pending", amount: 3450.00, expectedClear: "2026-02-20" },
  ],
  bankAdjustments: [
    { id: "ba1", date: "2026-02-15", description: "Monthly Service Fee", amount: -35.00, type: "fee" as const },
    { id: "ba2", date: "2026-02-14", description: "Interest Earned", amount: 48.22, type: "interest" as const },
    { id: "ba3", date: "2026-02-10", description: "Wire Transfer Fee", amount: -25.00, type: "fee" as const },
  ],
  bookAdjustments: [
    { id: "bk1", date: "2026-02-13", description: "NSF Check - RetailCo", amount: -1250.00, type: "nsf" as const },
    { id: "bk2", date: "2026-02-12", description: "Bank Error Correction", amount: 186.33, type: "correction" as const },
  ],
  reconciledHistory: [
    { month: "Jan 2026", bankBalance: 277430, bookBalance: 277430, difference: 0, status: "reconciled" as const },
    { month: "Dec 2025", bankBalance: 265800, bookBalance: 265800, difference: 0, status: "reconciled" as const },
    { month: "Nov 2025", bankBalance: 251200, bookBalance: 251200, difference: 0, status: "reconciled" as const },
    { month: "Oct 2025", bankBalance: 238400, bookBalance: 238750, difference: -350, status: "adjusted" as const },
    { month: "Sep 2025", bankBalance: 224600, bookBalance: 224600, difference: 0, status: "reconciled" as const },
    { month: "Aug 2025", bankBalance: 210100, bookBalance: 210100, difference: 0, status: "reconciled" as const },
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

export type BudgetCategory = {
  name: string
  budgeted: number
  actual: number
  variance: number
  variancePercent: number
  trend: "over" | "under" | "on-track"
  alertThreshold: number
}

export type DepartmentBudget = {
  name: string
  categories: BudgetCategory[]
  totalBudgeted: number
  totalActual: number
}

export type MonthlyBudgetComparison = {
  month: string
  totalBudgeted: number
  totalActual: number
  variance: number
  isForecast?: boolean
}

export const budgetData = {
  fiscalYear: "2026",
  period: "Q1 (Jan - Feb 2026)",
  overallBudgeted: 425000,
  overallActual: 412340,
  overallVariance: 12660,
  variancePercent: 3.0,
  alertThreshold: 5,

  byDepartment: [
    {
      name: "Operations",
      categories: [
        { name: "Salaries & Wages", budgeted: 85500, actual: 89200, variance: -3700, variancePercent: -4.3, trend: "over", alertThreshold: 5 },
        { name: "Rent & Utilities", budgeted: 12400, actual: 12400, variance: 0, variancePercent: 0, trend: "on-track", alertThreshold: 5 },
        { name: "Office Supplies", budgeted: 2000, actual: 1890, variance: 110, variancePercent: 5.5, trend: "under", alertThreshold: 5 },
        { name: "Insurance", budgeted: 4000, actual: 3700, variance: 300, variancePercent: 7.5, trend: "under", alertThreshold: 5 },
      ],
      totalBudgeted: 103900,
      totalActual: 107190,
    },
    {
      name: "Technology",
      categories: [
        { name: "Software & Tools", budgeted: 8400, actual: 7840, variance: 560, variancePercent: 6.7, trend: "under", alertThreshold: 5 },
        { name: "Cloud Services", budgeted: 5000, actual: 5200, variance: -200, variancePercent: -4.0, trend: "over", alertThreshold: 5 },
        { name: "Equipment", budgeted: 15000, actual: 18500, variance: -3500, variancePercent: -23.3, trend: "over", alertThreshold: 5 },
        { name: "Depreciation", budgeted: 4200, actual: 4200, variance: 0, variancePercent: 0, trend: "on-track", alertThreshold: 5 },
      ],
      totalBudgeted: 32600,
      totalActual: 35740,
    },
    {
      name: "Sales & Marketing",
      categories: [
        { name: "Marketing & Advertising", budgeted: 12000, actual: 14200, variance: -2200, variancePercent: -18.3, trend: "over", alertThreshold: 5 },
        { name: "Sales Team", budgeted: 28000, actual: 28500, variance: -500, variancePercent: -1.8, trend: "over", alertThreshold: 5 },
        { name: "Events & Conferences", budgeted: 5000, actual: 3200, variance: 1800, variancePercent: 36.0, trend: "under", alertThreshold: 5 },
        { name: "Lead Generation", budgeted: 3000, actual: 2800, variance: 200, variancePercent: 6.7, trend: "under", alertThreshold: 5 },
      ],
      totalBudgeted: 48000,
      totalActual: 48700,
    },
    {
      name: "Professional Services",
      categories: [
        { name: "Legal Fees", budgeted: 3000, actual: 2100, variance: 900, variancePercent: 30.0, trend: "under", alertThreshold: 5 },
        { name: "Accounting & Audit", budgeted: 5000, actual: 3500, variance: 1500, variancePercent: 30.0, trend: "under", alertThreshold: 5 },
        { name: "Consulting", budgeted: 8000, actual: 5600, variance: 2400, variancePercent: 30.0, trend: "under", alertThreshold: 5 },
        { name: "Contractors", budgeted: 18000, actual: 18500, variance: -500, variancePercent: -2.8, trend: "over", alertThreshold: 5 },
      ],
      totalBudgeted: 34000,
      totalActual: 29700,
    },
    {
      name: "Revenue",
      categories: [
        { name: "Product Sales", budgeted: 140000, actual: 145200, variance: 5200, variancePercent: 3.7, trend: "under", alertThreshold: 5 },
        { name: "Service Revenue", budgeted: 80000, actual: 82500, variance: 2500, variancePercent: 3.1, trend: "under", alertThreshold: 5 },
        { name: "Subscription Revenue", budgeted: 36000, actual: 38400, variance: 2400, variancePercent: 6.7, trend: "under", alertThreshold: 5 },
        { name: "Other Income", budgeted: 5000, actual: 4800, variance: -200, variancePercent: -4.0, trend: "over", alertThreshold: 5 },
      ],
      totalBudgeted: 261000,
      totalActual: 270900,
    },
  ] as DepartmentBudget[],

  monthlyComparison: [
    { month: "Jan", totalBudgeted: 68000, totalActual: 67200, variance: 800 },
    { month: "Feb", totalBudgeted: 71000, totalActual: 73500, variance: -2500 },
    { month: "Mar", totalBudgeted: 72000, totalActual: 71800, variance: 200 },
    { month: "Apr", totalBudgeted: 73000, totalActual: 0, variance: 73000, isForecast: true },
    { month: "May", totalBudgeted: 74000, totalActual: 0, variance: 74000, isForecast: true },
    { month: "Jun", totalBudgeted: 75000, totalActual: 0, variance: 75000, isForecast: true },
  ] as MonthlyBudgetComparison[],

  variances: [
    {
      id: "v1",
      category: "Equipment",
      department: "Technology",
      severity: "high" as const,
      amount: -3500,
      percent: -23.3,
      reason: "Unplanned server upgrade to handle increased customer load",
      recommendation: "Review equipment budget for Q2 and reallocate from contingency",
    },
    {
      id: "v2",
      category: "Marketing & Advertising",
      department: "Sales & Marketing",
      severity: "medium" as const,
      amount: -2200,
      percent: -18.3,
      reason: "Accelerated Facebook ad spend to capture early-year demand",
      recommendation: "Reduce spend by 10% in March to bring back on track",
    },
    {
      id: "v3",
      category: "Salaries & Wages",
      department: "Operations",
      severity: "medium" as const,
      amount: -3700,
      percent: -4.3,
      reason: "New hire onboarding costs higher than planned",
      recommendation: "Expect to recover within 2 months as productivity increases",
    },
    {
      id: "v4",
      category: "Events & Conferences",
      department: "Sales & Marketing",
      severity: "low" as const,
      amount: 1800,
      percent: 36.0,
      reason: "Postponed trade show to Q2",
      recommendation: "Funds available for reallocation to other categories",
    },
  ],
}

export const spendingInsights = [
  {
    id: "si1",
    type: "increase" as const,
    category: "Subscriptions",
    insight: "You spent 40% more on subscriptions this month",
    detail: "Main drivers: Netflix (+$15), Spotify (+$10), Adobe Creative Cloud (+$45)",
    amount: 340,
    trend: "up",
    recommendation: "Review annual plans to potentially save $180/year",
  },
  {
    id: "si2",
    type: "decrease" as const,
    category: "Marketing",
    insight: "Marketing spend is 22% below average",
    detail: "This is the lowest marketing spend in 6 months",
    amount: 2100,
    trend: "down",
    recommendation: "Consider reallocating to high-performing Facebook campaigns",
  },
  {
    id: "si3",
    type: "anomaly" as const,
    category: "Office Supplies",
    insight: "Unusual office supply purchase detected",
    detail: "$1,200 spent at Staples on Feb 14 - 3x your monthly average",
    amount: 800,
    trend: "alert",
    recommendation: "Verify this was a planned bulk purchase",
  },
  {
    id: "si4",
    type: "increase" as const,
    category: "Travel",
    insight: "Travel expenses increased 65% this quarter",
    detail: "Main driver: Client visits to NYC office (12 trips vs 4 last quarter)",
    amount: 4500,
    trend: "up",
    recommendation: "Consider virtual meetings for nearby clients to reduce costs",
  },
  {
    id: "si5",
    type: "comparison" as const,
    category: "Software",
    insight: "Software costs increased but usage didn't scale",
    detail: "8 new licenses purchased, but only 3 are actively used",
    amount: 1200,
    trend: "warning",
    recommendation: "Audit licenses and cancel unused accounts to save $1,200/year",
  },
]

export const anomalyAlerts = [
  {
    id: "aa1",
    severity: "high" as const,
    title: "Large wire transfer to new vendor",
    description: "$25,000 wire transfer to 'Global Trade Partners LLC' - vendor not in your system",
    timestamp: "2026-02-17T14:32:00Z",
    category: "wire_transfer",
    amount: 25000,
    actionRequired: true,
    dismissed: false,
  },
  {
    id: "aa2",
    severity: "medium" as const,
    title: "Recurring charge increased",
    description: "AWS monthly bill is 45% higher than your 3-month average ($2,340 vs $1,610)",
    timestamp: "2026-02-16T09:15:00Z",
    category: "recurring",
    amount: 730,
    actionRequired: false,
    dismissed: false,
  },
  {
    id: "aa3",
    severity: "high" as const,
    title: "Multiple payments to same vendor",
    description: "3 payments to 'QuickBooks Payroll' in one week - totaling $1,125",
    timestamp: "2026-02-15T16:48:00Z",
    category: "duplicate",
    amount: 1125,
    actionRequired: true,
    dismissed: false,
  },
  {
    id: "aa4",
    severity: "low" as const,
    title: "Unusual transaction time",
    description: "Transaction of $890 processed at 3:42 AM - outside normal business hours",
    timestamp: "2026-02-14T03:42:00Z",
    category: "timing",
    amount: 890,
    actionRequired: false,
    dismissed: false,
  },
  {
    id: "aa5",
    severity: "medium" as const,
    title: "Location anomaly detected",
    description: "Credit card used in San Francisco and Austin within 4 hours - potential fraud",
    timestamp: "2026-02-13T18:22:00Z",
    category: "location",
    amount: 2340,
    actionRequired: true,
    dismissed: false,
  },
]

export type Invoice = {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail: string
  clientAddress: string
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  notes?: string
}

export type InvoiceItem = {
  description: string
  quantity: number
  rate: number
  amount: number
}

export const invoices: Invoice[] = [
  {
    id: "inv1",
    invoiceNumber: "INV-2026-001",
    clientName: "Acme Corporation",
    clientEmail: "billing@acmecorp.com",
    clientAddress: "123 Business Ave, Suite 100, San Francisco, CA 94102",
    issueDate: "2026-02-01",
    dueDate: "2026-03-03",
    items: [
      { description: "Financial Consulting Services - January", quantity: 40, rate: 150, amount: 6000 },
      { description: "Monthly Retainer - February", quantity: 1, rate: 2500, amount: 2500 },
    ],
    subtotal: 8500,
    tax: 680,
    total: 9180,
    status: "paid",
    notes: "Thank you for your business!",
  },
  {
    id: "inv2",
    invoiceNumber: "INV-2026-002",
    clientName: "TechStart Inc",
    clientEmail: "accounts@techstart.io",
    clientAddress: "456 Innovation Blvd, Austin, TX 78701",
    issueDate: "2026-02-05",
    dueDate: "2026-03-07",
    items: [
      { description: "App Development Services", quantity: 80, rate: 175, amount: 14000 },
      { description: "UI/UX Design", quantity: 20, rate: 125, amount: 2500 },
      { description: "Project Management", quantity: 10, rate: 100, amount: 1000 },
    ],
    subtotal: 17500,
    tax: 1400,
    total: 18900,
    status: "sent",
  },
  {
    id: "inv3",
    invoiceNumber: "INV-2026-003",
    clientName: "Global Solutions Ltd",
    clientEmail: "finance@globalsolutions.com",
    clientAddress: "789 Enterprise Way, New York, NY 10001",
    issueDate: "2026-01-15",
    dueDate: "2026-02-14",
    items: [
      { description: "Annual Subscription - Enterprise Plan", quantity: 1, rate: 24000, amount: 24000 },
      { description: "Implementation Support", quantity: 16, rate: 200, amount: 3200 },
    ],
    subtotal: 27200,
    tax: 2176,
    total: 29376,
    status: "overdue",
    notes: "Payment overdue. Please remit immediately.",
  },
  {
    id: "inv4",
    invoiceNumber: "INV-2026-004",
    clientName: "NovaTech Systems",
    clientEmail: "ap@novatech.com",
    clientAddress: "321 Silicon Valley Rd, Palo Alto, CA 94301",
    issueDate: "2026-02-10",
    dueDate: "2026-03-12",
    items: [
      { description: "Cloud Infrastructure Setup", quantity: 1, rate: 8500, amount: 8500 },
      { description: "DevOps Consulting", quantity: 24, rate: 185, amount: 4440 },
    ],
    subtotal: 12940,
    tax: 1035,
    total: 13975,
    status: "draft",
  },
]

export const invoiceStats = {
  totalOutstanding: 62351,
  overdueAmount: 29376,
  draftInvoices: 1,
  sentInvoices: 2,
  paidThisMonth: 9180,
  averagePaymentTime: 14,
}
