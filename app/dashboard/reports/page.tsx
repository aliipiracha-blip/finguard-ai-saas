import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileBarChart,
  TrendingUp,
  DollarSign,
  PieChart,
  Download,
} from "lucide-react"

const reports = [
  {
    title: "Profit & Loss Statement",
    description: "Comprehensive income and expense breakdown for the current period.",
    icon: TrendingUp,
    period: "Jan 2026 - Feb 2026",
  },
  {
    title: "Balance Sheet",
    description: "Assets, liabilities, and equity overview of your business.",
    icon: DollarSign,
    period: "As of Feb 17, 2026",
  },
  {
    title: "Cash Flow Statement",
    description: "Operating, investing, and financing cash flow activities.",
    icon: FileBarChart,
    period: "Jan 2026 - Feb 2026",
  },
  {
    title: "Expense Breakdown",
    description: "Detailed categorization of all business expenses by department.",
    icon: PieChart,
    period: "Jan 2026 - Feb 2026",
  },
]

export default function ReportsPage() {
  return (
    <>
      <DashboardHeader title="Reports" />
      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {reports.map((report) => (
            <Card key={report.title} className="border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download {report.title}</span>
                  </Button>
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {report.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {report.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {report.period}
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  View Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
