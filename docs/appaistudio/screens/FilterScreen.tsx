import React, { useState } from 'react';
import Header from '../components/Header';

interface FilterScreenProps {
  onBack: () => void;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ onBack }) => {
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [milesRange, setMilesRange] = useState({ min: 0, max: 500000 });

    const toggleAirline = (airline: string) => {
        setSelectedAirlines(prev => 
            prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
        );
    };

    const handleApplyFilters = () => {
        // Here you would typically pass the filter state back to the previous screen
        console.log({ selectedAirlines, milesRange });
        onBack();
    }
    
    const handleClearFilters = () => {
        setSelectedAirlines([]);
        setMilesRange({ min: 0, max: 500000});
    }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title="Filtros" onBack={onBack} />
      <div className="flex-grow p-6 overflow-y-auto space-y-8">
        <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Companhias Aéreas</h3>
            <div className="space-y-3">
                {['Virgin Atlantic', 'LATAM', 'Azul', 'GOL', 'TAP Air Portugal'].map(airline => (
                    <label key={airline} className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <input 
                            type="checkbox" 
                            checked={selectedAirlines.includes(airline)}
                            onChange={() => toggleAirline(airline)}
                            className="w-5 h-5 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded text-blue-500 focus:ring-blue-500" />
                        <span className="text-gray-800 dark:text-gray-200">{airline}</span>
                    </label>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Quantidade de Milhas</h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center text-gray-900 dark:text-white font-mono text-lg mb-4">
                    <span>{milesRange.min.toLocaleString('pt-BR')}k</span>
                    <span>{milesRange.max.toLocaleString('pt-BR')}k</span>
                </div>
                {/* A proper range slider would be implemented here */}
                <input 
                    type="range" 
                    min="0" 
                    max="500000" 
                    value={milesRange.max} 
                    onChange={(e) => setMilesRange(prev => ({ ...prev, max: parseInt(e.target.value) }))} 
                    className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                />
            </div>
        </div>

      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4">
        <button
            onClick={handleClearFilters}
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
            Limpar
        </button>
        <button
          onClick={handleApplyFilters}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FilterScreen;