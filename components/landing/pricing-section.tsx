import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    description: "Perfect for freelancers and solo entrepreneurs.",
    features: [
      "AI Bookkeeping",
      "Up to 500 transactions/mo",
      "Basic cash flow view",
      "Email support",
      "1 bank connection",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Best for growing businesses and small teams.",
    features: [
      "Everything in Basic",
      "Unlimited transactions",
      "Cash flow forecasting",
      "Tax estimator",
      "Fraud detection",
      "Financial health score",
      "Priority support",
      "5 bank connections",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For established businesses with complex needs.",
    features: [
      "Everything in Pro",
      "Custom AI models",
      "API access",
      "Multi-entity support",
      "Dedicated account manager",
      "Custom integrations",
      "SOC 2 compliance",
      "Unlimited bank connections",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col border-border/50 ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/10"
                  : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="p-6 pb-0">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-6">
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/dashboard">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
