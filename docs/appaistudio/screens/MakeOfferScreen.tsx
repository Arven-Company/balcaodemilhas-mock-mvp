import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { MarketOffer } from '../types';
import { SwapIcon } from '../components/icons/Icons';

interface MakeOfferScreenProps {
  offer: MarketOffer;
  onBack: () => void;
}

const MakeOfferScreen: React.FC<MakeOfferScreenProps> = ({ offer, onBack }) => {
  const milesInThousands = useMemo(() => offer.miles / 1000, [offer.miles]);

  const originalTotalPrice = useMemo(() => {
    return offer.totalPrice || (offer.pricePerThousand ? offer.pricePerThousand * milesInThousands : 5000);
  }, [offer.totalPrice, offer.pricePerThousand, milesInThousands]);

  const originalPricePerThousand = useMemo(() => {
    if (milesInThousands === 0) return 0;
    return offer.pricePerThousand || (offer.totalPrice ? offer.totalPrice / milesInThousands : originalTotalPrice / milesInThousands);
  }, [offer.pricePerThousand, offer.totalPrice, milesInThousands, originalTotalPrice]);

  const [totalPrice, setTotalPrice] = useState(originalTotalPrice.toFixed(2));
  const [pricePerThousand, setPricePerThousand] = useState(originalPricePerThousand.toFixed(2));

  const minAllowedPrice = useMemo(() => originalTotalPrice * 0.85, [originalTotalPrice]);
  
  const isInvalidOffer = useMemo(() => {
    const numericValue = parseFloat(totalPrice);
    return isNaN(numericValue) || numericValue < minAllowedPrice;
  }, [totalPrice, minAllowedPrice]);

  const handleTotalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotalStr = e.target.value;
    setTotalPrice(newTotalStr);

    const newTotalNum = parseFloat(newTotalStr);
    if (!isNaN(newTotalNum) && milesInThousands > 0) {
        const newPricePerThousand = newTotalNum / milesInThousands;
        setPricePerThousand(newPricePerThousand.toFixed(2));
    } else if (newTotalStr === '') {
        setPricePerThousand('');
    }
  };

  const handlePricePerThousandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPricePerThousandStr = e.target.value;
    setPricePerThousand(newPricePerThousandStr);

    const newPricePerThousandNum = parseFloat(newPricePerThousandStr);
    if (!isNaN(newPricePerThousandNum)) {
        const newTotal = newPricePerThousandNum * milesInThousands;
        setTotalPrice(newTotal.toFixed(2));
    } else if (newPricePerThousandStr === '') {
        setTotalPrice('');
    }
  };


  const handleSubmit = () => {
    if(!isInvalidOffer) {
        alert(`Oferta de R$ ${totalPrice} enviada!`);
        onBack();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title="Fazer Oferta" onBack={onBack} />
      <div className="flex-grow p-6 flex flex-col">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Oferta para</p>
            <p className="font-bold text-xl text-gray-900 dark:text-white">{offer.miles.toLocaleString('pt-BR')}k {offer.airline}</p>
            <p className="text-gray-600 dark:text-gray-300">de {offer.user.name}</p>
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Valor Original</p>
                <p className="font-bold text-lg text-blue-600 dark:text-blue-400">R$ {originalTotalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
            </div>
        </div>

        <div className="space-y-4">
            <label className="block font-semibold text-lg text-gray-800 dark:text-gray-200">Sua contraproposta:</label>
            
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <label htmlFor="price-per-thousand" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Valor do Milheiro</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">R$</span>
                        <input
                            id="price-per-thousand"
                            type="number"
                            step="0.01"
                            value={pricePerThousand}
                            onChange={handlePricePerThousandChange}
                            placeholder="0,00"
                            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-xl p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-transparent"
                        />
                    </div>
                </div>

                <div className="pt-7">
                    <SwapIcon className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex-1">
                    <label htmlFor="total-price" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Valor Total</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">R$</span>
                        <input
                            id="total-price"
                            type="number"
                            step="0.01"
                            value={totalPrice}
                            onChange={handleTotalPriceChange}
                            placeholder="0,00"
                            className={`w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-xl p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 transition-all ${isInvalidOffer ? 'focus:ring-red-500 border-2 border-red-500' : 'focus:ring-blue-500 border-2 border-transparent'}`}
                        />
                    </div>
                </div>
            </div>
            
            {isInvalidOffer && (
                <p className="text-red-500 text-sm">
                    A contraproposta não pode ser inferior a 15% do valor original (mínimo R$ {minAllowedPrice.toFixed(2)}).
                </p>
            )}
        </div>
      </div>
       <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={handleSubmit}
          disabled={isInvalidOffer}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Enviar Proposta
        </button>
      </div>
    </div>
  );
};

export default MakeOfferScreen;
