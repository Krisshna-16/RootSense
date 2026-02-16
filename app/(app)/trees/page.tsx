"use client"

import React, { useState, useEffect } from "react"
import { TreePine, Upload, MapPin, Calendar, Search, Filter, Loader2, CheckCircle2, Leaf, Droplets, Sun, Info } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { analyzeTreeImage } from "@/lib/gemini"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Tree {
  id: string
  tree_id: string
  location: string
  species: string
  health: "Healthy" | "Moderate" | "Critical"
  green_coverage: number
  leaf_density: number
  water_needs: string
  recommendation: string
  image_url: string
  confidence: number
  created_at?: string
  uploaded_by?: string
}

const healthColors = {
  Healthy: "bg-primary text-primary-foreground",
  Moderate: "border-chart-4 text-chart-4 bg-chart-4/10",
  Critical: "bg-destructive text-destructive-foreground",
}

const healthDots = {
  Healthy: "bg-primary",
  Moderate: "bg-chart-4",
  Critical: "bg-destructive",
}

const locationMap: Record<string, string> = {
  "block-a": "Block A, Engineering Building",
  "library": "Library Lawn",
  "sports": "Sports Complex",
  "garden": "Central Garden",
  "hostel-a": "Hostel A Entrance",
  "admin": "Admin Block",
  "canteen": "Canteen Area",
  "other": "Other",
}

// Mock analysis function removed as we now use real AI

