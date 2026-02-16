// =============================================================================
// ROOTSENSE - Centralized Mock Data
// =============================================================================
// This file contains all mock data used throughout the application.
// When integrating with Firebase, replace these constants with Firestore queries.
// =============================================================================

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export interface Tree {
  id: string
  location: string
  health: "Healthy" | "Moderate" | "Critical"
  lastUpdated: string
  species: string
  age: string
  uploadedBy: string
  greenCoverage?: number
  leafDensity?: number
  waterNeeds?: "Low" | "Medium" | "High"
}

export interface CivicIssue {
  id: number
  type: string
  description: string
  location: string
  status: "Open" | "In Progress" | "Resolved"
  priority: "Low" | "Medium" | "High"
  reportedAt: string
  reportedBy: string
}

export interface ResolvedIssueImpact {
  id: number
  type: string
  description: string
  waterSaved: number
  co2Reduced: number
  energySaved?: number
  wasteRecycled?: number
  resolvedDate: string
}

export interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  trees: number
  issues: number
  waterSaved: string
  volunteers: number
}

export interface ActivityItem {
  id: number
  type: "tree" | "issue"
  title: string
  location: string
  time: string
  status: string
}

// -----------------------------------------------------------------------------
// TREES DATA
// -----------------------------------------------------------------------------
// FIREBASE: Replace with Firestore collection "trees"
// const treesRef = collection(db, "trees")
// const treesSnapshot = await getDocs(query(treesRef, orderBy("lastUpdated", "desc")))
// -----------------------------------------------------------------------------

export const TREES_DATA: Tree[] = [
  { id: "T-1247", location: "Block A, Engineering Building", health: "Healthy", lastUpdated: "2026-01-30", species: "Neem", age: "12 years", uploadedBy: "Priya Sharma" },
  { id: "T-1246", location: "Library Lawn - North Side", health: "Moderate", lastUpdated: "2026-01-29", species: "Banyan", age: "45 years", uploadedBy: "Rahul Verma" },
  { id: "T-1245", location: "Sports Complex Entrance", health: "Healthy", lastUpdated: "2026-01-29", species: "Mango", age: "8 years", uploadedBy: "Anita Desai" },
  { id: "T-1244", location: "Central Garden - Fountain Area", health: "Critical", lastUpdated: "2026-01-28", species: "Gulmohar", age: "15 years", uploadedBy: "Vikram Singh" },
  { id: "T-1243", location: "Hostel A Main Entrance", health: "Healthy", lastUpdated: "2026-01-28", species: "Ashoka", age: "6 years", uploadedBy: "Meera Patel" },
  { id: "T-1242", location: "Admin Block - West Garden", health: "Moderate", lastUpdated: "2026-01-27", species: "Peepal", age: "52 years", uploadedBy: "Suresh Kumar" },
  { id: "T-1241", location: "Canteen Outdoor Seating", health: "Healthy", lastUpdated: "2026-01-27", species: "Coconut", age: "18 years", uploadedBy: "Neha Gupta" },
  { id: "T-1240", location: "Parking Lot B - East Corner", health: "Critical", lastUpdated: "2026-01-26", species: "Tamarind", age: "22 years", uploadedBy: "Arjun Reddy" },
  { id: "T-1239", location: "Science Block Courtyard", health: "Healthy", lastUpdated: "2026-01-26", species: "Neem", age: "10 years", uploadedBy: "Kavita Iyer" },
  { id: "T-1238", location: "Arts Building - Main Gate", health: "Healthy", lastUpdated: "2026-01-25", species: "Mango", age: "14 years", uploadedBy: "Amit Joshi" },
  { id: "T-1237", location: "Hostel B - Rear Garden", health: "Moderate", lastUpdated: "2026-01-25", species: "Jamun", age: "9 years", uploadedBy: "Divya Nair" },
  { id: "T-1236", location: "Computer Lab Building", health: "Healthy", lastUpdated: "2026-01-24", species: "Teak", age: "7 years", uploadedBy: "Rohan Mehta" },
  { id: "T-1235", location: "Auditorium Lawn", health: "Healthy", lastUpdated: "2026-01-24", species: "Flame of Forest", age: "11 years", uploadedBy: "Sneha Rao" },
  { id: "T-1234", location: "Faculty Quarters - Block C", health: "Critical", lastUpdated: "2026-01-23", species: "Rain Tree", age: "35 years", uploadedBy: "Dr. Ramesh" },
  { id: "T-1233", location: "Main Gate Avenue", health: "Healthy", lastUpdated: "2026-01-23", species: "Mahogany", age: "20 years", uploadedBy: "Security Staff" },
  { id: "T-1232", location: "Gym Building Side", health: "Moderate", lastUpdated: "2026-01-22", species: "Jackfruit", age: "16 years", uploadedBy: "Fitness Club" },
  { id: "T-1231", location: "Research Center Garden", health: "Healthy", lastUpdated: "2026-01-22", species: "Sandalwood", age: "5 years", uploadedBy: "Dr. Lakshmi" },
  { id: "T-1230", location: "Cafeteria Backside", health: "Healthy", lastUpdated: "2026-01-21", species: "Curry Leaf", age: "3 years", uploadedBy: "Canteen Staff" },
  { id: "T-1229", location: "Workshop Building", health: "Critical", lastUpdated: "2026-01-21", species: "Bamboo Grove", age: "8 years", uploadedBy: "Workshop Head" },
  { id: "T-1228", location: "Botanical Garden - Section A", health: "Healthy", lastUpdated: "2026-01-20", species: "Ficus", age: "25 years", uploadedBy: "Botany Dept" },
]

// -----------------------------------------------------------------------------
// CIVIC ISSUES DATA
// -----------------------------------------------------------------------------
// FIREBASE: Replace with Firestore collection "issues"
// const issuesRef = collection(db, "issues")
// const issuesSnapshot = await getDocs(query(issuesRef, orderBy("reportedAt", "desc")))
// -----------------------------------------------------------------------------

export const ISSUES_DATA: CivicIssue[] = [
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

// -----------------------------------------------------------------------------
// RESOLVED ISSUES IMPACT DATA
// -----------------------------------------------------------------------------
// FIREBASE: Replace with Firestore query filtering resolved issues
// const resolvedRef = query(collection(db, "issues"), where("status", "==", "Resolved"))
// -----------------------------------------------------------------------------

export const RESOLVED_ISSUES_IMPACT: ResolvedIssueImpact[] = [
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

// -----------------------------------------------------------------------------
// LEADERBOARD DATA
// -----------------------------------------------------------------------------
// FIREBASE: Replace with Firestore collection "departments" with aggregated scores
// const leaderboardRef = query(collection(db, "departments"), orderBy("score", "desc"), limit(12))
// -----------------------------------------------------------------------------

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
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

// -----------------------------------------------------------------------------
// RECENT ACTIVITY DATA
// -----------------------------------------------------------------------------
// FIREBASE: Replace with Firestore query combining trees and issues, ordered by timestamp
// const activityRef = query(collection(db, "activity"), orderBy("timestamp", "desc"), limit(8))
// -----------------------------------------------------------------------------

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: 1, type: "tree", title: "Banyan tree uploaded by Priya Sharma", location: "Block A, Engineering Building", time: "2 min ago", status: "Healthy" },
  { id: 2, type: "issue", title: "Broken irrigation pipe reported", location: "Central Garden", time: "15 min ago", status: "Open" },
  { id: 3, type: "tree", title: "Neem tree health updated", location: "Library Lawn", time: "1 hour ago", status: "Moderate" },
  { id: 4, type: "issue", title: "Overflowing dustbin cleared", location: "Hostel B Entrance", time: "2 hours ago", status: "Resolved" },
  { id: 5, type: "tree", title: "Gulmohar added by Rahul Verma", location: "Sports Complex", time: "3 hours ago", status: "Healthy" },
  { id: 6, type: "issue", title: "Clogged drain needs attention", location: "Canteen Backside", time: "4 hours ago", status: "In Progress" },
  { id: 7, type: "tree", title: "Peepal tree critical alert", location: "Admin Block Garden", time: "5 hours ago", status: "Critical" },
  { id: 8, type: "issue", title: "Street light fixed", location: "Parking Lot C", time: "6 hours ago", status: "Resolved" },
]

