import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer id="about" className="border-t border-border/50 bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">FinGuard AI</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI-powered financial management for modern businesses. Trusted by
              2,000+ SMEs worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="mt-4 space-y-3">
              {["Features", "Pricing", "Integrations", "API"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="mt-4 space-y-3">
              {["Privacy", "Terms", "Security", "Compliance"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          2026 FinGuard AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
