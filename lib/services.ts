// =============================================================================
// ROOTSENSE - Mock Services Layer
// =============================================================================
// This file contains service functions that simulate backend operations.
// When integrating with Firebase, replace the mock implementations with real
// Firestore/Firebase calls while keeping the same function signatures.
// =============================================================================

import {
  type Tree,
  type CivicIssue,
  type ResolvedIssueImpact,
  TREES_DATA,
  ISSUES_DATA,
  RESOLVED_ISSUES_IMPACT,
  AI_CATEGORY_KEYWORDS,
  AI_URGENCY_KEYWORDS,
  TREE_SPECIES_LIST,
} from "./mock-data"

// -----------------------------------------------------------------------------
// TREE SERVICES
// -----------------------------------------------------------------------------

/**
 * Fetches all trees from the database
 * FIREBASE: Replace with Firestore query
 * 
 * @example Firebase implementation:
 * ```ts
 * import { collection, getDocs, query, orderBy } from "firebase/firestore"
 * import { db } from "./firebase"
 * 
 * export async function getTrees(): Promise<Tree[]> {
 *   const treesRef = collection(db, "trees")
 *   const q = query(treesRef, orderBy("lastUpdated", "desc"))
 *   const snapshot = await getDocs(q)
 *   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tree))
 * }
 * ```
 */
export async function getTrees(): Promise<Tree[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return TREES_DATA
}

/**
 * Adds a new tree to the database
 * FIREBASE: Replace with Firestore addDoc
 * 
 * @example Firebase implementation:
 * ```ts
 * import { collection, addDoc, serverTimestamp } from "firebase/firestore"
 * 
 * export async function addTree(tree: Omit<Tree, "id">): Promise<string> {
 *   const treesRef = collection(db, "trees")
 *   const docRef = await addDoc(treesRef, {
 *     ...tree,
 *     createdAt: serverTimestamp(),
 *     lastUpdated: serverTimestamp(),
 *   })
 *   return docRef.id
 * }
 * ```
 */
export async function addTree(tree: Omit<Tree, "id">): Promise<Tree> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newId = `T-${1248 + Math.floor(Math.random() * 100)}`
  return { ...tree, id: newId }
}

/**
 * Updates a tree's health status
 * FIREBASE: Replace with Firestore updateDoc
 * 
 * @example Firebase implementation:
 * ```ts
 * import { doc, updateDoc, serverTimestamp } from "firebase/firestore"
 * 
 * export async function updateTreeHealth(treeId: string, health: Tree["health"]): Promise<void> {
 *   const treeRef = doc(db, "trees", treeId)
 *   await updateDoc(treeRef, {
 *     health,
 *     lastUpdated: serverTimestamp(),
 *   })
 * }
 * ```
 */
export async function updateTreeHealth(treeId: string, health: Tree["health"]): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  // In real implementation, this would update Firestore
  console.log(`[Mock] Updated tree ${treeId} health to ${health}`)
}

// -----------------------------------------------------------------------------
// ISSUE SERVICES
// -----------------------------------------------------------------------------

/**
 * Fetches all civic issues from the database
 * FIREBASE: Replace with Firestore query
 * 
 * @example Firebase implementation:
 * ```ts
 * export async function getIssues(): Promise<CivicIssue[]> {
 *   const issuesRef = collection(db, "issues")
 *   const q = query(issuesRef, orderBy("reportedAt", "desc"))
 *   const snapshot = await getDocs(q)
 *   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CivicIssue))
 * }
 * ```
 */
export async function getIssues(): Promise<CivicIssue[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return ISSUES_DATA
}

/**
 * Submits a new civic issue
 * FIREBASE: Replace with Firestore addDoc
 * 
 * @example Firebase implementation:
 * ```ts
 * export async function submitIssue(issue: Omit<CivicIssue, "id">): Promise<number> {
 *   const issuesRef = collection(db, "issues")
 *   const docRef = await addDoc(issuesRef, {
 *     ...issue,
 *     status: "Open",
 *     createdAt: serverTimestamp(),
 *   })
 *   return parseInt(docRef.id)
 * }
 * ```
 */
export async function submitIssue(issue: Omit<CivicIssue, "id" | "status">): Promise<CivicIssue> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newId = Math.max(...ISSUES_DATA.map((i) => i.id)) + 1
  return { ...issue, id: newId, status: "Open" }
}

