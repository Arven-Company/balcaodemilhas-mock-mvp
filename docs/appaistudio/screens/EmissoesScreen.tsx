import React, { useState, useEffect } from 'react';
import { FlightDeal, GroundingSource } from '../types';
import FlightCard from '../components/FlightCard';
import Header from '../components/Header';
import { FilterIcon } from '../components/icons/Icons';
import { MOCK_FLIGHT_DEALS } from '../constants';
import { fetchFlightDealsWithGrounding } from '../services/geminiService';

interface EmissoesScreenProps {
  onSelectFlight: (deal: FlightDeal) => void;
}

const EmissoesScreen: React.FC<EmissoesScreenProps> = ({ onSelectFlight }) => {
  const [deals, setDeals] = useState<FlightDeal[]>(MOCK_FLIGHT_DEALS);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      const { deals: geminiDeals, sources: geminiSources } = await fetchFlightDealsWithGrounding();
      
      const sponsoredDeal = MOCK_FLIGHT_DEALS.find(deal => deal.sponsored);

      if (geminiDeals.length > 0) {
        // Prepend the sponsored deal to the new results from the API.
        const updatedDeals = sponsoredDeal ? [sponsoredDeal, ...geminiDeals] : geminiDeals;
        setDeals(updatedDeals);
        setSources(geminiSources);
      } else {
        // Fallback to the original mock data if API fails or returns nothing.
        // This list already contains the sponsored deal.
        setDeals(MOCK_FLIGHT_DEALS);
      }
      setLoading(false);
    };

    loadDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Emissões" 
      />
      <div className="p-4">
        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">10/02/2025 - 12/03/2025</span>
          <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
            <FilterIcon className="w-4 h-4 mr-1" />
            Filtros
          </button>
        </div>
        {loading ? (
            <div className="text-center p-8">
              <p className="text-gray-500 dark:text-gray-400">Buscando as melhores ofertas com IA...</p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400 mx-auto mt-4"></div>
            </div>
        ) : (
          <>
            {deals.map(deal => (
              <FlightCard key={deal.id} deal={deal} onClick={() => onSelectFlight(deal)} />
            ))}
            {sources.length > 0 && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Fontes (via Pesquisa Google):</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {sources.map(source => (
                    <li key={source.uri}>
                      <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmissoesScreen;