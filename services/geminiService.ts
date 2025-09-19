
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    document_type: {
      type: Type.STRING,
      description: "The inferred type of legal document (e.g., 'Non-Disclosure Agreement', 'Employment Contract')."
    },
    overall_summary: {
      type: Type.STRING,
      description: "A brief, high-level summary of the document's potential risks and overall legal standing."
    },
    key_findings: {
      type: Type.ARRAY,
      description: "A list of specific findings within the document.",
      items: {
        type: Type.OBJECT,
        properties: {
          clause: {
            type: Type.STRING,
            description: "The specific clause or section number being referenced (e.g., 'Section 7.3')."
          },
          risk_summary: {
            type: Type.STRING,
            description: "A concise summary of the identified risk or issue."
          },
          severity: {
            type: Type.STRING,
            enum: ['Compliant', 'Warning', 'Critical'],
            description: "The severity level of the finding."
          },
          recommendation: {
            type: Type.STRING,
            description: "A clear, actionable recommendation to mitigate the identified risk."
          }
        },
        required: ["clause", "risk_summary", "severity", "recommendation"]
      }
    }
  },
  required: ["document_type", "overall_summary", "key_findings"]
};


export const analyzeDocument = async (fileName: string): Promise<AnalysisResult> => {
  const prompt = `
    Act as an expert AI legal assistant. I have uploaded a document named "${fileName}".
    Based on the file name, infer the likely document type.
    Generate a HYPOTHETICAL but realistic and detailed legal analysis for this type of document.
    
    Your analysis should identify potential risks, non-standard clauses, and areas of concern.
    Provide a concise overall summary and then list at least 3-4 specific findings with varying severities (Compliant, Warning, Critical).
    For each finding, specify the clause, summarize the risk, assign a severity, and give a clear recommendation.
    
    Return the response ONLY in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonString = response.text.trim();
    const parsedResult = JSON.parse(jsonString);

    // Basic validation to ensure the parsed object matches our expected structure.
    if (!parsedResult.key_findings || !Array.isArray(parsedResult.key_findings)) {
        throw new Error("Invalid response format from AI: missing key_findings array.");
    }

    return parsedResult as AnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};
