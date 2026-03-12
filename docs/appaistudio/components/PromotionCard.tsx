import React from 'react';
import { Promotion } from '../types';

interface PromotionCardProps {
    promotion: Promotion;
    onClick: () => void;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="w-full h-48 rounded-xl overflow-hidden relative text-white shadow-lg dark:shadow-xl transform hover:scale-105 transition-transform duration-300 group"
        >
            <img src={promotion.imageUrl} alt={promotion.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full text-left">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-blue-500/80">{promotion.category}</span>
                <h3 className="text-lg font-bold mt-1 text-shadow-md">{promotion.title}</h3>
                <p className="text-xs text-gray-200 mt-2">Válido até: {promotion.expiryDate}</p>
            </div>
        </button>
    )
}

export default PromotionCard;