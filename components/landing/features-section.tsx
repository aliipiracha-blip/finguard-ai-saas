import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  TrendingUp,
  Calculator,
  ShieldAlert,
  Activity,
} from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "AI Bookkeeping",
    description:
      "Automatically categorize and reconcile transactions with 98.5% accuracy using advanced machine learning.",
  },
  {
    icon: TrendingUp,
    title: "Cash Flow Forecasting",
    description:
      "Predict your cash position up to 90 days ahead with AI-driven models that learn from your business patterns.",
  },
  {
    icon: Calculator,
    title: "Tax Estimator",
    description:
      "Real-time tax liability estimation with optimization suggestions that can save you thousands annually.",
  },
  {
    icon: ShieldAlert,
    title: "Fraud Detection",
    description:
      "Detect anomalous transactions instantly with behavioral analysis and pattern recognition algorithms.",
  },
  {
    icon: Activity,
    title: "Financial Health Score",
    description:
      "Get a comprehensive score of your business health with actionable insights to improve your financial position.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border/50 bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to manage your finances
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Powerful AI tools that replace an entire finance team, designed
            specifically for small and medium businesses.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/50 bg-card transition-all hover:border-primary/20 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
