import React from 'react';
import Header from '../components/Header';
import { Page } from '../types';
import { FilePlusIcon, TagIcon } from '../components/icons/Icons';

interface AdminPanelScreenProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const AdminPanelScreen: React.FC<AdminPanelScreenProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Painel Administrador" onBack={onBack} />
      <div className="p-6 space-y-4">
        <button
          onClick={() => onNavigate('admin-add-emission')}
          className="w-full bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex items-center text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <FilePlusIcon className="w-8 h-8 mr-4 text-blue-500 dark:text-blue-400" />
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Adicionar Emissão</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Criar uma nova oferta de voo.</p>
          </div>
        </button>
        <button
          onClick={() => onNavigate('admin-add-promotion')}
          className="w-full bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex items-center text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <TagIcon className="w-8 h-8 mr-4 text-purple-500 dark:text-purple-400" />
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Adicionar Promoção</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Criar uma nova promoção ou cupom.</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminPanelScreen;