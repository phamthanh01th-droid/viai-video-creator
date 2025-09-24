// FIX: Implement the main App component to manage state and UI flow.
import React, { useState } from 'react';
import { UserInput, Suggestions, Scene } from './types';
import { getSuggestions, getStoryboard } from './services/geminiService';
import Header from './components/Header';
import IdeaForm from './components/IdeaForm';
import ReviewScreen from './components/ReviewScreen';
import Storyboard from './components/Storyboard';
import LoadingSpinner from './components/LoadingSpinner';

type AppState = 'idea' | 'review' | 'storyboard' | 'loading' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('idea');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);

  const handleError = (message: string) => {
    setErrorMessage(message);
    setAppState('error');
  };
  
  const handleReset = () => {
    setAppState('idea');
    setUserInput(null);
    setSuggestions(null);
    setScenes([]);
    setErrorMessage('');
  };

  const handleIdeaSubmit = async (data: UserInput) => {
    setUserInput(data);
    setAppState('loading');
    try {
      const result = await getSuggestions(data);
      setSuggestions(result);
      setAppState('review');
    } catch (error) {
      console.error(error);
      handleError(error instanceof Error ? error.message : "Failed to get suggestions from AI.");
    }
  };
  
  const handleSuggestionsAccept = async (acceptedSuggestions: Suggestions) => {
    setSuggestions(acceptedSuggestions); // save edited suggestions
    if (!userInput) {
      handleError("User input is missing.");
      return;
    }
    setAppState('loading');
    try {
      const result = await getStoryboard(userInput, acceptedSuggestions);
      setScenes(result);
      setAppState('storyboard');
    } catch (error) {
      console.error(error);
      handleError(error instanceof Error ? error.message : "Failed to generate storyboard.");
    }
  };

  const handleRegenerateSuggestions = async () => {
    if (!userInput) {
        handleError("User input is missing.");
        return;
    }
    setAppState('loading');
    try {
        const result = await getSuggestions(userInput);
        setSuggestions(result);
        setAppState('review');
    } catch (error) {
        console.error(error);
        handleError(error instanceof Error ? error.message : "Failed to regenerate suggestions.");
    }
  };
  
  const handleBackToIdea = () => {
      setAppState('idea');
      setSuggestions(null);
  };
  
  const handleBackToReview = () => {
      setAppState('review');
      setScenes([]);
  };

  const renderContent = () => {
    switch (appState) {
      case 'idea':
        return <IdeaForm onSubmit={handleIdeaSubmit} />;
      case 'review':
        if (suggestions) {
          return (
            <ReviewScreen 
              suggestions={suggestions}
              onAccept={handleSuggestionsAccept}
              onBack={handleBackToIdea}
              onRegenerate={handleRegenerateSuggestions}
            />
          );
        }
        handleError("Suggestions data is missing.");
        return null;
      case 'storyboard':
        if (userInput && suggestions) {
          return (
            <Storyboard 
                scenes={scenes} 
                onBack={handleBackToReview}
                userInput={userInput}
                suggestions={suggestions}
            />
          );
        }
        handleError("Data for storyboard is missing.");
        return null;
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center gap-4 text-white">
            <LoadingSpinner />
            <p className="text-lg animate-pulse">AI Director is thinking...</p>
          </div>
        );
      case 'error':
        return (
            <div className="w-full max-w-md mx-auto text-center p-8 bg-red-900/50 border border-red-500 rounded-lg">
                <h2 className="text-2xl font-bold text-red-400 mb-4">An Error Occurred</h2>
                <p className="text-white mb-6">{errorMessage}</p>
                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75 transition-colors"
                >
                    Start Over
                </button>
            </div>
        );
      default:
        return <IdeaForm onSubmit={handleIdeaSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header onLogoClick={handleReset} />
      <main className="w-full flex-grow flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
