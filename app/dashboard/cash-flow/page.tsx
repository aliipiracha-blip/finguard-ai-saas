"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { cashFlowData } from "@/lib/mock-data"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export default function CashFlowPage() {
  const netFlow = cashFlowData.map((d) => ({
    ...d,
    net: d.inflow - d.outflow,
  }))

  return (
    <>
      <DashboardHeader title="Cash Flow" />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Total Inflow (YTD)</p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-4.5 w-4.5 text-primary" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">$462,000</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Total Outflow (YTD)</p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                  <TrendingDown className="h-4.5 w-4.5 text-destructive" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">$331,000</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Net Cash Flow</p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-4.5 w-4.5 text-primary" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-primary">+$131,000</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Cash Flow Trend
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Inflow and outflow comparison with 3-month forecast
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
                  <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }} />
                  <Line type="monotone" dataKey="inflow" name="Inflow" stroke="var(--color-chart-1)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="outflow" name="Outflow" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Net Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={netFlow} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
                  <Area type="monotone" dataKey="net" name="Net Flow" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
