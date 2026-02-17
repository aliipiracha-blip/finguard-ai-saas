import { Card, CardContent } from "@/components/ui/card"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

const kpis = [
  {
    label: "Current Cash Balance",
    value: "$284,500",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Monthly Revenue",
    value: "$53,200",
    change: "+8.2%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    label: "Monthly Expenses",
    value: "$38,400",
    change: "+3.1%",
    trend: "down" as const,
    icon: TrendingDown,
  },
  {
    label: "Financial Health Score",
    value: "82/100",
    change: "Good",
    trend: "up" as const,
    icon: Activity,
    isScore: true,
  },
]

export function KPICards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <kpi.icon className="h-4.5 w-4.5 text-primary" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{kpi.value}</p>
            <div className="mt-2 flex items-center gap-1.5">
              {kpi.isScore ? (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {kpi.change}
                </span>
              ) : (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                    kpi.trend === "up" && kpi.label !== "Monthly Expenses"
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {kpi.change}
                </span>
              )}
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
