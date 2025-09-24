import React from 'react';
import { Scene, UserInput, Suggestions } from '../types';
import SceneCard from './SceneCard';
import { BackIcon } from './icons';

interface StoryboardProps {
  scenes: Scene[];
  onBack: () => void;
  userInput: UserInput;
  suggestions: Suggestions;
}

const Storyboard: React.FC<StoryboardProps> = ({ scenes, onBack, userInput, suggestions }) => {
  if (scenes.length === 0) {
    return (
      <div className="text-center text-brand-text-secondary">
        <p>No scenes found. Something went wrong.</p>
        <button
          onClick={onBack}
          className="mt-4 flex items-center mx-auto gap-2 px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75 transition-colors"
        >
          <BackIcon className="w-5 h-5" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Director's Storyboard</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-brand-secondary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-75 transition-colors"
        >
          <BackIcon className="w-5 h-5" />
          Back to Review
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenes.map((scene) => (
          <SceneCard key={scene.scene} scene={scene} userInput={userInput} suggestions={suggestions} />
        ))}
      </div>
    </div>
  );
};

export default Storyboard;