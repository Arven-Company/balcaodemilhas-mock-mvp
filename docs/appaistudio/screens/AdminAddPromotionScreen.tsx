import React, { useState } from 'react';
import Header from '../components/Header';
import { PromotionSection, PromotionContentItem } from '../types';

interface AdminAddPromotionScreenProps {
  onBack: () => void;
  onConfirm: (type: 'emission' | 'promotion', title: string) => void;
}

const AdminAddPromotionScreen: React.FC<AdminAddPromotionScreenProps> = ({ onBack, onConfirm }) => {
    const [promotion, setPromotion] = useState({
        title: '',
        category: 'Clubes de Milhas',
        expiryDate: new Date().toISOString().split('T')[0],
        imageUrl: '',
    });
    const [sections, setSections] = useState<PromotionSection[]>([
        { title: '', content: [] }
    ]);

    const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPromotion(prev => ({ ...prev, [name]: value }));
    };

    const handleSectionChange = (index: number, field: keyof PromotionSection, value: any) => {
        const newSections = [...sections];
        (newSections[index] as any)[field] = value;
        setSections(newSections);
    };

    const addSection = () => {
        setSections([...sections, { title: '', content: [] }]);
    };
    
    const removeSection = (index: number) => {
        if(sections.length > 1) {
            setSections(sections.filter((_, i) => i !== index));
        }
    };

    const addContentItem = (sectionIndex: number, type: 'text' | 'note' | 'list' | 'coupon') => {
        const newSections = [...sections];
        let newItem: PromotionContentItem;
        switch(type) {
            case 'note': newItem = { type: 'text', content: '', isNote: true }; break;
            case 'list': newItem = { type: 'list', items: [''], listType: 'unordered' }; break;
            case 'coupon': newItem = { type: 'coupon', code: '', description: '' }; break;
            default: newItem = { type: 'text', content: '' };
        }
        newSections[sectionIndex].content.push(newItem);
        setSections(newSections);
    };

    const removeContentItem = (sectionIndex: number, contentIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].content.splice(contentIndex, 1);
        setSections(newSections);
    }
    
    const handleContentItemChange = (sectionIndex: number, contentIndex: number, field: string, value: any) => {
        const newSections = [...sections];
        const item = newSections[sectionIndex].content[contentIndex] as any;
        item[field] = value;
        setSections(newSections);
    };

    const handleListItemChange = (sectionIndex: number, contentIndex: number, itemIndex: number, value: string) => {
        const newSections = [...sections];
        const item = newSections[sectionIndex].content[contentIndex] as any;
        item.items[itemIndex] = value;
        setSections(newSections);
    }

    const addListItem = (sectionIndex: number, contentIndex: number) => {
        const newSections = [...sections];
        const item = newSections[sectionIndex].content[contentIndex] as any;
        item.items.push('');
        setSections(newSections);
    }
    
    const handleConfirm = () => {
        if (promotion.title.trim() && promotion.category.trim() && promotion.expiryDate.trim()) {
            console.log("Confirmed promotion:", { ...promotion, sections });
            onConfirm('promotion', promotion.title);
        } else {
            alert('Por favor, preencha todos os campos da promoção.');
        }
    };

    const renderContentItem = (item: PromotionContentItem, sectionIndex: number, contentIndex: number) => {
        return (
            <div key={contentIndex} className="bg-white dark:bg-gray-700 p-3 rounded-lg space-y-2 relative">
                <button onClick={() => removeContentItem(sectionIndex, contentIndex)} className="absolute -top-2 -right-2 text-red-500 hover:text-red-700 p-1 bg-red-100 dark:bg-red-900/50 rounded-full z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                {item.type === 'text' && (
                     <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{item.isNote ? 'Aviso (Caixa Amarela)' : 'Texto'}</label>
                        <textarea value={item.content} onChange={(e) => handleContentItemChange(sectionIndex, contentIndex, 'content', e.target.value)} className="w-full h-20 bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-900 dark:text-white" />
                    </div>
                )}
                {item.type === 'list' && (
                    <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Lista</label>
                        <select value={item.listType} onChange={(e) => handleContentItemChange(sectionIndex, contentIndex, 'listType', e.target.value)} className="mb-2 w-full bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-900 dark:text-white">
                            <option value="unordered">Lista de Pontos</option>
                            <option value="ordered">Lista Numerada</option>
                        </select>
                        {item.items.map((listItem, i) => (
                             <input key={i} type="text" value={listItem} onChange={(e) => handleListItemChange(sectionIndex, contentIndex, i, e.target.value)} className="w-full mb-1 bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-900 dark:text-white"/>
                        ))}
                        <button onClick={() => addListItem(sectionIndex, contentIndex)} className="text-sm text-blue-500 mt-1">+ Adicionar Item</button>
                    </div>
                )}
                {item.type === 'coupon' && (
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Cupom</label>
                         <input type="text" value={item.code} onChange={(e) => handleContentItemChange(sectionIndex, contentIndex, 'code', e.target.value)} placeholder="Código (Ex: PROMO15)" className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-900 dark:text-white"/>
                         <input type="text" value={item.description} onChange={(e) => handleContentItemChange(sectionIndex, contentIndex, 'description', e.target.value)} placeholder="Descrição" className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-900 dark:text-white"/>
                         <input type="text" value={item.expiry || ''} onChange={(e) => handleContentItemChange(sectionIndex, contentIndex, 'expiry', e.target.value)} placeholder="Validade (Opcional)" className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-900 dark:text-white"/>
                    </div>
                )}
            </div>
        )
    }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Adicionar Promoção" onBack={onBack} />
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Informações da Promoção</h3>
            <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Título</label>
                <input type="text" name="title" value={promotion.title} onChange={handlePromoChange} placeholder="Ex: Assinatura Clube Smiles" className="w-full bg-white dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Categoria</label>
                <select name="category" value={promotion.category} onChange={handlePromoChange} className="w-full bg-white dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Clubes de Milhas</option>
                    <option>Pacotes e Hotéis</option>
                    <option>Cartões de Crédito</option>
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Data de Validade</label>
                <input type="date" name="expiryDate" value={promotion.expiryDate} onChange={handlePromoChange} className="w-full bg-white dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">URL da Imagem</label>
                <input type="text" name="imageUrl" value={promotion.imageUrl} onChange={handlePromoChange} placeholder="https://picsum.photos/..." className="w-full bg-white dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
        </div>
        
        {sections.map((section, index) => (
             <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-4 relative">
                 <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Seção {index + 1}</h3>
                        <input type="text" value={section.title} onChange={(e) => handleSectionChange(index, 'title', e.target.value)} placeholder="Título da Seção (Ex: Passo a Passo)" className="w-full bg-white dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    {sections.length > 1 && (
                        <button onClick={() => removeSection(index)} className="text-red-500 hover:text-red-700 p-1 bg-red-500/10 rounded-full flex-shrink-0 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    )}
                 </div>
                 
                 <div className="space-y-3">
                    {section.content.map((item, contentIndex) => renderContentItem(item, index, contentIndex))}
                 </div>

                 <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={() => addContentItem(index, 'text')} className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">+ Texto</button>
                    <button onClick={() => addContentItem(index, 'note')} className="text-xs px-2 py-1 rounded bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300 dark:hover:bg-yellow-700">+ Aviso</button>
                    <button onClick={() => addContentItem(index, 'list')} className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">+ Lista</button>
                    <button onClick={() => addContentItem(index, 'coupon')} className="text-xs px-2 py-1 rounded bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700">+ Cupom</button>
                 </div>
             </div>
        ))}
        <button onClick={addSection} className="w-full border-2 border-dashed border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Adicionar Seção</button>

      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button onClick={handleConfirm} className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors">Confirmar e Adicionar Promoção</button>
      </div>
    </div>
  );
};

export default AdminAddPromotionScreen;