//geminiService.ts


import { GoogleGenAI, Type } from "@google/genai";
import { Pin, User } from '../types';

// Initialize Gemini
// Note: In a real production app, this key should be handled securely on a backend.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const DUMMY_USER: User = {
  id: 'ai-generator',
  username: 'creative_ai',
  displayName: 'Creative AI',
  bio: 'Generating ideas for you.',
  avatarUrl: 'https://picsum.photos/seed/ai/100/100',
  followers: 1200,
  following: 50,
};

export const generatePinIdeas = async (query: string): Promise<Pin[]> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model,
      contents: `Generate 8 creative and visual pin ideas related to "${query}". 
      For each pin, provide a title, a short engaging description, and a 'seed' keyword for an image generator.
      The seed should be a single english word related to the visual.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              seed: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');

    return data.map((item: any, index: number) => {
      const height = Math.floor(Math.random() * (600 - 300 + 1) + 300); // Random height for masonry
      return {
        id: `gen-${Date.now()}-${index}`,
        title: item.title,
        description: item.description,
        // We use the seed to get a consistent random image from picsum
        imageUrl: `https://picsum.photos/seed/${item.seed}-${index}/400/${height}`,
        author: DUMMY_USER,
        width: 400,
        height: height,
        tags: item.tags || []
      };
    });

  } catch (error) {
    console.error("Gemini generation failed:", error);
    // Fallback mock data if API fails or key is missing
    return Array.from({ length: 6 }).map((_, i) => ({
      id: `fallback-${i}`,
      title: `Inspiration ${i + 1}`,
      description: `A wonderful idea about ${query}`,
      imageUrl: `https://picsum.photos/seed/${query}${i}/400/${400 + (i * 50)}`,
      author: DUMMY_USER,
      width: 400,
      height: 400 + (i * 50),
      tags: ['inspiration']
    }));
  }
};