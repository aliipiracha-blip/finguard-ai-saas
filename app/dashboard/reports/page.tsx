"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, TrendingDown, DollarSign, FileBarChart, BarChart3, Scale, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"
import {
  profitLossData,
  balanceSheetData,
  cashFlowStatementData,
  sumItems,
} from "@/lib/financial-statements"
import { trialBalanceData, findTrialBalanceDiscrepancies, formatTBCurrency } from "@/lib/trial-balance-data"

function formatCurrency(amount: number) {
  const isNegative = amount < 0
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return isNegative ? `(${formatted})` : formatted
}

function StatementLineItems({
  items,
  bold = false,
}: {
  items: { label: string; amount: number }[]
  bold?: boolean
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center justify-between py-1.5 ${
            bold ? "font-semibold text-foreground" : "text-muted-foreground"
          }`}
        >
          <span className="text-sm">{item.label}</span>
          <span className={`text-sm font-mono ${item.amount < 0 ? "text-destructive" : ""}`}>
            {formatCurrency(item.amount)}
          </span>
        </div>
      ))}
    </div>
  )
}

function StatementSubtotal({
  label,
  amount,
  variant = "default",
}: {
  label: string
  amount: number
  variant?: "default" | "total"
}) {
  return (
    <div
      className={`flex items-center justify-between py-2.5 ${
        variant === "total"
          ? "border-t-2 border-foreground mt-2 pt-3 font-bold text-foreground"
          : "border-t border-border mt-1 font-semibold text-foreground"
      }`}
    >
      <span className="text-sm">{label}</span>
      <span className={`text-sm font-mono ${amount < 0 ? "text-destructive" : ""}`}>
        {formatCurrency(amount)}
      </span>
    </div>
  )
}

// ------ P&L Tab ------
function ProfitLossStatement() {
  const totalRevenue = sumItems(profitLossData.revenue)
  const totalCOGS = sumItems(profitLossData.cogs)
  const grossProfit = totalRevenue - totalCOGS
  const totalOpex = sumItems(profitLossData.operatingExpenses)
  const operatingIncome = grossProfit - totalOpex
  const totalOther = sumItems(profitLossData.otherExpenses)
  const netIncome = operatingIncome - totalOther

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profit & Loss Statement</h3>
          <p className="text-sm text-muted-foreground">{profitLossData.period}</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6">
          {/* Revenue */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Revenue</h4>
            <StatementLineItems items={profitLossData.revenue} />
            <StatementSubtotal label="Total Revenue" amount={totalRevenue} />
          </div>

          {/* COGS */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Cost of Goods Sold
            </h4>
            <StatementLineItems items={profitLossData.cogs} />
            <StatementSubtotal label="Total COGS" amount={totalCOGS} />
          </div>

          {/* Gross Profit */}
          <StatementSubtotal label="Gross Profit" amount={grossProfit} variant="total" />

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Gross Margin: {((grossProfit / totalRevenue) * 100).toFixed(1)}%
            </Badge>
          </div>

          {/* Operating Expenses */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Operating Expenses
            </h4>
            <StatementLineItems items={profitLossData.operatingExpenses} />
            <StatementSubtotal label="Total Operating Expenses" amount={totalOpex} />
          </div>

          {/* Operating Income */}
          <StatementSubtotal label="Operating Income" amount={operatingIncome} variant="total" />

          {/* Other Expenses */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Other Expenses
            </h4>
            <StatementLineItems items={profitLossData.otherExpenses} />
            <StatementSubtotal label="Total Other Expenses" amount={totalOther} />
          </div>

          {/* Net Income */}
          <div className="rounded-xl bg-primary/5 p-4 -mx-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-base font-bold text-foreground">Net Income</span>
              </div>
              <span className="text-base font-bold font-mono text-primary">
                {formatCurrency(netIncome)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Net Margin: {((netIncome / totalRevenue) * 100).toFixed(1)}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ------ Balance Sheet Tab ------
function BalanceSheet() {
  const totalCurrentAssets = sumItems(balanceSheetData.currentAssets)
  const totalNonCurrentAssets = sumItems(balanceSheetData.nonCurrentAssets)
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets

  const totalCurrentLiabilities = sumItems(balanceSheetData.currentLiabilities)
  const totalNonCurrentLiabilities = sumItems(balanceSheetData.nonCurrentLiabilities)
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities

  const totalEquity = sumItems(balanceSheetData.equity)
  const difference = totalAssets - (totalLiabilities + totalEquity)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Balance Sheet</h3>
          <p className="text-sm text-muted-foreground">As of {balanceSheetData.asOf}</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Difference Indicator */}
      <div className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
        difference === 0
          ? "bg-primary/10 text-primary"
          : "bg-destructive/10 text-destructive"
      }`}>
        {difference === 0
          ? "Balanced -- Total Assets equals Total Liabilities & Equity (difference: $0)"
          : `Out of balance -- Total Assets minus (Total Liabilities + Equity) = ${formatCurrency(difference)}`}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 grid-cols-3">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Assets</p>
            <p className="text-lg font-bold text-foreground mt-1 font-mono">
              {formatCurrency(totalAssets)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Liabilities</p>
            <p className="text-lg font-bold text-foreground mt-1 font-mono">
              {formatCurrency(totalLiabilities)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Equity</p>
            <p className="text-lg font-bold text-primary mt-1 font-mono">
              {formatCurrency(totalEquity)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Assets */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary">Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Current Assets</h5>
            <StatementLineItems items={balanceSheetData.currentAssets} />
            <StatementSubtotal label="Total Current Assets" amount={totalCurrentAssets} />
          </div>
          <div>
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Non-Current Assets</h5>
            <StatementLineItems items={balanceSheetData.nonCurrentAssets} />
            <StatementSubtotal label="Total Non-Current Assets" amount={totalNonCurrentAssets} />
          </div>
          <StatementSubtotal label="Total Assets" amount={totalAssets} variant="total" />
        </CardContent>
      </Card>

      {/* Liabilities */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-destructive">
            Liabilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Current Liabilities</h5>
            <StatementLineItems items={balanceSheetData.currentLiabilities} />
            <StatementSubtotal label="Total Current Liabilities" amount={totalCurrentLiabilities} />
          </div>
          <div>
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Non-Current Liabilities</h5>
            <StatementLineItems items={balanceSheetData.nonCurrentLiabilities} />
            <StatementSubtotal
              label="Total Non-Current Liabilities"
              amount={totalNonCurrentLiabilities}
            />
          </div>
          <StatementSubtotal label="Total Liabilities" amount={totalLiabilities} variant="total" />
        </CardContent>
      </Card>

      {/* Equity */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary">
            {"Shareholders' Equity"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <StatementLineItems items={balanceSheetData.equity} />
          <StatementSubtotal label="Total Equity" amount={totalEquity} variant="total" />
        </CardContent>
      </Card>

      {/* Balance Check */}
      <div className="rounded-xl bg-primary/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-base font-bold text-foreground">
              Liabilities + Equity
            </span>
          </div>
          <span className="text-base font-bold font-mono text-primary">
            {formatCurrency(totalLiabilities + totalEquity)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {totalAssets === totalLiabilities + totalEquity
            ? "Balance sheet is balanced."
            : "Warning: Balance sheet does not balance."}
        </p>
      </div>
    </div>
  )
}

// ------ Cash Flow Statement Tab ------
function CashFlowStatement() {
  const totalOperating = sumItems(cashFlowStatementData.operating)
  const totalInvesting = sumItems(cashFlowStatementData.investing)
  const totalFinancing = sumItems(cashFlowStatementData.financing)
  const netChange = totalOperating + totalInvesting + totalFinancing
  const endingCash = cashFlowStatementData.beginningCash + netChange

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cash Flow Statement</h3>
          <p className="text-sm text-muted-foreground">{cashFlowStatementData.period}</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 grid-cols-3">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Operating</p>
            <p className={`text-lg font-bold mt-1 font-mono ${totalOperating >= 0 ? "text-primary" : "text-destructive"}`}>
              {formatCurrency(totalOperating)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Investing</p>
            <p className={`text-lg font-bold mt-1 font-mono ${totalInvesting >= 0 ? "text-primary" : "text-destructive"}`}>
              {formatCurrency(totalInvesting)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Financing</p>
            <p className={`text-lg font-bold mt-1 font-mono ${totalFinancing >= 0 ? "text-primary" : "text-destructive"}`}>
              {formatCurrency(totalFinancing)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6">
          {/* Operating Activities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Cash from Operating Activities
            </h4>
            <StatementLineItems items={cashFlowStatementData.operating} />
            <StatementSubtotal label="Net Cash from Operations" amount={totalOperating} />
          </div>

          {/* Investing Activities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Cash from Investing Activities
            </h4>
            <StatementLineItems items={cashFlowStatementData.investing} />
            <StatementSubtotal label="Net Cash from Investing" amount={totalInvesting} />
          </div>

          {/* Financing Activities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Cash from Financing Activities
            </h4>
            <StatementLineItems items={cashFlowStatementData.financing} />
            <StatementSubtotal label="Net Cash from Financing" amount={totalFinancing} />
          </div>

          {/* Net Change */}
          <StatementSubtotal label="Net Change in Cash" amount={netChange} variant="total" />

          {/* Beginning & Ending */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between py-1.5 text-muted-foreground">
              <span className="text-sm">Beginning Cash Balance</span>
              <span className="text-sm font-mono">
                {formatCurrency(cashFlowStatementData.beginningCash)}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-primary/5 p-4 -mx-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {netChange >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-primary" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
                <span className="text-base font-bold text-foreground">Ending Cash Balance</span>
              </div>
              <span className="text-base font-bold font-mono text-primary">
                {formatCurrency(endingCash)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ------ Trial Balance Tab ------
function TrialBalanceReport() {
  const totalDebits = trialBalanceData.accounts.reduce((sum, acc) => sum + acc.debit, 0)
  const totalCredits = trialBalanceData.accounts.reduce((sum, acc) => sum + acc.credit, 0)
  const discrepancies = findTrialBalanceDiscrepancies(trialBalanceData.accounts)
  const isBalanced = totalDebits === totalCredits

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 border-destructive/30 text-destructive"
      case "medium": return "bg-yellow-500/10 border-yellow-500/30 text-yellow-600"
      case "low": return "bg-orange-500/10 border-orange-500/30 text-orange-600"
      default: return "bg-muted"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high": return <Badge variant="destructive" className="text-xs">HIGH</Badge>
      case "medium": return <Badge variant="secondary" className="text-xs bg-yellow-500/20 text-yellow-700">MEDIUM</Badge>
      case "low": return <Badge variant="outline" className="text-xs">LOW</Badge>
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Trial Balance</h3>
          <p className="text-sm text-muted-foreground">As of {trialBalanceData.asOf}</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Balance Status Banner */}
      <div className={`rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-2 ${isBalanced ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
        {isBalanced ? (
          <>
            <CheckCircle className="h-4 w-4" />
            <span>Balanced - Total Debits ({formatTBCurrency(totalDebits)}) equal Total Credits ({formatTBCurrency(totalCredits)})</span>
          </>
        ) : (
          <>
            <AlertCircle className="h-4 w-4" />
            <span>Imbalanced - Difference: {formatTBCurrency(Math.abs(totalDebits - totalCredits))}</span>
          </>
        )}
      </div>

      {/* Discrepancies */}
      {discrepancies.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              Discrepancies Found ({discrepancies.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {discrepancies.map(d => (
              <div key={d.id} className={`rounded-lg p-3 border ${getSeverityColor(d.severity)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(d.severity)}
                    <span className="text-sm font-medium">{d.description}</span>
                  </div>
                  {d.amount !== undefined && (
                    <span className="text-sm font-mono font-semibold">{formatTBCurrency(Math.abs(d.amount))}</span>
                  )}
                </div>
                <p className="text-xs opacity-80 ml-10">{d.suggestion}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Trial Balance Table */}
      <Card className="border-border/50">
        <CardContent className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Account</th>
                <th className="text-right p-3 font-semibold">Type</th>
                <th className="text-right p-3 font-semibold">Debit</th>
                <th className="text-right p-3 font-semibold">Credit</th>
              </tr>
            </thead>
            <tbody>
              {/* Assets */}
              {trialBalanceData.accounts.filter(a => a.type === "asset").map((acc, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="p-3">{acc.label}{acc.isContra && " (Contra)"}</td>
                  <td className="text-right p-3 text-xs text-muted-foreground">Asset</td>
                  <td className="text-right p-3 font-mono">{acc.debit > 0 ? formatTBCurrency(acc.debit) : ""}</td>
                  <td className="text-right p-3 font-mono">{acc.credit > 0 ? formatTBCurrency(acc.credit) : ""}</td>
                </tr>
              ))}
              {/* Liabilities */}
              {trialBalanceData.accounts.filter(a => a.type === "liability").map((acc, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="p-3">{acc.label}</td>
                  <td className="text-right p-3 text-xs text-muted-foreground">Liability</td>
                  <td className="text-right p-3 font-mono">{acc.debit > 0 ? formatTBCurrency(acc.debit) : ""}</td>
                  <td className="text-right p-3 font-mono">{acc.credit > 0 ? formatTBCurrency(acc.credit) : ""}</td>
                </tr>
              ))}
              {/* Equity */}
              {trialBalanceData.accounts.filter(a => a.type === "equity").map((acc, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="p-3">{acc.label}</td>
                  <td className="text-right p-3 text-xs text-muted-foreground">Equity</td>
                  <td className="text-right p-3 font-mono">{acc.debit > 0 ? formatTBCurrency(acc.debit) : ""}</td>
                  <td className="text-right p-3 font-mono">{acc.credit > 0 ? formatTBCurrency(acc.credit) : ""}</td>
                </tr>
              ))}
              {/* Revenue */}
              {trialBalanceData.accounts.filter(a => a.type === "revenue").map((acc, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="p-3">{acc.label}</td>
                  <td className="text-right p-3 text-xs text-muted-foreground">Revenue</td>
                  <td className="text-right p-3 font-mono">{acc.debit > 0 ? formatTBCurrency(acc.debit) : ""}</td>
                  <td className="text-right p-3 font-mono">{acc.credit > 0 ? formatTBCurrency(acc.credit) : ""}</td>
                </tr>
              ))}
              {/* Expenses */}
              {trialBalanceData.accounts.filter(a => a.type === "expense").map((acc, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="p-3">{acc.label}</td>
                  <td className="text-right p-3 text-xs text-muted-foreground">Expense</td>
                  <td className="text-right p-3 font-mono">{acc.debit > 0 ? formatTBCurrency(acc.debit) : ""}</td>
                  <td className="text-right p-3 font-mono">{acc.credit > 0 ? formatTBCurrency(acc.credit) : ""}</td>
                </tr>
              ))}
              {/* Totals Row */}
              <tr className="bg-muted font-bold">
                <td className="p-3" colSpan={2}>Totals</td>
                <td className="text-right p-3 font-mono">{formatTBCurrency(totalDebits)}</td>
                <td className="text-right p-3 font-mono">{formatTBCurrency(totalCredits)}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Accounting Equation Check */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Accounting Equation Check:</span>
              <span className="text-xs text-muted-foreground">Assets = Liabilities + Equity</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Assets</p>
                <p className="font-mono font-semibold">{formatTBCurrency(trialBalanceData.accounts.filter(a => a.type === "asset").reduce((s, a) => s + a.debit - a.credit, 0))}</p>
              </div>
              <span className="font-bold">=</span>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Liabilities + Equity</p>
                <p className="font-mono font-semibold">{formatTBCurrency(
                  trialBalanceData.accounts.filter(a => a.type === "liability").reduce((s, a) => s + a.credit - a.debit, 0) +
                  trialBalanceData.accounts.filter(a => a.type === "equity").reduce((s, a) => s + a.credit - a.debit, 0)
                )}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ------ Main Page ------
export default function ReportsPage() {
  return (
    <>
      <DashboardHeader title="Reports" />
      <div className="p-6">
        <Tabs defaultValue="pnl" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-xl">
            <TabsTrigger value="pnl" className="gap-1.5">
              <TrendingUp className="h-4 w-4 hidden sm:block" />
              <span>P&L</span>
            </TabsTrigger>
            <TabsTrigger value="balance-sheet" className="gap-1.5">
              <BarChart3 className="h-4 w-4 hidden sm:block" />
              <span>Balance Sheet</span>
            </TabsTrigger>
            <TabsTrigger value="cash-flow" className="gap-1.5">
              <FileBarChart className="h-4 w-4 hidden sm:block" />
              <span>Cash Flow</span>
            </TabsTrigger>
            <TabsTrigger value="trial-balance" className="gap-1.5">
              <Scale className="h-4 w-4 hidden sm:block" />
              <span>Trial Balance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pnl">
            <ProfitLossStatement />
          </TabsContent>

          <TabsContent value="balance-sheet">
            <BalanceSheet />
          </TabsContent>

          <TabsContent value="cash-flow">
            <CashFlowStatement />
          </TabsContent>

          <TabsContent value="trial-balance">
            <TrialBalanceReport />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
