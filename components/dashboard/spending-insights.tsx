"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { spendingInsights } from "@/lib/mock-data"

const insightStyles = {
  increase: {
    bg: "bg-destructive/10",
    icon: ArrowUpRight,
    iconColor: "text-destructive",
    badge: "bg-destructive/10 text-destructive",
  },
  decrease: {
    bg: "bg-primary/10",
    icon: ArrowDownRight,
    iconColor: "text-primary",
    badge: "bg-primary/10 text-primary",
  },
  anomaly: {
    bg: "bg-warning/20",
    icon: AlertTriangle,
    iconColor: "text-warning",
    badge: "bg-warning/20 text-warning-foreground",
  },
  comparison: {
    bg: "bg-secondary/50",
    icon: AlertCircle,
    iconColor: "text-muted-foreground",
    badge: "bg-secondary text-secondary-foreground",
  },
  warning: {
    bg: "bg-warning/20",
    icon: Lightbulb,
    iconColor: "text-warning",
    badge: "bg-warning/20 text-warning-foreground",
  },
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

export function SpendingInsights() {
  const criticalInsights = spendingInsights.filter((i) => i.type === "anomaly")
  const positiveInsights = spendingInsights.filter((i) => i.type === "decrease")
  const warningInsights = spendingInsights.filter((i) => i.trend === "warning" || i.trend === "up")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">AI Insights</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Lightbulb className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">
              {spendingInsights.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {criticalInsights.length} require action, {warningInsights.length} warnings
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Potential Savings</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <TrendingDown className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-primary">$1,380</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Yearly savings identified
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card sm:col-span-2 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Spending Trend</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/20">
                <TrendingUp className="h-4.5 w-4.5 text-warning" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-warning">+12%</p>
            <p className="mt-1 text-xs text-muted-foreground">
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Lightbulb className="h-4.5 w-4.5 text-primary" />
            AI Spending Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {spendingInsights.map((insight) => {
              const style = insightStyles[insight.type] || insightStyles.comparison
              const Icon = style.icon

              return (
                <div
                  key={insight.id}
                  className={cn(
                    "rounded-lg border p-4 transition-colors hover:bg-muted/30",
                    insight.type === "anomaly" && "border-warning/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        style.bg
                      )}
                    >
                      <Icon className={cn("h-4 w-4", style.iconColor)} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={cn("text-xs font-normal", style.badge)}
                          variant="secondary"
                        >
                          {insight.category}
                        </Badge>
                        {insight.type === "anomaly" && (
                          <Badge
                            className="bg-destructive/10 text-destructive text-xs font-normal"
                            variant="secondary"
                          >
                            Action Needed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {insight.insight}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {insight.detail}
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Impact: {formatCurrency(insight.amount)}
                        </span>
                      </div>
                      <div className="mt-2 rounded-md bg-muted/30 p-2">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">AI Recommendation: </span>
                          {insight.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