/**
 * Updates an issue's status
 * FIREBASE: Replace with Firestore updateDoc
 * 
 * @example Firebase implementation:
 * ```ts
 * export async function updateIssueStatus(issueId: number, status: CivicIssue["status"]): Promise<void> {
 *   const issueRef = doc(db, "issues", String(issueId))
 *   await updateDoc(issueRef, { status, updatedAt: serverTimestamp() })
 * }
 * ```
 */
export async function updateIssueStatus(issueId: number, status: CivicIssue["status"]): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  console.log(`[Mock] Updated issue ${issueId} status to ${status}`)
}

// -----------------------------------------------------------------------------
// IMPACT SERVICES
// -----------------------------------------------------------------------------

/**
 * Fetches resolved issues with their environmental impact
 * FIREBASE: Replace with Firestore query with where clause
 * 
 * @example Firebase implementation:
 * ```ts
 * export async function getResolvedIssuesImpact(): Promise<ResolvedIssueImpact[]> {
 *   const issuesRef = collection(db, "issues")
 *   const q = query(issuesRef, where("status", "==", "Resolved"))
 *   const snapshot = await getDocs(q)
 *   return snapshot.docs.map(doc => computeImpact(doc.data()))
 * }
 * ```
 */
export async function getResolvedIssuesImpact(): Promise<ResolvedIssueImpact[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return RESOLVED_ISSUES_IMPACT
}

/**
 * Calculates total impact from resolved issues
 * FIREBASE: Could be a Cloud Function for real-time aggregation
 * 
 * @example Firebase implementation:
 * ```ts
 * // Use Cloud Functions to maintain aggregated stats
 * // Or compute client-side from fetched data
 * export async function calculateImpactTotals() {
 *   const resolvedIssues = await getResolvedIssuesImpact()
 *   return {
 *     waterSaved: resolvedIssues.reduce((sum, i) => sum + (i.waterSaved || 0), 0),
 *     co2Reduced: resolvedIssues.reduce((sum, i) => sum + (i.co2Reduced || 0), 0),
 *     // ... other aggregations
 *   }
 * }
 * ```
 */
export function calculateImpactTotals(issues: ResolvedIssueImpact[]) {
  return {
    waterSaved: issues.reduce((sum, issue) => sum + (issue.waterSaved || 0), 0),
    co2Reduced: issues.reduce((sum, issue) => sum + (issue.co2Reduced || 0), 0),
    energySaved: issues.reduce((sum, issue) => sum + (issue.energySaved || 0), 0),
    wasteRecycled: issues.reduce((sum, issue) => sum + (issue.wasteRecycled || 0), 0),
    issuesResolved: issues.length,
  }
}

// -----------------------------------------------------------------------------
// AI ANALYSIS SERVICES (Mock Simulation)
// -----------------------------------------------------------------------------
// FIREBASE: These could be Cloud Functions calling real ML models
// For production, consider using Firebase ML or external AI APIs
// -----------------------------------------------------------------------------

export interface TreeAnalysisResult {
  health: Tree["health"]
  confidence: number
  greenCoverage: number
  leafDensity: number
  waterNeeds: "Low" | "Medium" | "High"
  detectedSpecies: string
  recommendation: string
}

/**
 * Simulates AI analysis of a tree photo
 * FIREBASE: Replace with Cloud Function calling ML model
 * 
 * @example Firebase implementation:
 * ```ts
 * import { httpsCallable } from "firebase/functions"
 * 
 * export async function analyzeTreePhoto(imageUrl: string): Promise<TreeAnalysisResult> {
 *   const analyzeTree = httpsCallable(functions, "analyzeTreePhoto")
 *   const result = await analyzeTree({ imageUrl })
 *   return result.data as TreeAnalysisResult
 * }
 * ```
 */
