import Link from "next/link"
import { TreePine, AlertTriangle, BarChart3, ArrowRight, Leaf, Droplets, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ROOTSENSE</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/trees" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Trees
            </Link>
            <Link href="/issues" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Civic Issues
            </Link>
            <Link href="/impact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Impact
            </Link>
          </nav>
          <div className="flex items-center gap-4">



            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>

            <Button variant="outline" asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
            <Globe className="h-4 w-4 text-primary" />
            Campus Sustainability Platform
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Turning Campus Sustainability into</span>{" "}
            <span className="text-primary">Measurable Action</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            ROOTSENSE is a sustainability intelligence platform for college campuses. Track tree survival, report civic issues, and measure environmental impact with AI-powered insights.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/dashboard" className="gap-2">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/trees">View Tree Data</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Core Features</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Comprehensive tools to monitor, report, and improve campus sustainability
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border bg-card transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TreePine className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Tree Survival Tracking</CardTitle>
                <CardDescription>
                  Monitor tree health across campus with photo uploads and AI-powered analysis. Track survival rates and identify trees needing attention.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Photo-based health assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Location-based tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Historical trend analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <AlertTriangle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">Civic Issue Reporting</CardTitle>
                <CardDescription>
                  Report and track environmental issues on campus. From broken irrigation to waste management, keep your campus clean and green.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Easy issue submission
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Priority-based tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Resolution status updates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                  <BarChart3 className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle className="text-foreground">Eco-Impact Intelligence</CardTitle>
                <CardDescription>
                  Measure and visualize your campus environmental impact. Track water savings, carbon offset, and sustainability scores.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                    Water conservation metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                    Department leaderboards
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                    Green score calculation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Trees Monitored</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-primary">89%</div>
              <div className="text-sm text-muted-foreground">Survival Rate</div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-center gap-1 text-4xl font-bold text-primary">
                <Droplets className="h-8 w-8" />
                24K
              </div>
              <div className="text-sm text-muted-foreground">Liters Water Saved</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Issues Resolved</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to make your campus greener?</h2>
          <p className="mb-8 text-muted-foreground">
            Start tracking your sustainability efforts today and make a measurable impact.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard" className="gap-2">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">ROOTSENSE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Hackathon Project - Sustainability Intelligence for Campuses
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
