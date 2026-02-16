const apiKey = "AIzaSyDxCq_a4wSOwYBkZACyMfunhtTZk8MM9X4";

async function main() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Available models:");

        if (data.models) {
            data.models.forEach(model => {
                if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${model.name}`);
                }
            });
        } else {
            console.log("No models found or invalid response structure:", JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Error fetching models:", error);
    }
}

main();
