import React, { useState } from 'react';
import Header from '../components/Header';
import { Promotion, PromotionContentItem } from '../types';
import { ClipboardCopyIcon, CheckIcon } from '../components/icons/Icons';

interface PromotionDetailScreenProps {
  promotion: Promotion;
  onBack: () => void;
}

const ContentRenderer: React.FC<{ item: PromotionContentItem }> = ({ item }) => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2000);
        });
    };

    switch (item.type) {
        case 'text':
            if(item.isNote) {
                return <p className="text-sm bg-yellow-400/10 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 p-3 rounded-lg my-2">{item.content}</p>
            }
            return <p className="text-gray-600 dark:text-gray-400 my-2 text-sm leading-relaxed">{item.content}</p>;
        
        case 'list':
            const ListTag = item.listType === 'ordered' ? 'ol' : 'ul';
            const listStyle = item.listType === 'ordered' ? 'list-decimal' : 'list-disc';
            return (
                <ListTag className={`${listStyle} list-inside space-y-2 text-gray-600 dark:text-gray-400 my-3 text-sm`}>
                    {item.items.map((li, index) => <li key={index} className="pl-2">{li.includes('https://') ? <a href={li.split(': ')[1]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{li}</a> : li}</li>)}
                </ListTag>
            );
        
        case 'coupon':
            const isCopied = copiedCode === item.code;
            return (
                <div className="bg-blue-500/10 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-lg my-3">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 dark:text-gray-400">CUPOM</span>
                            <code className="font-mono font-bold text-lg text-blue-600 dark:text-blue-400 tracking-widest">{item.code}</code>
                        </div>
                        <button onClick={() => handleCopy(item.code)} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-300 ${isCopied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}>
                           {isCopied ? <CheckIcon className="w-5 h-5 mr-2" /> : <ClipboardCopyIcon className="w-5 h-5 mr-2" />}
                           {isCopied ? 'Copiado!' : 'Copiar'}
                        </button>
                    </div>
                    {item.expiry && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Válido até: {item.expiry}</p>}
                </div>
            )

        default:
            return null;
    }
}

const PromotionDetailScreen: React.FC<PromotionDetailScreenProps> = ({ promotion, onBack }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Detalhes da Promoção" onBack={onBack} />
      <div className="flex-grow overflow-y-auto">
        <div className="relative">
            <img src={promotion.imageUrl} alt={promotion.title} className="w-full h-48 object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className="text-xs font-bold uppercase tracking-wider bg-blue-500 text-white px-2 py-1 rounded">{promotion.category}</span>
                <h1 className="text-2xl font-bold text-white mt-1">{promotion.title}</h1>
                <p className="text-sm text-gray-200 mt-2">Válido até: {promotion.expiryDate}</p>
            </div>
        </div>

        <div className="p-4 space-y-4">
            {promotion.sections.map((section, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{section.title}</h2>
                    {section.content.map((item, itemIndex) => <ContentRenderer key={itemIndex} item={item} />)}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionDetailScreen;