import React from 'react';
import { MarketOffer } from '../types';
import { StarIcon } from './icons/Icons';

interface OfferCardProps {
  offer: MarketOffer;
  type: 'buy' | 'sell';
  viewMode?: 'list' | 'grid' | 'sparkles';
  onStartSale: (offer: MarketOffer) => void;
  onStartPurchase: (offer: MarketOffer) => void;
  onMakeOffer: (offer: MarketOffer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, type, viewMode = 'list', onStartSale, onStartPurchase, onMakeOffer }) => {
  
  const isBuyMode = type === 'buy';
  const mainActionText = isBuyMode ? 'Iniciar Compra' : 'Iniciar Venda';
  const handleMainAction = () => {
    if (isBuyMode) {
      onStartPurchase(offer);
    } else {
      onStartSale(offer);
    }
  };

  if (viewMode === 'sparkles') {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700 w-full">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                    <img src={offer.user.avatarUrl} alt={offer.user.name} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{offer.user.name}</p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <StarIcon className="w-3 h-3 text-yellow-500 dark:text-yellow-400 mr-1" />
                            <span>{offer.user.rating} • {offer.user.reviews}</span>
                        </div>
                    </div>
                </div>
                <img src={offer.airlineLogoUrl} alt={offer.airline} className="h-6 object-contain" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Milhas</p>
                    <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{offer.miles.toLocaleString('pt-BR')}k</p>
                </div>
                {offer.totalPrice && (
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">@ R${offer.pricePerThousand}</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">R$ {offer.totalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    </div>
                )}
            </div>
            <div className="mt-3 flex space-x-2">
                <button 
                    onClick={() => onMakeOffer(offer)}
                    className="flex-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Fazer Oferta
                </button>
                <button 
                    onClick={handleMainAction}
                    className="flex-1 text-sm bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-500 transition-colors">
                  {mainActionText}
                </button>
            </div>
        </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md dark:shadow-lg flex flex-col text-left w-full border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start w-full mb-2">
            <div className="flex items-center">
                <img src={offer.user.avatarUrl} alt={offer.user.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{offer.user.name}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <StarIcon className="w-3 h-3 text-yellow-500 dark:text-yellow-400 mr-1" />
                        <span>{offer.user.rating} • {offer.user.reviews}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-between items-end w-full">
            <div className='text-left'>
                <img src={offer.airlineLogoUrl} alt={offer.airline} className="h-5 object-contain mb-1" />
                <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{offer.miles.toLocaleString('pt-BR')}k</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Flying Club</p>
            </div>
            <button 
                onClick={handleMainAction}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors text-sm font-semibold">
                {mainActionText}
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-lg mb-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <img src={offer.user.avatarUrl} alt={offer.user.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{offer.user.name}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <StarIcon className="w-4 h-4 text-yellow-500 dark:text-yellow-400 mr-1" />
              <span>{offer.user.rating} • {offer.user.reviews} negociações</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <img src={offer.airlineLogoUrl} alt={offer.airline} className="w-16 mb-1 h-8 object-contain" />
          <p className="font-bold text-blue-600 dark:text-blue-400">{offer.miles.toLocaleString('pt-BR')}k</p>
          {offer.totalPrice ? (
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">@ R${offer.pricePerThousand}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total R${offer.totalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">Flying Club</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex space-x-3">
        <button 
            onClick={() => onMakeOffer(offer)}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Fazer Oferta
        </button>
        <button 
            onClick={handleMainAction}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">
          {mainActionText}
        </button>
      </div>
    </div>
  );
};

export default OfferCard;