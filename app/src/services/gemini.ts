import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedRecipe, RecipeRequest } from "../types";

export const generateRecipe = async (request: RecipeRequest): Promise<GeneratedRecipe> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your .env file.");
  }

  // THIS WAS MISSING:
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Create a recipe based on these details:
    - Ingredients Available: ${request.ingredients}
    - Cuisine Style: ${request.cuisine}
    - Dietary Preferences: ${request.preferences}
    - Max Cooking Time: ${request.time} minutes
    - Cooking Method: ${request.cookingMethod === 'fireless' ? 'NO FIRE / NO HEAT / FLAMELESS' : 'Standard Cooking'}

    It is CRITICAL that if the method is fireless, the recipe requires zero heat source.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            cookingTime: { type: Type.STRING },
            calories: { type: Type.STRING },
          },
          required: ['title', 'description', 'ingredients', 'instructions', 'cookingTime']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedRecipe;
    }
    throw new Error("No response text");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
     throw new Error(error.message || "Failed to generate recipe");
  }
};
