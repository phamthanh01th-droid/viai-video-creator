// FIX: Implement Gemini API service functions using @google/genai.
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, Suggestions, Scene } from '../types';

// FIX: Initialize GoogleGenAI with apiKey from environment variables as per guidelines.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const suggestionsSchema = {
  type: Type.OBJECT,
  properties: {
    characters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Character's name" },
          description: { type: Type.STRING, description: "A brief description of the character" }
        },
        required: ['name', 'description']
      },
      description: "An array of characters for the story"
    },
    setting: { type: Type.STRING, description: "The setting of the story" }
  },
  required: ['characters', 'setting']
};

export const getSuggestions = async (userInput: UserInput): Promise<Suggestions> => {
  const prompt = `Based on the following topic, suggest two main characters and a setting for a short video.
Topic: "${userInput.topic}"
Language: ${userInput.language}
Provide a creative name and a brief, compelling description for each character. The setting should be evocative and set the tone for the story.
`;

  // FIX: Use ai.models.generateContent with the 'gemini-2.5-flash' model and a JSON response schema.
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: suggestionsSchema,
    }
  });

  // FIX: Correctly access the text property from the response for the JSON string.
  const jsonString = response.text.trim();
  try {
    const suggestions = JSON.parse(jsonString);
    if (!suggestions.characters || !suggestions.setting) {
        throw new Error("Invalid suggestions format from API");
    }
    return suggestions;
  } catch (error) {
    console.error("Failed to parse suggestions JSON:", error, "Raw response:", jsonString);
    throw new Error("Could not parse AI suggestions.");
  }
};


const storyboardSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            scene: { type: Type.INTEGER, description: "The scene number, starting from 1." },
            visual_prompt: { type: Type.STRING, description: "A concise, vivid description of the visuals for an AI video generator. Focus on action, composition, and mood." },
            dialogue: { type: Type.STRING, description: "Any dialogue spoken by the characters. If none, write 'None'." },
            sound_effects: { type: Type.STRING, description: "A brief description of key sound effects. If none, write 'None'." }
        },
        required: ['scene', 'visual_prompt', 'dialogue', 'sound_effects']
    },
    description: "An array of scenes that form the storyboard."
};

export const getStoryboard = async (userInput: UserInput, suggestions: Suggestions): Promise<Scene[]> => {
    const numberOfScenes = Math.max(2, Math.ceil(userInput.duration / 10)); // Ensure at least 2 scenes
    const prompt = `Create a detailed storyboard with exactly ${numberOfScenes} scenes for a ${userInput.duration}-second video.
Topic: "${userInput.topic}"
Language: ${userInput.language}
Characters: ${suggestions.characters.map(c => `${c.name}: ${c.description}`).join('; ')}
Setting: ${suggestions.setting}

For each scene, provide:
1. 'scene': The scene number (starting from 1).
2. 'visual_prompt': A concise, vivid description of the visuals for an AI video generator. Focus on action, composition, and mood.
3. 'dialogue': Any dialogue spoken by the characters. If none, write "None".
4. 'sound_effects': A brief description of key sound effects. If none, write "None".

The story should have a clear beginning, middle, and end, and conclude within the ${numberOfScenes} scenes.
`;

    // FIX: Use ai.models.generateContent with the 'gemini-2.5-flash' model and a JSON response schema.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: storyboardSchema,
        }
    });

    // FIX: Correctly access the text property from the response for the JSON string.
    const jsonString = response.text.trim();
    try {
        const storyboard = JSON.parse(jsonString);
        if (!Array.isArray(storyboard)) {
            throw new Error("Invalid storyboard format from API");
        }
        return storyboard;
    } catch (error) {
        console.error("Failed to parse storyboard JSON:", error, "Raw response:", jsonString);
        throw new Error("Could not parse AI storyboard.");
    }
};
