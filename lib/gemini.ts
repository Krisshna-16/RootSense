import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export interface TreeAnalysis {
    healthStatus: "Healthy" | "Moderate" | "Critical";
    greenCoverage: number;
    leafDensity: number;
    waterNeeds: "Low" | "Medium" | "High";
    recommendation: string;
    detectedSpecies: string;
    confidence: number;
    isMock?: boolean;
}

const MAX_RETRIES = 2; // Reduced from 5
const INITIAL_BACKOFF = 1000; // Reduced from 5000ms

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithBackoff<T>(fn: () => Promise<T>, retries = MAX_RETRIES, backoff = INITIAL_BACKOFF): Promise<T> {
    try {
        return await fn();
    } catch (error: any) {
        console.warn(`AI Request Failed: ${error.message} (Status: ${error.status})`);

        // Check for 429 (Rate Limit) or 503 (Service Unavailable)
        if (retries > 0 && (error.status === 429 || error.message?.includes("429") || error.status === 503)) {
            console.warn(`Retrying in ${backoff}ms... (${retries} retries left)`);
            await delay(backoff);
            return retryWithBackoff(fn, retries - 1, backoff * 1.5);
        }
        throw error;
    }
}

export async function analyzeTreeImage(imageFile: File): Promise<TreeAnalysis> {
    try {
        // Convert image to base64
        const base64Image = await fileToBase64(imageFile);

        // Initialize Gemini model with vision
        // Using gemini-1.5-pro which supports vision and is available in current API
        const modelName = "gemini-1.5-pro";
        console.log("Initializing Gemini model:", modelName);
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = `Analyze this tree image and provide a detailed assessment. Return your response in the following JSON format:

{
  "species": "exact tree species name (e.g., Mango, Neem, Banyan, etc.)",
  "healthStatus": "Healthy" or "Moderate" or "Critical",
  "greenCoverage": number between 0-100 representing percentage of green foliage,
  "leafDensity": number between 0-100 representing how dense the leaves are,
  "waterNeeds": "Low" or "Medium" or "High" based on tree condition,
  "recommendation": "specific actionable recommendation for this tree",
  "confidence": number between 0-100 representing your confidence in the species identification
}

Be specific and accurate. If you cannot identify the exact species, provide the closest match and lower the confidence score accordingly.`;

        // Wrap the generation call with retry logic
        const result = await retryWithBackoff(() => model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: imageFile.type,
                },
            },
        ]));

        const response = await result.response;
        const text = response.text();

        // ... rest of the parsing logic ...

        // Parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Failed to parse AI response");
        }

        const analysis = JSON.parse(jsonMatch[0]);

        return {
            healthStatus: analysis.healthStatus,
            greenCoverage: analysis.greenCoverage,
            leafDensity: analysis.leafDensity,
            waterNeeds: analysis.waterNeeds,
            recommendation: analysis.recommendation,
            detectedSpecies: analysis.species,
            confidence: analysis.confidence,
            isMock: false, // Not a mock analysis
        };
    } catch (error: any) {
        // Handle 404 errors (model not found) - fall back to simulation
        if (error.status === 404 || error.message?.includes("404") || error.message?.includes("not found")) {
            console.warn("Gemini model not available (404). Switching to SIMULATED analysis for demo purposes.");
            return getMockAnalysis();
        }

        // Suppress console.error for rate limits to avoid Next.js overlay
        if (error.status === 429 || error.message?.includes("429")) {
            console.warn("Rate limit hit. Switching to SIMULATED analysis for demo purposes.");
            return getMockAnalysis();
        }

        console.error("Error analyzing tree image:", error);

        const errorMessage = error?.message || "Unknown error";
        const errorDetails = error?.toString() || "";
        throw new Error(`AI Analysis Failed: ${errorMessage}. ${errorDetails}`);
    }
}

// Fallback function for demo purposes when API is busy
function getMockAnalysis(): TreeAnalysis {
    const speciesList = ["Mango (Mangifera indica)", "Neem (Azadirachta indica)", "Banyan (Ficus benghalensis)", "Peepal (Ficus religiosa)", "Gulmohar (Delonix regia)"];
    const healthOptions: ("Healthy" | "Moderate" | "Critical")[] = ["Healthy", "Moderate", "Healthy"]; // Bias towards healthy

    // Pick random values to simulate AI
    const species = speciesList[Math.floor(Math.random() * speciesList.length)];
    const health = healthOptions[Math.floor(Math.random() * healthOptions.length)];
    const greenCoverage = Math.floor(Math.random() * (100 - 60) + 60); // 60-100%
    const leafDensity = Math.floor(Math.random() * (100 - 50) + 50); // 50-100%

    return {
        healthStatus: health,
        greenCoverage: greenCoverage,
        leafDensity: leafDensity,
        waterNeeds: health === "Critical" ? "High" : "Medium",
        recommendation: `[SIMULATION] This appears to be a ${species}. Ensure regular watering and check for pests. (Generated because AI rate limit was hit)`,
        detectedSpecies: species,
        confidence: 0.95, // High confidence for mock
        isMock: true
    };
}

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64Data = base64String.split(",")[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
