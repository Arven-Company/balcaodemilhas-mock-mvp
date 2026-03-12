import React from 'react';
import { ChevronLeftIcon } from './icons/Icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, rightAction }) => {
  return (
    <header className="sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10 p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        {onBack && (
          <button onClick={onBack} className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      </div>
      <div>{rightAction}</div>
    </header>
  );
};

export default Header;