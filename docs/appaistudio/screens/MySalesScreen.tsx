import React from 'react';
import Header from '../components/Header';
import { DollarSignIcon } from '../components/icons/Icons';
import { MOCK_MARKET_OFFERS } from '../constants';
import { MarketOffer } from '../types';

interface MySalesScreenProps {
  onBack: () => void;
  onSelectSale: (sale: MarketOffer) => void;
}

const MySalesScreen: React.FC<MySalesScreenProps> = ({ onBack, onSelectSale }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title="Minhas Vendas" onBack={onBack} />
      <div className="p-4 space-y-3 flex-grow overflow-y-auto">
        {MOCK_MARKET_OFFERS.slice(0, 3).map((offer, index) => (
             <button 
                key={offer.id} 
                onClick={() => onSelectSale(offer)}
                className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <div>
                    <p className="font-bold text-gray-800 dark:text-white">{offer.miles.toLocaleString('pt-BR')}k {offer.airline}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vendido para {offer.user.name}</p>
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                    {index === 0 ? 'Em andamento' : 'Concluída'}
                </span>
             </button>
        ))}
        {MOCK_MARKET_OFFERS.length === 0 && (
             <div className="p-4 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-full">
                <DollarSignIcon className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-600"/>
                <h2 className="text-xl font-semibold mb-2">Nenhuma venda encontrada</h2>
                <p>Suas vendas aparecerão aqui.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MySalesScreen;