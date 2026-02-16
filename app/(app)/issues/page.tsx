"use client"

import React from "react"

import { useState } from "react"
import { AlertTriangle, Send, MapPin, Clock, CheckCircle2, Circle, AlertCircle, Loader2, Sparkles, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for issues - comprehensive civic issue reports
const issuesData = [
  { id: 1, type: "Irrigation", description: "Broken irrigation pipe causing significant water wastage near the main fountain", location: "Central Garden", status: "Open", priority: "High", reportedAt: "2026-01-30", reportedBy: "Priya Sharma" },
  { id: 2, type: "Waste", description: "Overflowing garbage bin creating foul smell and attracting pests", location: "Canteen Area", status: "Resolved", priority: "Medium", reportedAt: "2026-01-29", reportedBy: "Amit Joshi" },
  { id: 3, type: "Tree Care", description: "Large fallen branch blocking main pedestrian pathway after storm", location: "Library Lawn", status: "In Progress", priority: "High", reportedAt: "2026-01-29", reportedBy: "Rahul Verma" },
  { id: 4, type: "Pollution", description: "Excessive dust from ongoing construction affecting nearby classrooms", location: "New Building Site", status: "Open", priority: "Medium", reportedAt: "2026-01-28", reportedBy: "Dr. Ramesh" },
  { id: 5, type: "Lighting", description: "Three consecutive street lights not working, safety concern at night", location: "Parking Lot B", status: "Resolved", priority: "High", reportedAt: "2026-01-28", reportedBy: "Security Staff" },
  { id: 6, type: "Water", description: "Continuously leaking tap in men's washroom wasting approximately 50L/day", location: "Admin Block", status: "Resolved", priority: "Medium", reportedAt: "2026-01-27", reportedBy: "Suresh Kumar" },
  { id: 7, type: "Vegetation", description: "Overgrown grass and weeds on football field sidelines need urgent trimming", location: "Sports Complex", status: "In Progress", priority: "Medium", reportedAt: "2026-01-27", reportedBy: "Sports Committee" },
  { id: 8, type: "Drainage", description: "Severely clogged drain causing water stagnation and mosquito breeding", location: "Hostel A", status: "Open", priority: "High", reportedAt: "2026-01-26", reportedBy: "Hostel Warden" },
  { id: 9, type: "Tree Care", description: "Ancient banyan tree showing signs of disease, expert consultation needed", location: "Main Gate Avenue", status: "Open", priority: "High", reportedAt: "2026-01-26", reportedBy: "Botany Dept" },
  { id: 10, type: "Waste", description: "E-waste dumped behind computer lab needs proper disposal", location: "Computer Lab Building", status: "In Progress", priority: "Medium", reportedAt: "2026-01-25", reportedBy: "Lab Assistant" },
  { id: 11, type: "Water", description: "Water cooler leaking and creating slippery floor hazard", location: "Engineering Block", status: "Resolved", priority: "Medium", reportedAt: "2026-01-25", reportedBy: "Kavita Iyer" },
  { id: 12, type: "Pollution", description: "Burning of leaves near hostel causing air quality issues", location: "Hostel B - Rear Garden", status: "Resolved", priority: "High", reportedAt: "2026-01-24", reportedBy: "Divya Nair" },
  { id: 13, type: "Lighting", description: "Solar pathway lights not charging properly, need maintenance", location: "Central Garden Path", status: "Open", priority: "Low", reportedAt: "2026-01-24", reportedBy: "Night Security" },
  { id: 14, type: "Vegetation", description: "Invasive plant species spreading in botanical garden section B", location: "Botanical Garden", status: "In Progress", priority: "Medium", reportedAt: "2026-01-23", reportedBy: "Prof. Lakshmi" },
  { id: 15, type: "Drainage", description: "Rainwater harvesting pit overflow during heavy rains", location: "Research Center", status: "Resolved", priority: "Low", reportedAt: "2026-01-23", reportedBy: "Research Staff" },
  { id: 16, type: "Irrigation", description: "Automated sprinkler system malfunction watering concrete pathways", location: "Auditorium Lawn", status: "Resolved", priority: "Medium", reportedAt: "2026-01-22", reportedBy: "Grounds Staff" },
]

const statusIcons = {
  Open: Circle,
  "In Progress": AlertCircle,
  Resolved: CheckCircle2,
}

const priorityColors = {
  High: "bg-destructive text-destructive-foreground",
  Medium: "bg-chart-4 text-foreground",
  Low: "bg-muted text-muted-foreground",
}

const statusColors = {
  Open: "border-accent text-accent bg-accent/10",
  "In Progress": "bg-chart-4 text-foreground",
  Resolved: "bg-primary text-primary-foreground",
}

// AI category detection based on keywords
function detectCategory(description: string): string {
  const text = description.toLowerCase()
  
  if (text.includes("water") || text.includes("tap") || text.includes("leak") || text.includes("pipe") || text.includes("irrigation") || text.includes("sprinkler")) {
    return text.includes("irrigation") || text.includes("sprinkler") ? "Irrigation" : "Water"
  }
  if (text.includes("garbage") || text.includes("waste") || text.includes("trash") || text.includes("bin") || text.includes("dump")) {
    return "Waste"
  }
  if (text.includes("tree") || text.includes("branch") || text.includes("leaf") || text.includes("root")) {
    return "Tree Care"
  }
  if (text.includes("pollution") || text.includes("dust") || text.includes("smoke") || text.includes("air") || text.includes("smell")) {
    return "Pollution"
  }
  if (text.includes("light") || text.includes("lamp") || text.includes("dark") || text.includes("bulb")) {
    return "Lighting"
  }
  if (text.includes("drain") || text.includes("clog") || text.includes("stagnant") || text.includes("flood")) {
    return "Drainage"
  }
  if (text.includes("grass") || text.includes("weed") || text.includes("plant") || text.includes("garden") || text.includes("overgrown")) {
    return "Vegetation"
  }
  
  return "Other"
}

// AI priority detection based on urgency keywords
function detectPriority(description: string): string {
  const text = description.toLowerCase()
  
  const highKeywords = ["urgent", "emergency", "dangerous", "hazard", "safety", "broken", "flooding", "blocked", "severe", "critical", "immediate", "serious"]
  const lowKeywords = ["minor", "small", "when possible", "convenient", "eventually", "not urgent", "cosmetic"]
  
  if (highKeywords.some(keyword => text.includes(keyword))) {
    return "High"
  }
  if (lowKeywords.some(keyword => text.includes(keyword))) {
    return "Low"
  }
  
  return "Medium"
}

// Generate AI analysis message
function generateAIAnalysis(category: string, priority: string, description: string): string {
  const analyses = {
    Irrigation: [
      "Water infrastructure issue detected. This may be causing resource wastage and should be addressed to maintain campus sustainability goals.",
      "Irrigation system malfunction identified. Quick response can prevent water loss estimated at 100-500L per day.",
    ],
    Water: [
      "Plumbing-related water issue detected. Prompt repair can save significant water resources and prevent structural damage.",
      "Water conservation concern identified. Addressing this supports the campus green initiative.",
    ],
    Waste: [
      "Waste management issue flagged. Proper disposal is essential for campus hygiene and environmental compliance.",
      "Sanitation concern detected. Timely resolution prevents pest attraction and maintains campus cleanliness.",
    ],
    "Tree Care": [
      "Vegetation health concern identified. Our green cover contributes to 15% CO2 offset - this tree needs attention.",
      "Tree maintenance required. Campus trees provide shade and air quality benefits worth protecting.",
    ],
    Pollution: [
      "Environmental quality issue detected. Air/noise pollution affects student health and learning outcomes.",
      "Pollution concern flagged. Campus air quality index monitoring suggests this needs attention.",
    ],
    Lighting: [
      "Lighting infrastructure issue identified. Proper illumination is essential for campus safety after dark.",
      "Outdoor lighting concern detected. This affects both safety and energy efficiency metrics.",
    ],
    Drainage: [
      "Drainage system issue detected. Standing water can lead to mosquito breeding and structural concerns.",
      "Water flow obstruction identified. Quick resolution prevents flooding and maintains campus accessibility.",
    ],
    Vegetation: [
      "Landscape maintenance needed. Well-maintained green spaces improve campus aesthetics and air quality.",
      "Vegetation management required. This affects campus biodiversity and environmental health scores.",
    ],
    Other: [
      "Issue classified for manual review. Our team will assess and assign to the appropriate department.",
      "Environmental concern logged. Campus sustainability team will evaluate and prioritize accordingly.",
    ],
  }
  
  const categoryAnalyses = analyses[category as keyof typeof analyses] || analyses.Other
  const baseAnalysis = categoryAnalyses[Math.floor(Math.random() * categoryAnalyses.length)]
  
  const priorityNote = priority === "High" 
    ? " Marked as high priority for expedited response."
    : priority === "Low"
    ? " Added to routine maintenance queue."
    : " Scheduled for standard response time."
  
  return baseAnalysis + priorityNote
}

export default function IssuesPage() {
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [issueType, setIssueType] = useState("")
  const [priority, setPriority] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState<{
    category: string
    priority: string
    analysis: string
    confidence: number
  } | null>(null)

  const stats = {
    total: issuesData.length,
    open: issuesData.filter((i) => i.status === "Open" || i.status === "In Progress").length,
    resolved: issuesData.filter((i) => i.status === "Resolved").length,
    highPriority: issuesData.filter((i) => i.priority === "High" && i.status !== "Resolved").length,
  }

  // Trigger AI analysis when description changes (with debounce simulation)
  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    setAiResult(null)
    
    if (value.length > 20) {
      setIsAnalyzing(true)
      
      // Simulate AI processing delay
      setTimeout(() => {
        const detectedCategory = detectCategory(value)
        const detectedPriority = detectPriority(value)
        const analysis = generateAIAnalysis(detectedCategory, detectedPriority, value)
        
        setAiResult({
          category: detectedCategory,
          priority: detectedPriority,
          analysis,
          confidence: Math.floor(Math.random() * 10) + 85, // 85-95%
        })
        setIsAnalyzing(false)
        
        // Auto-fill the form fields with AI suggestions
        if (!issueType) setIssueType(detectedCategory.toLowerCase().replace(" ", "-"))
        if (!priority) setPriority(detectedPriority.toLowerCase())
      }, 1000 + Math.random() * 500)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - would connect to backend
    alert("Issue reported successfully! Assigned ID: #" + (issuesData.length + 1))
    setDescription("")
    setLocation("")
    setIssueType("")
    setPriority("")
    setAiResult(null)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Civic Issue Reporting</h1>
        <p className="mt-1 text-muted-foreground">Report and track environmental issues with AI-assisted categorization</p>
      </div>

      {/* Stats Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-accent/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open</p>
                <p className="text-2xl font-bold text-accent">{stats.open}</p>
              </div>
              <Circle className="h-6 w-6 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-primary">{stats.resolved}</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">{stats.highPriority}</p>
              </div>
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Report Form */}
        <Card className="border-border bg-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              Report New Issue
              <Badge variant="outline" className="ml-auto gap-1 text-xs">
                <Sparkles className="h-3 w-3" />
                AI Assisted
              </Badge>
            </CardTitle>
            <CardDescription>Describe the issue and let AI help categorize it</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail... (AI will analyze after 20+ characters)"
                  value={description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  rows={4}
                />
                {isAnalyzing && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    AI analyzing your description...
                  </div>
                )}
              </div>

              {/* AI Analysis Result */}
              {aiResult && (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Zap className="h-4 w-4" />
                    AI Analysis
                    <Badge variant="outline" className="ml-auto text-xs">
                      {aiResult.confidence}% confident
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded bg-card p-2">
                      <p className="text-xs text-muted-foreground">Detected Category</p>
                      <p className="font-medium text-foreground">{aiResult.category}</p>
                    </div>
                    <div className="rounded bg-card p-2">
                      <p className="text-xs text-muted-foreground">Suggested Priority</p>
                      <p className="font-medium text-foreground">{aiResult.priority}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{aiResult.analysis}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="issue-type">
                  Issue Type
                  {aiResult && <span className="ml-1 text-xs text-primary">(AI suggested)</span>}
                </Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="irrigation">Irrigation</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                    <SelectItem value="tree-care">Tree Care</SelectItem>
                    <SelectItem value="pollution">Pollution</SelectItem>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="vegetation">Vegetation</SelectItem>
                    <SelectItem value="drainage">Drainage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block-a">Block A, Engineering Building</SelectItem>
                    <SelectItem value="library">Library Lawn</SelectItem>
                    <SelectItem value="sports">Sports Complex</SelectItem>
                    <SelectItem value="garden">Central Garden</SelectItem>
                    <SelectItem value="hostel-a">Hostel A</SelectItem>
                    <SelectItem value="hostel-b">Hostel B</SelectItem>
                    <SelectItem value="admin">Admin Block</SelectItem>
                    <SelectItem value="canteen">Canteen Area</SelectItem>
                    <SelectItem value="parking">Parking Lot</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">
                  Priority
                  {aiResult && <span className="ml-1 text-xs text-primary">(AI suggested)</span>}
                </Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High - Urgent attention needed</SelectItem>
                    <SelectItem value="medium">Medium - Address soon</SelectItem>
                    <SelectItem value="low">Low - When convenient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Issues List */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Reported Issues</CardTitle>
            <CardDescription>All campus environmental issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issuesData.map((issue) => {
                const StatusIcon = statusIcons[issue.status as keyof typeof statusIcons]
                return (
                  <div
                    key={issue.id}
                    className="rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:border-primary/30"
                  >
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {issue.type}
                        </Badge>
                        <Badge className={priorityColors[issue.priority as keyof typeof priorityColors]}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <Badge className={statusColors[issue.status as keyof typeof statusColors]}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {issue.status}
                      </Badge>
                    </div>
                    <p className="mb-3 text-sm text-foreground">{issue.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {issue.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {issue.reportedAt}
                      </span>
                      <span className="ml-auto">by {issue.reportedBy}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
