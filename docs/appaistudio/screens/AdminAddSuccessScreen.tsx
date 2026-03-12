import React from 'react';
import Header from '../components/Header';
import { Page } from '../types';
import { CheckCircleFilledIcon } from '../components/icons/Icons';

interface AdminAddSuccessScreenProps {
  type: 'emission' | 'promotion';
  title: string;
  onNavigate: (page: Page) => void;
}

const AdminAddSuccessScreen: React.FC<AdminAddSuccessScreenProps> = ({ type, title, onNavigate }) => {
    const typeText = type === 'emission' ? 'Emissão' : 'Promoção';

  return (
    <div className="flex flex-col h-screen">
      <Header title={`${typeText} Adicionada`} />
      <div className="flex-grow p-6 flex flex-col items-center justify-center text-center">
        <CheckCircleFilledIcon className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{typeText} adicionada com sucesso!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
          A {typeText.toLowerCase()} "{title}" já está disponível no aplicativo.
        </p>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
        <button
          onClick={() => onNavigate('admin-panel')}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Voltar ao Painel
        </button>
         <button
          onClick={() => onNavigate(type === 'emission' ? 'emissions' : 'promotions')}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Ver {typeText}s
        </button>
      </div>
    </div>
  );
};

export default AdminAddSuccessScreen;