"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { budgetData, type DepartmentBudget, type BudgetCategory } from "@/lib/mock-data"

const severityStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/20 text-warning-foreground",
  low: "bg-primary/10 text-primary",
}

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

function DepartmentCard({ department }: { department: DepartmentBudget }) {
  const totalVariance = department.totalBudgeted - department.totalActual
  const variancePercent = (totalVariance / department.totalBudgeted) * 100
  const isOverBudget = totalVariance < 0

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">
            {department.name}
          </CardTitle>
          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              isOverBudget ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
            )}
          >
            {isOverBudget ? "Over Budget" : "Under Budget"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Budgeted</p>
            <p className="text-sm font-semibold font-mono">
              {formatCurrency(department.totalBudgeted)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Actual</p>
            <p className="text-sm font-semibold font-mono">
              {formatCurrency(department.totalActual)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Variance</p>
            <p
              className={cn(
                "text-sm font-semibold font-mono",
                isOverBudget ? "text-destructive" : "text-primary"
              )}
            >
              {formatCurrency(totalVariance)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {department.categories
            .filter((c) => Math.abs(c.variancePercent) >= c.alertThreshold)
            .map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between rounded-lg bg-muted/30 p-2 text-xs"
              >
                <span className="text-muted-foreground">{category.name}</span>
                <span
                  className={cn(
                    "font-mono font-medium",
                    category.trend === "over" ? "text-destructive" : "text-primary"
                  )}
                >
                  {category.variancePercent > 0 ? "+" : ""}
                  {category.variancePercent.toFixed(1)}%
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

function BudgetSummaryCards() {
  const { overallBudgeted, overallActual, overallVariance, variancePercent, alertThreshold } =
    budgetData
  const isOverBudget = overallVariance < 0
  const overBudgetCategories = budgetData.byDepartment.flatMap((d) =>
    d.categories.filter((c) => Math.abs(c.variancePercent) >= alertThreshold)
  )

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="border-border/50 bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total Budgeted</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-4.5 w-4.5 text-primary" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-foreground font-mono">
            {formatCurrency(overallBudgeted)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total Actual</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/20">
              <DollarSign className="h-4.5 w-4.5 text-warning-foreground" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-foreground font-mono">
            {formatCurrency(overallActual)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Overall Variance</p>
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                isOverBudget ? "bg-destructive/10" : "bg-primary/10"
              )}
            >
              {isOverBudget ? (
                <TrendingDown className="h-4.5 w-4.5 text-destructive" />
              ) : (
                <TrendingUp className="h-4.5 w-4.5 text-primary" />
              )}
            </div>
          </div>
          <p
            className={cn(
              "mt-3 text-2xl font-bold font-mono",
              isOverBudget ? "text-destructive" : "text-primary"
            )}
          >
            {formatCurrency(overallVariance)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {variancePercent > 0 ? "+" : ""}
            {variancePercent.toFixed(1)}% of budget
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Alerts</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-4.5 w-4.5 text-destructive" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-destructive">{overBudgetCategories.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Categories exceeding threshold
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function BudgetVsActualChart() {
  const data = budgetData.monthlyComparison.map((m) => ({
    month: m.month,
    Budgeted: m.totalBudgeted,
    Actual: m.totalActual,
    isForecast: m.isForecast,
  }))

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Budget vs Actual Trend
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly comparison with forecast (dashed = forecast)
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val: number) => `$${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "var(--color-foreground)",
                }}
                formatter={(val: number) => [`$${val.toLocaleString()}`, undefined]}
              />
              <ReferenceLine y={0} stroke="var(--color-border)" />
              <Bar
                dataKey="Budgeted"
                name="Budgeted"
                fill="var(--color-chart-3)"
                radius={[4, 4, 0, 0]}
                barSize={30}
                opacity={0.7}
              />
              <Bar
                dataKey="Actual"
                name="Actual"
                radius={[4, 4, 0, 0]}
                barSize={30}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isForecast ? "var(--color-chart-1)" : "var(--color-chart-1)"}
                    fillOpacity={entry.isForecast ? 0.3 : 1}
                    strokeDasharray={entry.isForecast ? "4 4" : undefined}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-chart-1 opacity-70" />
            <span>Budgeted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-chart-1" />
            <span>Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-chart-1 opacity-30" />
            <span>Forecast</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function VarianceAnalysisTable() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Variance Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Significant deviations from budget requiring attention
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Department
                </TableHead>
                <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Variance
                </TableHead>
                <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  %
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Severity
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Root Cause
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.variances.map((variance) => (
                <TableRow key={variance.id}>
                  <TableCell className="text-sm font-medium text-foreground">
                    {variance.category}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {variance.department}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right text-sm font-medium font-mono",
                      variance.amount < 0 ? "text-destructive" : "text-primary"
                    )}
                  >
                    {formatCurrency(variance.amount)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right text-sm font-mono",
                      variance.percent < 0 ? "text-destructive" : "text-primary"
                    )}
                  >
                    {variance.percent > 0 ? "+" : ""}
                    {variance.percent.toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn("text-xs font-normal capitalize", severityStyles[variance.severity])}
                    >
                      {variance.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs text-sm text-muted-foreground">
                    {variance.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function RecommendationsCard() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgetData.variances.map((variance) => (
          <div
            key={variance.id}
            className="rounded-lg border border-border/50 bg-muted/30 p-4"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  variance.severity === "high"
                    ? "bg-destructive/10"
                    : variance.severity === "medium"
                      ? "bg-warning/20"
                      : "bg-primary/10"
                )}
              >
                {variance.severity === "high" ? (
                  <AlertTriangle className="h-3 w-3 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {variance.category} - {variance.department}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {variance.recommendation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function BudgetVsActual() {
  return (
    <div className="space-y-6">
      <BudgetSummaryCards />

      <div className="grid gap-6 xl:grid-cols-2">
        <BudgetVsActualChart />
        <VarianceAnalysisTable />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {budgetData.byDepartment.slice(0, 2).map((dept) => (
          <DepartmentCard key={dept.name} department={dept} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {budgetData.byDepartment.slice(2).map((dept) => (
          <DepartmentCard key={dept.name} department={dept} />
        ))}
      </div>

      <RecommendationsCard />
    </div>
  )
}
