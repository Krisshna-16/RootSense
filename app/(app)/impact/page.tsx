"use client"

import { TreePine, Droplets, CheckCircle2, Trophy, Medal, Award, TrendingUp, Zap, Wind, Recycle, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Mock data for resolved issues with impact calculations
const resolvedIssuesData = [
  { id: 1, type: "Water", description: "Fixed leaking tap in Admin Block", waterSaved: 1825, co2Reduced: 0.5, resolvedDate: "2026-01-27" },
  { id: 2, type: "Water", description: "Repaired broken pipe in Central Garden", waterSaved: 3650, co2Reduced: 1.0, resolvedDate: "2026-01-25" },
  { id: 3, type: "Irrigation", description: "Fixed sprinkler system malfunction", waterSaved: 2190, co2Reduced: 0.6, resolvedDate: "2026-01-22" },
  { id: 4, type: "Lighting", description: "Replaced 3 street lights with solar", waterSaved: 0, co2Reduced: 45.0, energySaved: 1200, resolvedDate: "2026-01-28" },
  { id: 5, type: "Waste", description: "E-waste properly recycled (25kg)", waterSaved: 0, co2Reduced: 12.5, wasteRecycled: 25, resolvedDate: "2026-01-25" },
  { id: 6, type: "Pollution", description: "Stopped leaf burning, composting started", waterSaved: 0, co2Reduced: 8.2, resolvedDate: "2026-01-24" },
  { id: 7, type: "Drainage", description: "Rainwater harvesting pit restored", waterSaved: 5000, co2Reduced: 1.4, resolvedDate: "2026-01-23" },
  { id: 8, type: "Water", description: "Water cooler leak fixed", waterSaved: 730, co2Reduced: 0.2, resolvedDate: "2026-01-25" },
  { id: 9, type: "Irrigation", description: "Drip irrigation installed (saves 40%)", waterSaved: 4380, co2Reduced: 1.2, resolvedDate: "2026-01-20" },
  { id: 10, type: "Waste", description: "Organic waste composting bin added", waterSaved: 0, co2Reduced: 15.0, wasteRecycled: 150, resolvedDate: "2026-01-18" },
]

// Calculate totals from resolved issues
const impactTotals = {
  waterSaved: resolvedIssuesData.reduce((sum, issue) => sum + (issue.waterSaved || 0), 0),
  co2Reduced: resolvedIssuesData.reduce((sum, issue) => sum + (issue.co2Reduced || 0), 0),
  energySaved: resolvedIssuesData.reduce((sum, issue) => sum + (issue.energySaved || 0), 0),
  wasteRecycled: resolvedIssuesData.reduce((sum, issue) => sum + (issue.wasteRecycled || 0), 0),
  issuesResolved: resolvedIssuesData.length,
}

// Mock data for leaderboard - comprehensive department and hostel rankings
const leaderboardData = [
  { rank: 1, name: "Computer Science Dept.", score: 95, trees: 156, issues: 42, waterSaved: "3,420L", volunteers: 28 },
  { rank: 2, name: "Mechanical Engineering", score: 92, trees: 142, issues: 38, waterSaved: "2,890L", volunteers: 24 },
  { rank: 3, name: "Electrical Engineering", score: 88, trees: 128, issues: 35, waterSaved: "2,650L", volunteers: 22 },
  { rank: 4, name: "Civil Engineering", score: 85, trees: 118, issues: 31, waterSaved: "2,340L", volunteers: 19 },
  { rank: 5, name: "Hostel A (Boys)", score: 82, trees: 96, issues: 28, waterSaved: "1,980L", volunteers: 45 },
  { rank: 6, name: "Hostel B (Girls)", score: 79, trees: 88, issues: 26, waterSaved: "1,750L", volunteers: 52 },
  { rank: 7, name: "Chemical Engineering", score: 77, trees: 82, issues: 22, waterSaved: "1,620L", volunteers: 16 },
  { rank: 8, name: "Biotechnology Dept.", score: 76, trees: 78, issues: 20, waterSaved: "1,540L", volunteers: 14 },
  { rank: 9, name: "Admin & Staff Block", score: 74, trees: 72, issues: 18, waterSaved: "1,380L", volunteers: 12 },
  { rank: 10, name: "Library & Archives", score: 72, trees: 64, issues: 15, waterSaved: "1,120L", volunteers: 8 },
  { rank: 11, name: "Hostel C (PG)", score: 70, trees: 58, issues: 14, waterSaved: "980L", volunteers: 22 },
  { rank: 12, name: "Sports Department", score: 68, trees: 52, issues: 12, waterSaved: "850L", volunteers: 18 },
]

const rankIcons = {
  1: Trophy,
  2: Medal,
  3: Award,
}

const rankColors = {
  1: "text-yellow-500",
  2: "text-gray-400",
  3: "text-amber-600",
}

export default function ImpactPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Impact & Scores</h1>
        <p className="mt-1 text-muted-foreground">Environmental impact metrics and department rankings</p>
      </div>

      {/* Estimated Impact Summary - Calculated from Resolved Issues */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground">Estimated Impact from Resolved Issues</CardTitle>
          </div>
          <CardDescription>
            Real-time projections calculated from {impactTotals.issuesResolved} resolved civic issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Water Saved */}
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/10">
                  <Droplets className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Water Saved</p>
                  <p className="text-xl font-bold text-chart-2">{impactTotals.waterSaved.toLocaleString()}L</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                From fixing {resolvedIssuesData.filter(i => i.waterSaved > 0).length} water-related issues
              </p>
            </div>

            {/* CO2 Reduced */}
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Wind className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">CO2 Reduced</p>
                  <p className="text-xl font-bold text-primary">{impactTotals.co2Reduced.toFixed(1)} kg</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Equivalent to planting {Math.round(impactTotals.co2Reduced / 21)} trees
              </p>
            </div>

            {/* Energy Saved */}
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-4/10">
                  <Zap className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Energy Saved</p>
                  <p className="text-xl font-bold text-chart-4">{impactTotals.energySaved.toLocaleString()} kWh</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                From solar lighting upgrades
              </p>
            </div>

            {/* Waste Recycled */}
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/10">
                  <Recycle className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Waste Recycled</p>
                  <p className="text-xl font-bold text-chart-3">{impactTotals.wasteRecycled} kg</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                E-waste and organic materials
              </p>
            </div>
          </div>

          {/* Recent Impact Contributions */}
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-medium text-foreground">Recent Resolved Issues Contributing to Impact</h4>
            <div className="space-y-2">
              {resolvedIssuesData.slice(0, 5).map((issue) => (
                <div key={issue.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{issue.description}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {issue.waterSaved > 0 && (
                      <span className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-chart-2" />
                        {issue.waterSaved.toLocaleString()}L
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Wind className="h-3 w-3 text-primary" />
                      {issue.co2Reduced}kg CO2
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tree Survival Rate */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Tree Survival Rate</CardTitle>
              <TreePine className="h-6 w-6 text-primary" />
            </div>
            <CardDescription>Percentage of monitored trees thriving</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-end gap-2">
              <span className="text-4xl font-bold text-primary">89%</span>
              <span className="mb-1 flex items-center text-sm text-primary">
                <TrendingUp className="mr-1 h-4 w-4" />
                +3% this month
              </span>
            </div>
            <Progress value={89} className="h-3 bg-muted" />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-lg bg-primary/10 p-2">
                <div className="font-semibold text-primary">1,110</div>
                <div className="text-xs text-muted-foreground">Healthy</div>
              </div>
              <div className="rounded-lg bg-chart-4/10 p-2">
                <div className="font-semibold text-chart-4">95</div>
                <div className="text-xs text-muted-foreground">Moderate</div>
              </div>
              <div className="rounded-lg bg-destructive/10 p-2">
                <div className="font-semibold text-destructive">42</div>
                <div className="text-xs text-muted-foreground">Critical</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Water Saved */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Water Saved</CardTitle>
              <Droplets className="h-6 w-6 text-chart-2" />
            </div>
            <CardDescription>Estimated water conservation this year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-end gap-2">
              <span className="text-4xl font-bold text-chart-2">24,560</span>
              <span className="mb-1 text-lg text-muted-foreground">Liters</span>
            </div>
            <Progress value={65} className="h-3 bg-muted" />
            <p className="mt-2 text-sm text-muted-foreground">65% of yearly target (38,000L)</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-sm">
              <div className="rounded-lg bg-chart-2/10 p-2">
                <div className="font-semibold text-chart-2">18,200L</div>
                <div className="text-xs text-muted-foreground">Smart Irrigation</div>
              </div>
              <div className="rounded-lg bg-chart-2/10 p-2">
                <div className="font-semibold text-chart-2">6,360L</div>
                <div className="text-xs text-muted-foreground">Leak Repairs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues Resolved */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Issues Resolved</CardTitle>
              <CheckCircle2 className="h-6 w-6 text-chart-3" />
            </div>
            <CardDescription>Civic issues addressed this year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-end gap-2">
              <span className="text-4xl font-bold text-chart-3">156</span>
              <span className="mb-1 flex items-center text-sm text-chart-3">
                <TrendingUp className="mr-1 h-4 w-4" />
                +12 this week
              </span>
            </div>
            <Progress value={78} className="h-3 bg-muted" />
            <p className="mt-2 text-sm text-muted-foreground">78% resolution rate (156/200 total)</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-lg bg-chart-3/10 p-2">
                <div className="font-semibold text-chart-3">52</div>
                <div className="text-xs text-muted-foreground">High</div>
              </div>
              <div className="rounded-lg bg-chart-3/10 p-2">
                <div className="font-semibold text-chart-3">68</div>
                <div className="text-xs text-muted-foreground">Medium</div>
              </div>
              <div className="rounded-lg bg-chart-3/10 p-2">
                <div className="font-semibold text-chart-3">36</div>
                <div className="text-xs text-muted-foreground">Low</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Green Score */}
      <Card className="mb-8 border-border bg-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-foreground">Campus Green Score</CardTitle>
              <CardDescription>Overall sustainability rating based on all metrics</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">How is this calculated?</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <p className="text-sm">
                    <strong>Green Score = </strong>
                    Tree Health (30%) + Water Conservation (25%) + Issue Response (25%) + Community Engagement (20%)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-4 sm:flex-row sm:gap-12">
            <div className="text-center">
              <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center">
                <svg className="h-32 w-32 -rotate-90 transform">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={351.86}
                    strokeDashoffset={351.86 * (1 - 0.87)}
                    strokeLinecap="round"
                    className="text-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-primary">87</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
              <Badge className="bg-primary text-primary-foreground">Excellent</Badge>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">Tree Health</span>
                  <span className="font-medium text-foreground">89/100</span>
                </div>
                <Progress value={89} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">Water Conservation</span>
                  <span className="font-medium text-foreground">85/100</span>
                </div>
                <Progress value={85} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">Issue Response</span>
                  <span className="font-medium text-foreground">78/100</span>
                </div>
                <Progress value={78} className="h-2 bg-muted" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">Community Engagement</span>
                  <span className="font-medium text-foreground">92/100</span>
                </div>
                <Progress value={92} className="h-2 bg-muted" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-foreground">Department & Hostel Leaderboard</CardTitle>
              <CardDescription>Rankings based on sustainability contributions</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">How are rankings calculated?</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <p className="text-sm">
                    <strong>Ranking factors: </strong>
                    Trees monitored (40 pts), Issues reported and resolved (30 pts), Active volunteers (20 pts), Water saved (10 pts)
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Rank</th>
                  <th className="pb-3 pr-4 font-medium">Department/Hostel</th>
                  <th className="pb-3 pr-4 font-medium text-right">Score</th>
                  <th className="hidden pb-3 pr-4 font-medium text-right sm:table-cell">Trees</th>
                  <th className="hidden pb-3 pr-4 font-medium text-right md:table-cell">Issues</th>
                  <th className="pb-3 font-medium text-right">Volunteers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leaderboardData.map((entry) => {
                  const RankIcon = rankIcons[entry.rank as keyof typeof rankIcons]
                  const rankColor = rankColors[entry.rank as keyof typeof rankColors]
                  return (
                    <tr
                      key={entry.rank}
                      className={`text-sm ${entry.rank <= 3 ? "bg-secondary/30" : ""}`}
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          {RankIcon ? (
                            <RankIcon className={`h-5 w-5 ${rankColor}`} />
                          ) : (
                            <span className="flex h-5 w-5 items-center justify-center text-muted-foreground">
                              {entry.rank}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium text-foreground">{entry.name}</td>
                      <td className="py-3 pr-4 text-right">
                        <span className={`font-semibold ${entry.rank <= 3 ? "text-primary" : "text-foreground"}`}>
                          {entry.score}
                        </span>
                      </td>
                      <td className="hidden py-3 pr-4 text-right text-muted-foreground sm:table-cell">{entry.trees}</td>
                      <td className="hidden py-3 pr-4 text-right text-muted-foreground md:table-cell">{entry.issues}</td>
                      <td className="py-3 text-right text-muted-foreground">{entry.volunteers}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
