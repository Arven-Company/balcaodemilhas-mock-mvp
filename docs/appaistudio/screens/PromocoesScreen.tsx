import React from 'react';
import Header from '../components/Header';
import PromotionCard from '../components/PromotionCard';
import { MOCK_PROMOTIONS } from '../constants';
import { Promotion } from '../types';

interface PromocoesScreenProps {
  onSelectPromotion: (promotion: Promotion) => void;
}

const PromocoesScreen: React.FC<PromocoesScreenProps> = ({ onSelectPromotion }) => {
  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Promoções" 
      />
      <div className="p-4 space-y-4">
        {MOCK_PROMOTIONS.map(promo => (
            <PromotionCard 
                key={promo.id} 
                promotion={promo} 
                onClick={() => onSelectPromotion(promo)}
            />
        ))}
      </div>
    </div>
  );
};

export default PromocoesScreen;