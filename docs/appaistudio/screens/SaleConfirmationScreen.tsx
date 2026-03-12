import React from 'react';
import { MarketOffer } from '../types';
import Header from '../components/Header';
import { CheckCircleIcon } from '../components/icons/Icons';

interface EmissionDetails {
  reservationCode: string;
  flightInfo: string;
  flightDate: string;
}

interface SaleConfirmationScreenProps {
  offer: MarketOffer;
  onDone: () => void;
  emissionDetails: EmissionDetails | null;
}

const SaleConfirmationScreen: React.FC<SaleConfirmationScreenProps> = ({ offer, onDone, emissionDetails }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title="Venda Concluída" />
      <div className="flex-grow p-6 flex flex-col items-center justify-center text-center">
        <CheckCircleIcon className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Venda Realizada com Sucesso!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          A transação de {offer.miles.toLocaleString('pt-BR')}k milhas {offer.airline} foi concluída.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-full max-w-sm text-left space-y-3">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Comprador</p>
                <p className="font-semibold text-gray-900 dark:text-white">{offer.user.name}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Número da Reserva</p>
                <p className="font-semibold text-gray-900 dark:text-white font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded inline-block">{emissionDetails?.reservationCode || 'N/A'}</p>
            </div>
             <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dados da Passagem</p>
                <p className="font-semibold text-gray-900 dark:text-white">{emissionDetails?.flightInfo || 'N/A'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{emissionDetails?.flightDate || 'N/A'}</p>
            </div>
        </div>
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

export default SaleConfirmationScreen;