export async function analyzeTreePhoto(_imageFile: File): Promise<TreeAnalysisResult> {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000))

  // Generate realistic mock results
  const healthOptions: Tree["health"][] = ["Healthy", "Healthy", "Healthy", "Moderate", "Moderate", "Critical"]
  const health = healthOptions[Math.floor(Math.random() * healthOptions.length)]

  const greenCoverage = Math.floor(60 + Math.random() * 35)
  const leafDensity = Math.floor(55 + Math.random() * 40)
  const confidence = Math.floor(88 + Math.random() * 10)

  const waterNeedsOptions: ("Low" | "Medium" | "High")[] =
    health === "Critical" ? ["High", "High", "Medium"] : health === "Moderate" ? ["Medium", "Medium", "Low"] : ["Low", "Low", "Medium"]
  const waterNeeds = waterNeedsOptions[Math.floor(Math.random() * waterNeedsOptions.length)]

  const detectedSpecies = TREE_SPECIES_LIST[Math.floor(Math.random() * TREE_SPECIES_LIST.length)]

  const recommendations: Record<Tree["health"], string[]> = {
    Healthy: [
      "Tree is thriving. Continue regular monitoring.",
      "Excellent health indicators. Maintain current care routine.",
      "Strong vitality detected. No immediate action needed.",
    ],
    Moderate: [
      "Some stress indicators detected. Consider increasing watering frequency.",
      "Minor health concerns. Recommend soil nutrient testing.",
      "Moderate stress observed. Check for pest activity.",
    ],
    Critical: [
      "Urgent attention needed. Consult an arborist immediately.",
      "Critical health status. Check for root damage or disease.",
      "Severe stress detected. Immediate intervention recommended.",
    ],
  }

  const recommendation = recommendations[health][Math.floor(Math.random() * recommendations[health].length)]

  return {
    health,
    confidence,
    greenCoverage,
    leafDensity,
    waterNeeds,
    detectedSpecies,
    recommendation,
  }
}

export interface IssueAnalysisResult {
  suggestedCategory: string
  suggestedPriority: CivicIssue["priority"]
  confidence: number
  recommendation: string
}

/**
 * Simulates AI analysis of issue description
 * FIREBASE: Replace with Cloud Function calling NLP model
 * 
 * @example Firebase implementation:
 * ```ts
 * export async function analyzeIssueDescription(description: string): Promise<IssueAnalysisResult> {
 *   const analyzeIssue = httpsCallable(functions, "analyzeIssueDescription")
 *   const result = await analyzeIssue({ description })
 *   return result.data as IssueAnalysisResult
 * }
 * ```
 */
export async function analyzeIssueDescription(description: string): Promise<IssueAnalysisResult> {
  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400))

  const lowerDesc = description.toLowerCase()

  // Detect category based on keywords
  let suggestedCategory = "Vegetation" // default
  let maxMatches = 0

  for (const [category, keywords] of Object.entries(AI_CATEGORY_KEYWORDS)) {
    const matches = keywords.filter((keyword) => lowerDesc.includes(keyword)).length
    if (matches > maxMatches) {
      maxMatches = matches
      suggestedCategory = category
    }
  }

  // Detect priority based on urgency keywords
  let suggestedPriority: CivicIssue["priority"] = "Medium"
  for (const keyword of AI_URGENCY_KEYWORDS.high) {
    if (lowerDesc.includes(keyword)) {
      suggestedPriority = "High"
      break
    }
  }
  if (suggestedPriority === "Medium") {
    for (const keyword of AI_URGENCY_KEYWORDS.low) {
      if (lowerDesc.includes(keyword)) {
        suggestedPriority = "Low"
        break
      }
    }
  }

  const confidence = Math.floor(78 + Math.random() * 18)

  const recommendations: Record<string, string> = {
    Water: "Route to plumbing maintenance team for immediate assessment.",
    Irrigation: "Alert grounds maintenance for sprinkler system check.",
    "Tree Care": "Schedule arborist consultation for tree health assessment.",
    Waste: "Notify sanitation department for proper disposal.",
    Pollution: "Report to environmental committee for air quality monitoring.",
    Lighting: "Forward to electrical maintenance for safety inspection.",
    Vegetation: "Assign to landscaping team for garden maintenance.",
    Drainage: "Priority alert to civil maintenance for flood prevention.",
  }

  return {
    suggestedCategory,
    suggestedPriority,
    confidence,
    recommendation: recommendations[suggestedCategory] || "Route to general maintenance team.",
  }
}

// -----------------------------------------------------------------------------
// STATISTICS HELPERS
// -----------------------------------------------------------------------------

/**
 * Calculates tree statistics from tree data
 */
export function calculateTreeStats(trees: Tree[]) {
  return {
    total: trees.length,
    healthy: trees.filter((t) => t.health === "Healthy").length,
    moderate: trees.filter((t) => t.health === "Moderate").length,
    critical: trees.filter((t) => t.health === "Critical").length,
  }
}

/**
 * Calculates issue statistics from issue data
 */
export function calculateIssueStats(issues: CivicIssue[]) {
  return {
    total: issues.length,
    open: issues.filter((i) => i.status === "Open" || i.status === "In Progress").length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
    highPriority: issues.filter((i) => i.priority === "High" && i.status !== "Resolved").length,
  }
}
