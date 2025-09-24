import React, { useState, useEffect } from 'react';
import { Suggestions, Character } from '../types';
import { CheckIcon, BackIcon, RegenerateIcon } from './icons';

interface ReviewScreenProps {
  suggestions: Suggestions;
  onAccept: (suggestions: Suggestions) => void;
  onBack: () => void;
  onRegenerate: () => void;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ suggestions, onAccept, onBack, onRegenerate }) => {
  const [editableSuggestions, setEditableSuggestions] = useState<Suggestions>(suggestions);

  useEffect(() => {
    setEditableSuggestions(suggestions);
  }, [suggestions]);

  const handleCharacterChange = <K extends keyof Character>(index: number, field: K, value: Character[K]) => {
    const newCharacters = [...editableSuggestions.characters];
    newCharacters[index] = { ...newCharacters[index], [field]: value };
    setEditableSuggestions({ ...editableSuggestions, characters: newCharacters });
  };
  
  const handleSettingChange = (value: string) => {
    setEditableSuggestions({ ...editableSuggestions, setting: value });
  };

  const handleAccept = () => {
    onAccept(editableSuggestions);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-brand-surface rounded-xl shadow-2xl animate-slide-up">
      <h2 className="text-3xl font-bold mb-2 text-center">Review AI Suggestions</h2>
      <p className="text-brand-text-secondary mb-8 text-center">Here's a starting point for your story. Feel free to make edits or regenerate.</p>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-secondary pb-2">Characters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editableSuggestions.characters.map((char, index) => (
              <div key={index} className="bg-brand-surface-light p-4 rounded-lg space-y-3">
                 <input
                    type="text"
                    value={char.name}
                    onChange={(e) => handleCharacterChange(index, 'name', e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-brand-primary border-b border-brand-secondary focus:border-brand-primary outline-none transition"
                 />
                 <textarea
                    value={char.description}
                    onChange={(e) => handleCharacterChange(index, 'description', e.target.value)}
                    rows={4}
                    className="w-full bg-transparent text-brand-text-secondary text-sm resize-none focus:outline-none"
                 />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-brand-secondary pb-2">Setting</h3>
          <div className="bg-brand-surface-light p-4 rounded-lg">
            <textarea
              value={editableSuggestions.setting}
              onChange={(e) => handleSettingChange(e.target.value)}
              rows={3}
              className="w-full bg-transparent text-brand-text text-sm resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-75 transition-colors"
        >
          <BackIcon className="w-5 h-5"/>
          <span>Go Back</span>
        </button>
        <button
          onClick={onRegenerate}
          className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-75 transition-colors"
        >
          <RegenerateIcon className="w-5 h-5"/>
          <span>Regenerate</span>
        </button>
        <button
          onClick={handleAccept}
          className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-brand-primary text-white font-bold rounded-lg shadow-lg hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75 transition-colors"
        >
          <CheckIcon className="w-5 h-5" />
          <span>Accept & Create Storyboard</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;