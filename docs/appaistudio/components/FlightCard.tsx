import React from 'react';
import { FlightDeal } from '../types';
import { StarIcon } from './icons/Icons';

interface FlightCardProps {
  deal: FlightDeal;
  onClick: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ deal, onClick }) => {
  const formatPrice = (deal: FlightDeal) => {
    if (deal.priceMiles) {
      return `${(deal.priceMiles / 1000).toLocaleString('pt-BR')}k milhas`;
    }
    if (deal.priceBRL) {
      return `R$ ${deal.priceBRL.toLocaleString('pt-BR')}`;
    }
    return 'Consulte';
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md dark:shadow-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="relative">
        <img src={deal.imageUrl} alt={`${deal.from} to ${deal.to}`} className="w-full h-32 object-cover" />
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
          EXECUTIVA
        </div>
      </div>
      <div className="p-4">
        {deal.sponsored && deal.sponsor ? (
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="flex items-center text-xs text-yellow-500 dark:text-yellow-400">
                <StarIcon className="w-4 h-4 mr-1" />
                <span>{deal.sponsor.rating}</span>
              </div>
              <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{deal.sponsor.name}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-500">patrocinado</span>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-2">
             <div className="flex items-center">
                <img src={deal.airlineLogoUrl} alt={deal.airline} className="w-6 h-6 rounded-full bg-white mr-2 object-contain" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{deal.airline}</span>
             </div>
          </div>
        )}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{`${deal.from} - ${deal.to}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{deal.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 dark:text-gray-400">ida e volta</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(deal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;