import React, { useState } from 'react';
import { UserInput } from '../types';
import { ArrowRightIcon } from './icons';

interface IdeaFormProps {
  onSubmit: (data: UserInput) => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(60);
  const [language, setLanguage] = useState('English');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit({ topic, duration, language, aspectRatio });
    }
  };
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8 bg-brand-surface rounded-xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-center">Bring Your Idea to Life</h2>
      <p className="text-brand-text-secondary mb-8 text-center">Start by describing your topic. Our AI Director will handle the rest.</p>
      
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-brand-text-secondary mb-2">Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., A golden retriever travels back in time"
            className="w-full px-4 py-3 bg-brand-surface-light border border-brand-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition"
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-brand-text-secondary mb-2">
            Target Duration: <span className="font-bold text-brand-primary">{formatDuration(duration)}</span>
          </label>
          <input
            id="duration"
            type="range"
            min="60"
            max="300"
            step="1"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer accent-brand-primary"
          />
        </div>

        <div>
            <label className="block text-sm font-medium text-brand-text-secondary mb-2">Aspect Ratio</label>
            <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setAspectRatio('16:9')} className={`px-4 py-3 rounded-lg text-center font-semibold transition-colors ${aspectRatio === '16:9' ? 'bg-brand-primary text-white ring-2 ring-brand-primary' : 'bg-brand-surface-light hover:bg-brand-secondary'}`}>
                    16:9 (Landscape)
                </button>
                <button type="button" onClick={() => setAspectRatio('9:16')} className={`px-4 py-3 rounded-lg text-center font-semibold transition-colors ${aspectRatio === '9:16' ? 'bg-brand-primary text-white ring-2 ring-brand-primary' : 'bg-brand-surface-light hover:bg-brand-secondary'}`}>
                    9:16 (Portrait)
                </button>
            </div>
        </div>
        
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-brand-text-secondary mb-2">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-brand-surface-light border border-brand-secondary rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>Vietnamese</option>
            <option>Japanese</option>
          </select>
        </div>

        <button 
          type="submit"
          disabled={!topic.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-lg hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75 transition-all duration-300 disabled:bg-brand-secondary disabled:cursor-not-allowed"
        >
          <span>Suggest Characters & Setting</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;