import React, { useState } from 'react';
import { FlightDeal, Page } from '../types';
import Calendar from '../components/Calendar';
import Header from '../components/Header';

interface FlightDetailScreenProps {
  flight: FlightDeal;
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const FlightDetailScreen: React.FC<FlightDetailScreenProps> = ({ flight, onBack, onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 27));

  const availableDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      <Header title="Emissões" onBack={onBack} />
      <div className="relative">
        <img src={flight.imageUrl} alt={`${flight.from} to ${flight.to}`} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full inline-block mb-2">
            EXECUTIVA
          </div>
          <p className="text-xs text-gray-200 dark:text-gray-300">Set/25 a out/25</p>
          <h2 className="text-2xl font-bold text-white">{`${flight.from} - ${flight.to}`}</h2>
          <p className="text-lg font-semibold text-blue-400">
            a partir de {flight.priceMiles ? `${(flight.priceMiles / 1000).toLocaleString('pt-BR')} milhas` : `R$ ${flight.priceBRL?.toLocaleString('pt-BR')}`}
          </p>
        </div>
      </div>
      
      <div className="flex-grow">
        <Calendar availableDays={availableDays} onDateSelect={setSelectedDate} />
      </div>

      <div className="sticky bottom-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'})}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">126.000 milhas</p>
            </div>
            <button 
                onClick={() => onNavigate('create-purchase-offer')}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors">
            Criar Oferta de Compra
            </button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailScreen;