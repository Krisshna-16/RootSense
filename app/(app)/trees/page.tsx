"use client"

import React, { useState, useEffect } from "react"
import { TreePine, Upload, MapPin, Calendar, Search, Filter, Loader2, CheckCircle2, Leaf, Droplets, Sun, Info } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { analyzeTreeImage } from "@/lib/gemini"
import { getTrees, addTree } from "@/lib/services"
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

import { Tree } from "@/lib/mock-data"
import { CameraCapture } from "@/components/camera-capture"

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

export default function TreesPage() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [healthFilter, setHealthFilter] = useState<string>("all")

  // UI State
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false) // New state for camera
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  // Editable Analysis State
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [editableSpecies, setEditableSpecies] = useState("")
  const [editableHealth, setEditableHealth] = useState<string>("")
  const [editableGreenCoverage, setEditableGreenCoverage] = useState(0)
  const [editableLeafDensity, setEditableLeafDensity] = useState(0)
  const [editableWaterNeeds, setEditableWaterNeeds] = useState("")

  // Upload Logic State
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [newTreeId, setNewTreeId] = useState("")
  const [newTreeLocation, setNewTreeLocation] = useState("")

  // Fetch trees from Supabase on mount
  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const data = await getTrees()
        setTrees(data)
      } catch (err) {
        console.error("Unexpected error loading trees:", err)
      }
    }

    fetchTrees()
  }, [])

  // Handle file selection and AI analysis
  const handleFileProcess = async (file: File) => {
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = async () => {
      setUploadedImagePreview(reader.result as string)
      setIsCameraOpen(false) // Close camera if open

      // Start real AI analysis with Gemini
      setIsAnalyzing(true)
      setAnalysisComplete(false)
      setAnalysisResult(null)

      try {
        const analysis = await analyzeTreeImage(file)
        setAnalysisResult(analysis)

        // Set initial editable values
        setEditableSpecies(analysis.detectedSpecies)
        setEditableHealth(analysis.healthStatus)
        setEditableGreenCoverage(analysis.greenCoverage)
        setEditableLeafDensity(analysis.leafDensity)
        setEditableWaterNeeds(analysis.waterNeeds)

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

  // Removed handleImageUpload as file upload is no longer allowed

  const handleCameraCapture = (file: File) => {
    handleFileProcess(file)
  }

  const AREAS = [
    { id: "BLK-A", label: "Block A, Engineering Building" },
    { id: "LIB-G", label: "Library Lawn" },
    { id: "SPT-C", label: "Sports Complex" },
    { id: "GDN-C", label: "Central Garden" },
    { id: "HST-A", label: "Hostel A Entrance" },
    { id: "ADM-B", label: "Admin Block" },
    { id: "CNT-A", label: "Canteen Area" },
    { id: "OTH", label: "Other" },
  ]

  const handleAreaChange = (areaId: string) => {
    setNewTreeLocation(areaId)
    // Auto-generate Tree ID based on Area
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    setNewTreeId(`${areaId}-${randomNum}`)
  }

  // Save data to Supabase
  const saveTreeData = async () => {
    if (!selectedFile || !analysisResult) return

    try {
      const treeId = newTreeId || `T-${Date.now()}`
      const fileName = `${treeId}-${Date.now()}.${selectedFile.name.split('.').pop()}`
      const selectedArea = AREAS.find(a => a.id === newTreeLocation)
      const locationName = selectedArea ? selectedArea.label : "Unknown Location"

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

      // 3. Insert into Supabase Database via Service
      const newTreePayload = {
        tree_id: treeId,
        location: locationName,
        species: editableSpecies, // Use editable value
        health: editableHealth as "Healthy" | "Moderate" | "Critical", // Use editable value
        green_coverage: editableGreenCoverage, // Use editable value
        leaf_density: editableLeafDensity, // Use editable value
        water_needs: editableWaterNeeds, // Use editable value
        recommendation: analysisResult.recommendation, // Keep AI recommendation or make editable too if needed
        image_url: publicUrl,
        confidence: analysisResult.confidence,
        // Optional: uploaded_by if user auth is set up
      }

      await addTree(newTreePayload)

      // 4. Refresh List
      const refreshedData = await getTrees()
      setTrees(refreshedData)

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
    setIsCameraOpen(false)
    setNewTreeId("")
    setNewTreeLocation("")
  }

  const handleDialogClose = (open: boolean) => {
    setIsUploadOpen(open)
    if (!open) resetUpload()
  }

  const filteredTrees = trees.filter((tree) => {
    // ... existing filter logic
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      tree.tree_id?.toLowerCase().includes(searchLower) ||
      tree.location?.toLowerCase().includes(searchLower) ||
      tree.species?.toLowerCase().includes(searchLower)

    const matchesHealth = healthFilter === "all" || tree.health === healthFilter

    return matchesSearch && matchesHealth
  })

  // ... stats logic
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
              Add Tree
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Tree</DialogTitle>
              <DialogDescription>
                Select an area and capture a photo to analyze tree health.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {!uploadedImagePreview && !isCameraOpen ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="location">Area / Location</Label>
                    <Select value={newTreeLocation} onValueChange={handleAreaChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Area" />
                      </SelectTrigger>
                      <SelectContent>
                        {AREAS.map((area) => (
                          <SelectItem key={area.id} value={area.id}>{area.label} ({area.id})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tree-id">Tree ID (Auto-generated)</Label>
                    <Input
                      id="tree-id"
                      value={newTreeId}
                      readOnly
                      className="bg-muted font-mono"
                      placeholder="Select an area first"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full h-32 flex flex-col gap-2 border-dashed border-2 hover:border-primary/50 hover:bg-muted/50"
                      onClick={() => setIsCameraOpen(true)}
                      disabled={!newTreeLocation} // Force area selection first
                    >
                      <CheckCircle2 className="h-10 w-10 text-primary" />
                      <span className="text-lg font-semibold">Take Photo</span>
                      <span className="text-xs text-muted-foreground">Camera required for verification</span>
                    </Button>
                    {!newTreeLocation && (
                      <p className="text-xs text-destructive text-center mt-2">Please select an Area first.</p>
                    )}
                  </div>
                </>
              ) : isCameraOpen ? (
                <CameraCapture
                  onCapture={handleCameraCapture}
                  onCancel={() => setIsCameraOpen(false)}
                />
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
                      </div>
                    )}
                  </div>

                  {/* Analysis Results (Editable) */}
                  {analysisComplete && analysisResult && (
                    <div className="space-y-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">AI Analysis Complete</span>
                        {analysisResult.isMock && (
                          <Badge variant="destructive" className="ml-2">
                            SIMULATION
                          </Badge>
                        )}
                      </div>

                      {analysisResult.isMock && (
                        <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-3 text-sm text-yellow-600 dark:text-yellow-400">
                          <p className="font-semibold">⚠️ AI Service Busy</p>
                          <p>We hit the free tier rate limit. Results are simulated.</p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {/* Species */}
                        <div className="space-y-1">
                          <Label>Detected Species</Label>
                          <Input
                            value={editableSpecies}
                            onChange={(e) => setEditableSpecies(e.target.value)}
                            className="bg-background"
                          />
                        </div>

                        {/* Health */}
                        <div className="space-y-1">
                          <Label>Health Status</Label>
                          <Select value={editableHealth} onValueChange={setEditableHealth}>
                            <SelectTrigger className="bg-background">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Healthy">Healthy</SelectItem>
                              <SelectItem value="Moderate">Moderate</SelectItem>
                              <SelectItem value="Critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label>Green Coverage (%)</Label>
                            <Input
                              type="number"
                              value={editableGreenCoverage}
                              onChange={(e) => setEditableGreenCoverage(Number(e.target.value))}
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Leaf Density (%)</Label>
                            <Input
                              type="number"
                              value={editableLeafDensity}
                              onChange={(e) => setEditableLeafDensity(Number(e.target.value))}
                              className="bg-background"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label>Water Needs</Label>
                          <Select value={editableWaterNeeds} onValueChange={setEditableWaterNeeds}>
                            <SelectTrigger className="bg-background">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" onClick={resetUpload} className="flex-1 bg-transparent">
                          Retake
                        </Button>
                        <Button className="flex-1" onClick={saveTreeData}>
                          Save Tree
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Card - Keeping same */}
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

      {/* Stats Summary - Keeping same */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {/* ... stats cards ... */}
        {/* Reusing existing code structure heavily here for brevity in replacement block, 
             but ensuring the stats logic remains accessible via the closure */}
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
        {/* ... other cards ... */}
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

      {/* Filters - Keeping same */}
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

      {/* Trees Grid - Keeping same */}
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
