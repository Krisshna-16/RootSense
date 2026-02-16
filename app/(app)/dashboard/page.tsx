"use client";

import { TreePine, AlertTriangle, Droplets, Leaf, TrendingUp, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Mock data for charts
const treeHealthData = [
  { month: "Jan", healthy: 85, moderate: 10, critical: 5 },
  { month: "Feb", healthy: 87, moderate: 9, critical: 4 },
  { month: "Mar", healthy: 82, moderate: 12, critical: 6 },
  { month: "Apr", healthy: 88, moderate: 8, critical: 4 },
  { month: "May", healthy: 90, moderate: 7, critical: 3 },
  { month: "Jun", healthy: 89, moderate: 8, critical: 3 },
]

const activityData = [
  { day: "Mon", uploads: 12, issues: 5 },
  { day: "Tue", uploads: 18, issues: 8 },
  { day: "Wed", uploads: 15, issues: 3 },
  { day: "Thu", uploads: 22, issues: 7 },
  { day: "Fri", uploads: 28, issues: 4 },
  { day: "Sat", uploads: 8, issues: 2 },
  { day: "Sun", uploads: 5, issues: 1 },
]

const recentActivity = [
  { id: 1, type: "tree", title: "Banyan tree uploaded by Priya Sharma", location: "Block A, Engineering Building", time: "2 min ago", status: "Healthy" },
  { id: 2, type: "issue", title: "Broken irrigation pipe reported", location: "Central Garden", time: "15 min ago", status: "Open" },
  { id: 3, type: "tree", title: "Neem tree health updated", location: "Library Lawn", time: "1 hour ago", status: "Moderate" },
  { id: 4, type: "issue", title: "Overflowing dustbin cleared", location: "Hostel B Entrance", time: "2 hours ago", status: "Resolved" },
  { id: 5, type: "tree", title: "Gulmohar added by Rahul Verma", location: "Sports Complex", time: "3 hours ago", status: "Healthy" },
  { id: 6, type: "issue", title: "Clogged drain needs attention", location: "Canteen Backside", time: "4 hours ago", status: "In Progress" },
  { id: 7, type: "tree", title: "Peepal tree critical alert", location: "Admin Block Garden", time: "5 hours ago", status: "Critical" },
  { id: 8, type: "issue", title: "Street light fixed", location: "Parking Lot C", time: "6 hours ago", status: "Resolved" },
]

const chartConfig = {
  healthy: { label: "Healthy", color: "var(--chart-1)" },
  moderate: { label: "Moderate", color: "var(--chart-4)" },
  critical: { label: "Critical", color: "var(--destructive)" },
  uploads: { label: "Tree Uploads", color: "var(--chart-1)" },
  issues: { label: "Issues Reported", color: "var(--chart-2)" },
}

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Overview of campus sustainability metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Trees Monitored</CardTitle>
            <TreePine className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,247</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+23</span> this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Civic Issues</CardTitle>
            <AlertTriangle className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">42</div>
            <p className="mt-1 text-xs text-muted-foreground">
              <span className="text-primary">28 resolved</span>, 14 open
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Water Saved</CardTitle>
            <Droplets className="h-5 w-5 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">24,560</div>
            <p className="mt-1 text-xs text-muted-foreground">Liters this month</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Green Score</CardTitle>
            <Leaf className="h-5 w-5 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">87/100</div>
            <p className="mt-1 text-xs text-muted-foreground">Campus rating: Excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Tree Health Trend</CardTitle>
            <CardDescription>Percentage of trees by health status over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={treeHealthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                  <YAxis className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="healthy" stackId="1" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="moderate" stackId="1" stroke="var(--chart-4)" fill="var(--chart-4)" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="critical" stackId="1" stroke="var(--destructive)" fill="var(--destructive)" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Activity</CardTitle>
            <CardDescription>Tree uploads and issues reported this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                  <YAxis className="text-xs" tick={{ fill: 'var(--muted-foreground)' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="uploads" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="issues" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
          <CardDescription>Latest tree uploads and issue reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg ${activity.type === "tree" ? "bg-primary/10" : "bg-accent/10"
                    }`}>
                    {activity.type === "tree" ? (
                      <TreePine className="h-5 w-5 text-primary" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {activity.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    activity.status === "Healthy" || activity.status === "Resolved"
                      ? "default"
                      : activity.status === "Open" || activity.status === "In Progress"
                        ? "secondary"
                        : "outline"
                  }
                  className={
                    activity.status === "Healthy" || activity.status === "Resolved"
                      ? "bg-primary text-primary-foreground"
                      : activity.status === "Moderate"
                        ? "border-chart-4 text-chart-4"
                        : activity.status === "Critical"
                          ? "bg-destructive text-destructive-foreground"
                          : activity.status === "In Progress"
                            ? "bg-accent text-accent-foreground"
                            : ""
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
