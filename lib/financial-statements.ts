// Profit & Loss Statement data
export const profitLossData = {
  period: "Jan 1, 2026 - Feb 17, 2026",
  revenue: [
    { label: "Product Sales", amount: 145200 },
    { label: "Service Revenue", amount: 82500 },
    { label: "Subscription Revenue", amount: 38400 },
    { label: "Other Income", amount: 4800 },
  ],
  cogs: [
    { label: "Cost of Goods Sold", amount: 52300 },
    { label: "Service Delivery Costs", amount: 18700 },
  ],
  operatingExpenses: [
    { label: "Salaries & Wages", amount: 85500 },
    { label: "Rent & Utilities", amount: 12400 },
    { label: "Software & Tools", amount: 7840 },
    { label: "Marketing & Advertising", amount: 14200 },
    { label: "Insurance", amount: 3700 },
    { label: "Professional Services", amount: 5600 },
    { label: "Office Supplies", amount: 1890 },
    { label: "Depreciation", amount: 4200 },
  ],
  otherExpenses: [
    { label: "Interest Expense", amount: 2100 },
    { label: "Tax Expense", amount: 15800 },
  ],
}

// Balance Sheet data
export const balanceSheetData = {
  asOf: "Feb 17, 2026",
  currentAssets: [
    { label: "Cash & Cash Equivalents", amount: 284500 },
    { label: "Accounts Receivable", amount: 67800 },
    { label: "Inventory", amount: 23400 },
    { label: "Prepaid Expenses", amount: 8900 },
  ],
  nonCurrentAssets: [
    { label: "Property & Equipment", amount: 125000 },
    { label: "Less: Accumulated Depreciation", amount: -42000 },
    { label: "Intangible Assets", amount: 35000 },
    { label: "Long-Term Investments", amount: 50000 },
  ],
  currentLiabilities: [
    { label: "Accounts Payable", amount: 34200 },
    { label: "Accrued Expenses", amount: 18500 },
    { label: "Current Portion of Debt", amount: 12000 },
    { label: "Taxes Payable", amount: 15800 },
  ],
  nonCurrentLiabilities: [
    { label: "Long-Term Debt", amount: 85000 },
    { label: "Deferred Revenue", amount: 22400 },
  ],
  equity: [
    { label: "Common Stock", amount: 100000 },
    { label: "Retained Earnings", amount: 247200 },
    { label: "Current Period Net Income", amount: 47160 },
  ],
}

// Cash Flow Statement data
export const cashFlowStatementData = {
  period: "Jan 1, 2026 - Feb 17, 2026",
  operating: [
    { label: "Net Income", amount: 47160 },
    { label: "Depreciation & Amortization", amount: 4200 },
    { label: "Increase in Accounts Receivable", amount: -12400 },
    { label: "Decrease in Inventory", amount: 3200 },
    { label: "Increase in Accounts Payable", amount: 5800 },
    { label: "Increase in Accrued Expenses", amount: 2100 },
  ],
  investing: [
    { label: "Purchase of Equipment", amount: -18500 },
    { label: "Software Development Costs", amount: -8000 },
  ],
  financing: [
    { label: "Loan Repayment", amount: -6000 },
    { label: "Owner Distribution", amount: -10000 },
  ],
  beginningCash: 276940,
}

export function sumItems(items: { amount: number }[]) {
  return items.reduce((acc, item) => acc + item.amount, 0)
}
