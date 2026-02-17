"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { revenueExpenseData } from "@/lib/mock-data"

export function RevenueChart() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-foreground">
          Revenue vs Expenses
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly comparison for the last 6 months
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueExpenseData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", paddingBottom: "8px" }}
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="var(--color-chart-1)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="var(--color-chart-2)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
