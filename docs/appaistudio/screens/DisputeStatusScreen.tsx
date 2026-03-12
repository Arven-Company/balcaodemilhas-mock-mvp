import React from 'react';
import Header from '../components/Header';
import { MarketOffer } from '../types';
import { ShieldAlertIcon } from '../components/icons/Icons';

interface DisputeStatusScreenProps {
  offer: MarketOffer;
  reason: string;
  onDone: () => void;
}

const DisputeStatusScreen: React.FC<DisputeStatusScreenProps> = ({ offer, reason, onDone }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title="Status da Disputa" />
      <div className="flex-grow p-6 flex flex-col items-center justify-center text-center">
        <ShieldAlertIcon className="w-24 h-24 text-yellow-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Disputa em Análise</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Recebemos sua solicitação e nossa equipe de suporte já está analisando o caso.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-full max-w-sm text-left space-y-3">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Transação em Disputa</p>
                <p className="font-semibold text-gray-900 dark:text-white">{offer.miles.toLocaleString('pt-BR')}k milhas {offer.airline}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Parte Contrária</p>
                <p className="font-semibold text-gray-900 dark:text-white">{offer.user.name}</p>
            </div>
             <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Motivo da Disputa</p>
                <p className="font-semibold text-gray-900 dark:text-white">{reason}</p>
            </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 max-w-sm">
            Entraremos em contato via e-mail ou chat em até 24 horas úteis com os próximos passos.
        </p>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onDone}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Voltar para o Balcão
        </button>
      </div>
    </div>
  );
};

export default DisputeStatusScreen;