export default function TreesPage() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [healthFilter, setHealthFilter] = useState<string>("all")

  // UI State
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  // Define analysis result type based on Gemini response
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  // Upload Logic State
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [newTreeId, setNewTreeId] = useState("")
  const [newTreeLocation, setNewTreeLocation] = useState("")

  // Fetch trees from Supabase on mount
  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const { data, error } = await supabase
          .from("trees")
          .select("*")
          .order('created_at', { ascending: false })

        // Only log error if it's not a schema cache issue
        if (error && !error.message.includes("schema cache")) {
          console.error("Error loading trees:", error)
        }

        // Set data even if there's a schema cache warning
        if (data) {
          setTrees(data as Tree[])
        }
      } catch (err) {
        console.error("Unexpected error loading trees:", err)
      }
    }

    fetchTrees()
  }, [])

  // Handle file selection and AI analysis
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = async () => {
        setUploadedImagePreview(reader.result as string)

        // Start real AI analysis with Gemini
        setIsAnalyzing(true)
        setAnalysisComplete(false)
        setAnalysisResult(null)

        try {
          const analysis = await analyzeTreeImage(file)
          setAnalysisResult(analysis)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
        } catch (error: any) {
          console.error("AI analysis failed:", error)
          setIsAnalyzing(false)
          alert(`Error: ${error.message || "Something went wrong"}`)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Save data to Supabase
  const saveTreeData = async () => {
    if (!selectedFile || !analysisResult) return

    try {
      const treeId = newTreeId || `T-${Date.now()}`
      const fileName = `${treeId}-${Date.now()}.${selectedFile.name.split('.').pop()}`

      // 1. Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("tree-images")
        .upload(fileName, selectedFile)

      if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError)
        alert(`Failed to upload image: ${uploadError.message}`)
        return
      }

      // 2. Get Public URL
      const { data: urlData } = supabase.storage
        .from("tree-images")
        .getPublicUrl(fileName)

      const publicUrl = urlData.publicUrl

      // 3. Insert into Supabase Database
      const newTreePayload = {
        tree_id: treeId,
        location: locationMap[newTreeLocation] || newTreeLocation || "Unknown Location",
        species: analysisResult.detectedSpecies,
        health: analysisResult.healthStatus, // "Healthy" | "Moderate" | "Critical"
        green_coverage: analysisResult.greenCoverage,
        leaf_density: analysisResult.leafDensity,
        water_needs: analysisResult.waterNeeds,
        recommendation: analysisResult.recommendation,
        image_url: publicUrl,
        confidence: analysisResult.confidence,
        // Optional: uploaded_by if user auth is set up
      }

      const { data: insertData, error: insertError } = await supabase
        .from("trees")
        .insert([newTreePayload])
        .select() // Select returned data to update local state more robustly if needed

      if (insertError) throw insertError

      // 4. Refresh List
      const { data: refreshedData } = await supabase.from("trees").select("*").order('created_at', { ascending: false })
      if (refreshedData) setTrees(refreshedData as Tree[])

      // 5. Reset UI
      handleDialogClose(false)
      alert("Tree data saved successfully to Supabase!")

    } catch (error: any) {
      console.error("Unexpected error saving tree:", error)
      alert(`An unexpected error occurred: ${error.message || error}`)
    }
  }

  const resetUpload = () => {
    setUploadedImagePreview(null)
    setSelectedFile(null)
    setIsAnalyzing(false)
    setAnalysisComplete(false)
    setAnalysisResult(null)
    setNewTreeId("")
    setNewTreeLocation("")
  }

  const handleDialogClose = (open: boolean) => {
    setIsUploadOpen(open)
    if (!open) resetUpload()
  }

  const filteredTrees = trees.filter((tree) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      tree.tree_id?.toLowerCase().includes(searchLower) ||
      tree.location?.toLowerCase().includes(searchLower) ||
      tree.species?.toLowerCase().includes(searchLower)

    const matchesHealth = healthFilter === "all" || tree.health === healthFilter

    return matchesSearch && matchesHealth
  })

  const stats = {
    total: trees.length,
    healthy: trees.filter((t) => t.health === "Healthy").length,
    moderate: trees.filter((t) => t.health === "Moderate").length,
    critical: trees.filter((t) => t.health === "Critical").length,
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Tree Monitoring</h1>
          <p className="mt-1 text-muted-foreground">Track and manage campus trees with Supabase & AI integration</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Tree Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Upload Tree Photo for AI Analysis</DialogTitle>
              <DialogDescription>
                AI will analyze tree health and save results to Supabase Database.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {!uploadedImagePreview ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="tree-id">Tree ID (optional)</Label>
                    <Input
                      id="tree-id"
                      placeholder="e.g., T-1248"
                      value={newTreeId}
                      onChange={(e) => setNewTreeId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={newTreeLocation} onValueChange={setNewTreeLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="block-a">Block A, Engineering Building</SelectItem>
                        <SelectItem value="library">Library Lawn</SelectItem>
                        <SelectItem value="sports">Sports Complex</SelectItem>
                        <SelectItem value="garden">Central Garden</SelectItem>
                        <SelectItem value="hostel-a">Hostel A Entrance</SelectItem>
                        <SelectItem value="admin">Admin Block</SelectItem>
                        <SelectItem value="canteen">Canteen Area</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Photo</Label>
                    <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50">
                      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click/Drag to upload</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {/* Uploaded Image Preview */}
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                    <img
                      src={uploadedImagePreview || "/placeholder.svg"}
                      alt="Uploaded tree"
                      className="h-full w-full object-cover"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                        <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm font-medium text-foreground">AI Analyzing Tree...</p>
                        <p className="text-xs text-muted-foreground">Detecting health indicators</p>
                      </div>
                    )}
                  </div>

                  {/* Analysis Results */}
                  {analysisComplete && analysisResult && (
                    <div className="space-y-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">AI Analysis Complete</span>
                        <Badge variant="outline" className="ml-auto text-xs">
                          {analysisResult.confidence}% confidence
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between rounded-md bg-card p-3">
                        <span className="text-sm font-medium text-foreground">Health Status</span>
                        <Badge className={healthColors[analysisResult.healthStatus as keyof typeof healthColors]}>
                          {analysisResult.healthStatus}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between rounded-md bg-card p-3">
                        <span className="text-sm font-medium text-foreground">Detected Species</span>
                        <span className="text-sm text-muted-foreground">{analysisResult.detectedSpecies}</span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-md bg-card p-3">
                          <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Leaf className="h-3.5 w-3.5" />
                            Green Coverage
                          </div>
                          <div className="mb-1 text-lg font-semibold text-foreground">{analysisResult.greenCoverage}%</div>
                          <Progress value={analysisResult.greenCoverage} className="h-1.5" />
                        </div>
                        <div className="rounded-md bg-card p-3">
                          <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Sun className="h-3.5 w-3.5" />
                            Leaf Density
                          </div>
                          <div className="mb-1 text-lg font-semibold text-foreground">{analysisResult.leafDensity}%</div>
                          <Progress value={analysisResult.leafDensity} className="h-1.5" />
                        </div>
                        <div className="rounded-md bg-card p-3">
                          <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Droplets className="h-3.5 w-3.5" />
                            Water Needs
                          </div>
                          <div className="text-lg font-semibold text-foreground">{analysisResult.waterNeeds}</div>
                        </div>
                      </div>

                      <div className="rounded-md bg-card p-3">
                        <p className="mb-1 text-xs font-medium text-muted-foreground">AI Recommendation</p>
                        <p className="text-sm text-foreground">{analysisResult.recommendation}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={resetUpload} className="flex-1 bg-transparent">
                      Upload Different Photo
                    </Button>
                    {analysisComplete && (
                      <Button className="flex-1" onClick={saveTreeData}>
                        Save to Supabase
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Card */}
      <Card className="mb-6 border-chart-2/30 bg-chart-2/5">
        <CardContent className="flex items-start gap-3 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-chart-2" />
          <div>
            <p className="font-medium text-foreground">How Tree Health is Determined</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Our AI analyzes tree photos looking at <strong>green coverage</strong>,
              <strong> leaf density</strong>, and <strong>color patterns</strong>.
              Health status is categorized as Healthy (80%+ green coverage), Moderate (55-79%), or Critical (&lt;55%).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Trees</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <TreePine className="h-8 w-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Healthy</p>
                <p className="text-2xl font-bold text-primary">{stats.healthy}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Moderate</p>
                <p className="text-2xl font-bold text-chart-4">{stats.moderate}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-chart-4" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-destructive">{stats.critical}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6 border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by ID, location, or species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={healthFilter} onValueChange={setHealthFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by health" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Healthy">Healthy</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trees Grid */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Trees ({filteredTrees.length})</CardTitle>
          <CardDescription>Click on a tree to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrees.map((tree) => (
              <Card
                key={tree.id || tree.tree_id} // Fallback key
                className="cursor-pointer border-border bg-secondary/30 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${healthDots[tree.health] || 'bg-gray-400'}`} />
                      <span className="font-mono text-sm font-medium text-foreground">{tree.tree_id}</span>
                    </div>
                    <Badge className={healthColors[tree.health] || ''}>
                      {tree.health}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TreePine className="h-4 w-4" />
                      <span>{tree.species}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{tree.location}</span>
                    </div>
                    {tree.created_at && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Added: {new Date(tree.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
