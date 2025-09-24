import React, { useState, useCallback } from 'react';
import { CopyIcon, CloseIcon } from './icons';

interface JsonPromptPopupProps {
  jsonString: string;
  onClose: () => void;
}

const JsonPromptPopup: React.FC<JsonPromptPopupProps> = ({ jsonString, onClose }) => {
    const [copyButtonText, setCopyButtonText] = useState('Copy');

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(jsonString).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy'), 2000);
        });
    }, [jsonString]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-brand-surface w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col border border-brand-surface-light">
                <header className="flex items-center justify-between p-4 border-b border-brand-secondary">
                    <h3 className="text-xl font-bold">Generated VEO Prompt</h3>
                    <button onClick={onClose} className="text-brand-text-secondary hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>
                <main className="p-4 overflow-y-auto">
                    <pre className="bg-brand-bg p-4 rounded-lg text-sm whitespace-pre-wrap break-all">
                        <code>{jsonString}</code>
                    </pre>
                </main>
                <footer className="p-4 border-t border-brand-secondary">
                    <button
                        onClick={handleCopy}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-75 transition-colors"
                    >
                        <CopyIcon className="w-5 h-5" />
                        {copyButtonText}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default JsonPromptPopup;