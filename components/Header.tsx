import React from 'react';
import { FilmIcon } from './icons';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="w-full max-w-7xl flex items-center justify-center py-4">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={onLogoClick}
      >
        <FilmIcon className="w-8 h-8 text-brand-primary group-hover:text-brand-primary-hover transition-colors" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text group-hover:text-white transition-colors">
          ViraScript AI Studio
        </h1>
      </div>
    </header>
  );
};

export default Header;
