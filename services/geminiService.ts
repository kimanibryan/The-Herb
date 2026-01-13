
import { GoogleGenAI, Type } from "@google/genai";
import { InventoryParsedData } from "../types";

// Removed global initialization to ensure a fresh instance with the correct API key is used per call
export const parseMedicineImage = async (base64Image: string): Promise<InventoryParsedData> => {
  // Initialize GoogleGenAI inside the function as recommended
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "Extract medicine details from this packaging. Identify the medicine name, dosage (e.g., 500mg), a suggested price in USD (number only), quantity/stock visible, the expiry date, and a general category. Return as clean JSON.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          dosage: { type: Type.STRING },
          price: { type: Type.NUMBER },
          stock: { type: Type.NUMBER },
          expiryDate: { type: Type.STRING },
          category: { type: Type.STRING },
        },
        required: ["name", "dosage", "price", "stock", "expiryDate", "category"],
      },
    },
  });

  // Directly access the .text property (not a method)
  const text = response.text;
  if (!text) {
    throw new Error("The AI model returned an empty response.");
  }

  try {
    const data = JSON.parse(text.trim());
    return data as InventoryParsedData;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not parse image details.");
  }
};
