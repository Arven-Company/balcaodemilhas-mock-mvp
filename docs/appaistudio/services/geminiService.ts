
import { GoogleGenAI } from "@google/genai";
import { FlightDeal, GroundingSource } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Gemini API calls will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const fetchFlightDealsWithGrounding = async (): Promise<{ deals: FlightDeal[], sources: GroundingSource[] }> => {
  if (!API_KEY) {
    return { deals: [], sources: [] };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Find recent flight deals that can be purchased with airline miles, originating from São Paulo (GRU, CGH) or Rio de Janeiro (GIG, SDU) to popular international destinations like Rome, Frankfurt, or other major European cities. 
        For each deal, provide the following information in a structured list format, with each item on a new line and properties separated by a pipe character (|):
        ORIGIN | DESTINATION | AIRLINE | MILES_REQUIRED
        
        Example: São Paulo | Rome | ITA Airways | 120000
        
        Prioritize deals for travel in the next 3-6 months. Find at least 3 different deals.
      `,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const deals: FlightDeal[] = [];
    const text = response.text;
    
    const lines = text.split('\n').filter(line => line.trim() !== '' && line.includes('|'));
    lines.forEach((line, index) => {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 4) {
        const [from, to, airline, milesStr] = parts;
        const priceMiles = parseInt(milesStr.replace(/\D/g, ''), 10);
        if (!isNaN(priceMiles)) {
          deals.push({
            id: `gemini-${index}-${Date.now()}`,
            from,
            to,
            airline,
            priceMiles,
            duration: 'Voo direto',
            airlineLogoUrl: `https://logo.clearbit.com/${airline.toLowerCase().replace(/\s/g, '').replace('airways', '')}.com`,
            imageUrl: `https://picsum.photos/seed/${to.toLowerCase()}/400/200`,
          });
        }
      }
    });

    const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = rawSources
      .map((s: any) => s.web)
      .filter((s: any) => s && s.uri && s.title)
      .map((s: any) => ({ uri: s.uri, title: s.title }));

    return { deals, sources };

  } catch (error) {
    console.error("Error fetching flight deals from Gemini:", error);
    return { deals: [], sources: [] }; 
  }
};
