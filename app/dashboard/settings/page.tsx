"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="max-w-2xl space-y-6 p-6">
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" defaultValue="Acme Corp" />
            </div>
            <Button size="sm">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: "Cash flow alerts",
                desc: "Get notified when cash flow drops below threshold",
              },
              {
                label: "Fraud detection alerts",
                desc: "Receive alerts for suspicious transactions",
              },
              {
                label: "Tax reminders",
                desc: "Reminders for upcoming tax deadlines",
              },
              {
                label: "Weekly digest",
                desc: "Receive a weekly summary of your finances",
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={i < 3} />
                </div>
                {i < 3 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 border-destructive/30 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-destructive">
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button variant="destructive" size="sm" className="mt-4">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
