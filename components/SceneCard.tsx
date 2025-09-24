// FIX: Implement the SceneCard component to display scene information.
import React, { useState } from 'react';
import { Scene, UserInput, Suggestions } from '../types';
import { JsonIcon, QuoteIcon, SoundIcon, ImageIcon } from './icons';
import JsonPromptPopup from './JsonPromptPopup';

interface SceneCardProps {
  scene: Scene;
  userInput: UserInput;
  suggestions: Suggestions;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, userInput, suggestions }) => {
  const [showJsonPopup, setShowJsonPopup] = useState(false);

  const generateVeoPrompt = () => {
    const promptDetails = {
      prompt: scene.visual_prompt,
      style_reference: `A cinematic ${userInput.aspectRatio} video about "${userInput.topic}" with characters ${suggestions.characters.map(c => c.name).join(' and ')}, set in ${suggestions.setting}.`,
      dialogue: scene.dialogue,
      sound_effects: scene.sound_effects
    };
    return JSON.stringify(promptDetails, null, 2);
  };
  
  const veoPromptJson = generateVeoPrompt();

  return (
    <>
      <div className="bg-brand-surface-light rounded-lg shadow-lg p-5 flex flex-col justify-between h-full animate-fade-in-up">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-brand-primary">Scene {scene.scene}</h3>
            <button
              onClick={() => setShowJsonPopup(true)}
              className="flex items-center gap-2 text-xs px-3 py-1 bg-brand-secondary text-white font-semibold rounded-md hover:bg-opacity-80 transition-colors"
              title="View VEO JSON Prompt"
            >
              <JsonIcon className="w-4 h-4" />
              <span>VEO Prompt</span>
            </button>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <ImageIcon className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-brand-text">Visuals</h4>
                <p className="text-brand-text-secondary">{scene.visual_prompt}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <QuoteIcon className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-brand-text">Dialogue</h4>
                <p className="text-brand-text-secondary italic">{scene.dialogue === "None" ? <span className="opacity-70">No dialogue</span> : scene.dialogue}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <SoundIcon className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-brand-text">Sound</h4>
                <p className="text-brand-text-secondary">{scene.sound_effects === "None" ? <span className="opacity-70">No sound effects</span> : scene.sound_effects}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showJsonPopup && (
        <JsonPromptPopup jsonString={veoPromptJson} onClose={() => setShowJsonPopup(false)} />
      )}
    </>
  );
};

export default SceneCard;
