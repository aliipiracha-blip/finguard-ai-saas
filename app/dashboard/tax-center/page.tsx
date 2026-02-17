"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, Calendar, Lightbulb, DollarSign } from "lucide-react"
import { taxData } from "@/lib/mock-data"

export default function TaxCenterPage() {
  const totalSavings = taxData.suggestions.reduce((acc, s) => acc + s.savings, 0)

  return (
    <>
      <DashboardHeader title="Tax Center" />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card className="border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Estimated Tax Liability
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-4.5 w-4.5 text-primary" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                ${taxData.estimatedLiability.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Effective rate: {taxData.effectiveRate}%
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Next Quarterly Payment
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-4.5 w-4.5 text-primary" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                ${taxData.quarterlyPayment.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Due {new Date(taxData.nextDeadline).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card sm:col-span-2 xl:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Filing Deadline Countdown
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/20">
                  <Calendar className="h-4.5 w-4.5 text-warning-foreground" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {taxData.daysUntilDeadline} days
              </p>
              <Progress
                value={((365 - taxData.daysUntilDeadline) / 365) * 100}
                className="mt-3 h-1.5"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Lightbulb className="h-4.5 w-4.5 text-primary" />
              Tax Optimization Suggestions
            </CardTitle>
            <span className="text-sm font-medium text-primary">
              Potential savings: ${totalSavings.toLocaleString()}
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            {taxData.suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 rounded-lg border border-border/50 bg-muted/30 p-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {suggestion.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Save ${suggestion.savings.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Tax Report
          </Button>
        </div>
      </div>
    </>
  )
}