// -----------------------------------------------------------------------------
// CHART DATA
// -----------------------------------------------------------------------------
// FIREBASE: Replace with aggregated data from Firestore
// These would typically be computed from time-series data in the database
// -----------------------------------------------------------------------------

export const TREE_HEALTH_CHART_DATA = [
  { month: "Aug", healthy: 142, moderate: 28, critical: 8 },
  { month: "Sep", healthy: 156, moderate: 32, critical: 10 },
  { month: "Oct", healthy: 168, moderate: 35, critical: 12 },
  { month: "Nov", healthy: 175, moderate: 38, critical: 9 },
  { month: "Dec", healthy: 182, moderate: 42, critical: 11 },
  { month: "Jan", healthy: 189, moderate: 45, critical: 13 },
]

export const WEEKLY_ACTIVITY_CHART_DATA = [
  { day: "Mon", trees: 12, issues: 8 },
  { day: "Tue", trees: 18, issues: 12 },
  { day: "Wed", trees: 15, issues: 6 },
  { day: "Thu", trees: 22, issues: 14 },
  { day: "Fri", trees: 28, issues: 18 },
  { day: "Sat", trees: 8, issues: 4 },
  { day: "Sun", trees: 5, issues: 2 },
]

// -----------------------------------------------------------------------------
// DASHBOARD STATS
// -----------------------------------------------------------------------------
// FIREBASE: Replace with real-time aggregation queries
// const treesCount = await getCountFromServer(collection(db, "trees"))
// -----------------------------------------------------------------------------

export const DASHBOARD_STATS = {
  treesMonitored: 1247,
  treesChange: "+12%",
  civicIssues: 89,
  issuesChange: "-8%",
  waterSaved: "12,450",
  waterChange: "+23%",
  greenScore: 87,
  scoreChange: "+5",
}

// -----------------------------------------------------------------------------
// IMPACT PAGE STATS
// -----------------------------------------------------------------------------

export const IMPACT_STATS = {
  treeSurvivalRate: 94.2,
  treeSurvivalTarget: 95,
  waterSavedTotal: "45,280",
  waterSavedMonthly: "12,450",
  issuesResolvedTotal: 156,
  issuesResolvedThisMonth: 28,
  greenScoreOverall: 87,
  greenScoreTarget: 90,
}

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------

export const ISSUE_TYPES = [
  "Irrigation",
  "Water",
  "Waste",
  "Tree Care",
  "Pollution",
  "Lighting",
  "Vegetation",
  "Drainage",
] as const

export const PRIORITY_LEVELS = ["Low", "Medium", "High"] as const

export const HEALTH_STATUSES = ["Healthy", "Moderate", "Critical"] as const

export const ISSUE_STATUSES = ["Open", "In Progress", "Resolved"] as const

// -----------------------------------------------------------------------------
// AI ANALYSIS KEYWORDS (for mock AI simulation)
// -----------------------------------------------------------------------------

export const AI_CATEGORY_KEYWORDS: Record<string, string[]> = {
  Water: ["water", "leak", "tap", "pipe", "flood", "overflow", "cooler"],
  Irrigation: ["irrigation", "sprinkler", "drip", "watering"],
  "Tree Care": ["tree", "branch", "leaf", "root", "trunk", "bark"],
  Waste: ["garbage", "waste", "trash", "bin", "dump", "litter", "e-waste"],
  Pollution: ["smoke", "dust", "pollution", "air quality", "burning"],
  Lighting: ["light", "lamp", "solar", "bulb", "street light"],
  Vegetation: ["grass", "weed", "plant", "shrub", "garden", "lawn"],
  Drainage: ["drain", "clog", "stagnant", "rainwater", "sewer"],
}

export const AI_URGENCY_KEYWORDS = {
  high: ["urgent", "emergency", "critical", "dangerous", "hazard", "safety", "broken", "severe", "flooding"],
  medium: ["needs", "should", "required", "attention", "maintenance"],
  low: ["minor", "small", "could", "eventually", "when possible"],
}

export const TREE_SPECIES_LIST = [
  "Neem", "Banyan", "Peepal", "Mango", "Gulmohar", "Ashoka", "Tamarind",
  "Coconut", "Jamun", "Teak", "Mahogany", "Jackfruit", "Sandalwood", "Ficus",
]
