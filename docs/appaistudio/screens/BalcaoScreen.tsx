import React, { useState } from 'react';
import Header from '../components/Header';
import OfferCard from '../components/OfferCard';
import { MOCK_MARKET_OFFERS, MOCK_PURCHASE_OFFERS } from '../constants';
import { FilterIcon, GridIcon, ListIcon, ChevronDownIcon, RocketIcon, SparklesIcon } from '../components/icons/Icons';
import { MarketOffer, Page } from '../types';

interface BalcaoScreenProps {
    onStartSale: (offer: MarketOffer) => void;
    onStartPurchase: (offer: MarketOffer) => void;
    onMakeOffer: (offer: MarketOffer) => void;
    onNavigate: (page: Page) => void;
}

const UpgradeBanner: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <button onClick={onClick} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 mb-4 flex items-center space-x-4 text-left">
        <div className="bg-white/20 p-2 rounded-full">
            <RocketIcon className="w-6 h-6 text-white" />
        </div>
        <div>
            <h3 className="font-bold text-white">Upgrade para o Plano Pro</h3>
            <p className="text-sm text-blue-100">Consiga taxas e milheiros mais baixos.</p>
        </div>
    </button>
);

const BalcaoScreen: React.FC<BalcaoScreenProps> = ({ onStartSale, onStartPurchase, onMakeOffer, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'sparkles'>('list');
  const [isSortOverlayVisible, setIsSortOverlayVisible] = useState(false);
  const [sortMethod, setSortMethod] = useState('Mais recentes');

  const sortOptions = ['Mais recentes', 'Menor preço', 'Maior quantidade', 'Melhor avaliação'];
  const offers = activeTab === 'buy' ? MOCK_PURCHASE_OFFERS : MOCK_MARKET_OFFERS;

  return (
    <div className="flex flex-col h-full">
      <Header title="Balcão" />
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              activeTab === 'buy' ? 'text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400' : 'text-gray-500'
            }`}
          >
            Compra
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              activeTab === 'sell' ? 'text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400' : 'text-gray-500'
            }`}
          >
            Venda
          </button>
        </div>
      </div>
      <div className="p-4">
         <UpgradeBanner onClick={() => onNavigate('plans')} />
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Virgin Atlantic</h2>
            <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{offers.length} ofertas</p>
                 <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500'}>
                    <ListIcon className="w-6 h-6" />
                </button>
                <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500'}>
                    <GridIcon className="w-6 h-6" />
                </button>
                <button onClick={() => setViewMode('sparkles')} className={viewMode === 'sparkles' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500'}>
                    <SparklesIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
        <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-2">
            <button className="flex-shrink-0 flex items-center text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 pl-2 pr-4 py-1.5 rounded-full font-semibold">
                <span className="bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white w-6 h-6 text-xs rounded-full flex items-center justify-center mr-2 ring-1 ring-gray-400 dark:ring-gray-600">2</span>
                Companhias
            </button>
             <div className="relative flex-shrink-0">
                <button onClick={() => setIsSortOverlayVisible(true)} className="flex items-center text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-semibold">
                    {sortMethod}
                    <ChevronDownIcon className={`w-4 h-4 ml-2`} />
                </button>
            </div>
            <button 
                onClick={() => onNavigate('filters')}
                className="flex-shrink-0 flex items-center text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-gray-800 px-4 py-2 rounded-full font-semibold">
                <FilterIcon className="w-4 h-4 mr-2" />
                Filtros
            </button>
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
            {offers.map(offer => (
              <OfferCard 
                key={offer.id} 
                offer={offer} 
                type={activeTab}
                viewMode={viewMode} 
                onStartSale={onStartSale} 
                onStartPurchase={onStartPurchase}
                onMakeOffer={onMakeOffer}
              />
            ))}
        </div>
      </div>
      {isSortOverlayVisible && (
        <div className="fixed inset-0 bg-black/70 z-20 flex items-end" onClick={() => setIsSortOverlayVisible(false)}>
            <div className="bg-white dark:bg-gray-800 w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-center mb-4 text-gray-900 dark:text-white">Ordenar por</h3>
                <div className="space-y-2">
                    {sortOptions.map(opt => (
                        <button 
                            key={opt}
                            onClick={() => { setSortMethod(opt); setIsSortOverlayVisible(false); }}
                            className={`w-full text-left px-4 py-3 text-lg rounded-lg ${sortMethod === opt ? 'bg-blue-600 text-white font-semibold' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default BalcaoScreen;