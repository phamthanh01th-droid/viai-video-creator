// FIX: Add type definitions for the application.
export interface UserInput {
  topic: string;
  duration: number; // in seconds
  language: string;
  aspectRatio: '16:9' | '9:16';
}

export interface Character {
  name: string;
  description: string;
}

export interface Suggestions {
  characters: Character[];
  setting: string;
}

export interface Scene {
  scene: number;
  visual_prompt: string;
  dialogue: string;
  sound_effects: string;
}
