import React from 'react';
import Header from '../components/Header';
import { Page } from '../types';
import { CheckCircleFilledIcon } from '../components/icons/Icons';

interface AdSuccessScreenProps {
  adDetails: any;
  onDone: () => void;
  onNavigate: (page: Page) => void;
}

const AdSuccessScreen: React.FC<AdSuccessScreenProps> = ({ adDetails, onDone, onNavigate }) => {
    const title = adDetails ? `${adDetails.from} -> ${adDetails.to}` : "Seu anúncio";

  return (
    <div className="flex flex-col h-screen">
      <Header title="Anúncio Criado" />
      <div className="flex-grow p-6 flex flex-col items-center justify-center text-center">
        <CheckCircleFilledIcon className="w-24 h-24 text-green-500 mb-6 animate-scale-up" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Anúncio criado com sucesso!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
          O anúncio para "{title}" já está ativo e aparecerá na aba de emissões.
        </p>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
        <button
          onClick={() => onNavigate('emissions')}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Ver Emissões
        </button>
         <button
          onClick={onDone}
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Voltar para a Conta
        </button>
      </div>
    </div>
  );
};

export default AdSuccessScreen;