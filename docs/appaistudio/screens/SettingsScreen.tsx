import React from 'react';
import Header from '../components/Header';
import { SunIcon, MoonIcon, ShieldIcon } from '../components/icons/Icons';
import { Page } from '../types';

interface SettingsScreenProps {
  onBack: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onNavigate: (page: Page) => void;
}

const ListItem: React.FC<{icon: React.ReactNode, label: string, onClick: () => void}> = ({ icon, label, onClick }) => (
    <button 
      onClick={onClick}
      className="w-full bg-gray-100 dark:bg-gray-800 text-left p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center text-gray-800 dark:text-gray-200">
      {icon}
      {label}
    </button>
);


const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, theme, toggleTheme, onNavigate }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Configurações" onBack={onBack} />
      <div className="p-6 space-y-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Tema do Aplicativo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mude para o modo {theme === 'light' ? 'escuro' : 'claro'}.
                </p>
            </div>
            <button 
                onClick={toggleTheme} 
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-300 dark:bg-gray-700"
            >
                <span className="sr-only">Mudar tema</span>
                <span className={`${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform flex items-center justify-center`}
                >
                    {theme === 'dark' 
                        ? <MoonIcon className="w-3 h-3 text-blue-600" /> 
                        : <SunIcon className="w-3 h-3 text-yellow-500" />}
                </span>
            </button>
        </div>
        <ListItem 
            icon={<ShieldIcon className="w-5 h-5 mr-4 text-gray-500 dark:text-gray-400"/>}
            label="Painel Administrador"
            onClick={() => onNavigate('admin-panel')}
        />
      </div>
    </div>
  );
};

export default SettingsScreen;