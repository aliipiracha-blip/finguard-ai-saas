import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { alerts } from "@/lib/mock-data"

const iconMap = {
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
}

const styleMap = {
  warning: "border-l-warning text-warning-foreground",
  danger: "border-l-destructive text-destructive",
  info: "border-l-primary text-primary",
}

const iconStyleMap = {
  warning: "text-warning",
  danger: "text-destructive",
  info: "text-primary",
}

export function AlertsPanel() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const Icon = iconMap[alert.type]
          return (
            <div
              key={alert.id}
              className={cn(
                "rounded-lg border border-border/50 border-l-4 bg-muted/30 p-4",
                styleMap[alert.type]
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconStyleMap[alert.type])} />
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {alert.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
