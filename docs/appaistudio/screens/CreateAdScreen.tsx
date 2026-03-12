import React, { useState } from 'react';
import Header from '../components/Header';

interface CreateAdScreenProps {
  onBack: () => void;
  onNext: (adData: any) => void;
}

const CreateAdScreen: React.FC<CreateAdScreenProps> = ({ onBack, onNext }) => {
    const [ad, setAd] = useState({
        sponsorName: '',
        from: '',
        to: '',
        priceBRL: '',
        imageUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAd(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (ad.sponsorName.trim() && ad.from.trim() && ad.to.trim() && ad.priceBRL.trim()) {
            onNext({
                ...ad,
                priceBRL: parseFloat(ad.priceBRL),
            });
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Anunciar Emissão" onBack={onBack} />
      <div className="flex-grow p-6 overflow-y-auto space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detalhes do Anúncio</h3>
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Nome da Agência/Anunciante</label>
            <input type="text" name="sponsorName" value={ad.sponsorName} onChange={handleChange} placeholder="Ex: Agência Turismo" className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Origem</label>
            <input type="text" name="from" value={ad.from} onChange={handleChange} placeholder="Ex: São Paulo" className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Destino</label>
            <input type="text" name="to" value={ad.to} onChange={handleChange} placeholder="Ex: Roma" className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Preço (R$)</label>
            <input type="number" name="priceBRL" value={ad.priceBRL} onChange={handleChange} placeholder="3000.00" className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">URL da Imagem</label>
            <input type="text" name="imageUrl" value={ad.imageUrl} onChange={handleChange} placeholder="https://picsum.photos/..." className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button onClick={handleNext} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors">Escolher Plano de Anúncio</button>
      </div>
    </div>
  );
};

export default CreateAdScreen;