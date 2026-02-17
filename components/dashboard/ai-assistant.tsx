"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send } from "lucide-react"

const mockResponses = [
  "Based on your current spending trends, I recommend reducing marketing expenses by 15% next month to maintain a healthy cash reserve.",
  "Your accounts receivable aging shows 3 invoices over 60 days past due, totaling $12,400. I suggest following up with these clients this week.",
  "Great news! Your revenue has grown 8.2% month-over-month. At this rate, you'll exceed your Q1 target by approximately $14,000.",
]

export function AIAssistant() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setResponse("")

    // Simulate AI response
    setTimeout(() => {
      const randomResponse =
        mockResponses[Math.floor(Math.random() * mockResponses.length)]
      setResponse(randomResponse)
      setLoading(false)
    }, 1200)
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Sparkles className="h-4.5 w-4.5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Ask FinGuard AI anything about your finances..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={loading || !query.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>

        {(loading || response) && (
          <div className="mt-4 rounded-lg bg-muted/50 p-4">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span>Analyzing your financial data...</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-foreground">{response}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
