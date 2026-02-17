"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, TrendingUp, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 gap-1.5 px-4 py-1.5 text-sm font-medium">
            <Zap className="h-3.5 w-3.5" />
            Trusted by 2,000+ SMEs worldwide
          </Badge>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your AI-Powered{" "}
            <span className="text-primary">Virtual CFO</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Automate bookkeeping, predict cash flow, estimate taxes, and detect
            fraud in real-time. Built for modern businesses that move fast.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 px-8" asChild>
              <Link href="/dashboard">
                <Play className="h-4 w-4" />
                View Demo
              </Link>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>98.5% accuracy rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Setup in 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
