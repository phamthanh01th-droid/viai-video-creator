import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
  );
};

export default LoadingSpinner;