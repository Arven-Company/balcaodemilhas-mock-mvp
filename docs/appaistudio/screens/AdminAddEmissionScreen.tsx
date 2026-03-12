import React, { useState } from 'react';
import Header from '../components/Header';
import { FlightDeal } from '../types';

interface AdminAddEmissionScreenProps {
  onBack: () => void;
  onSelectDates: (emissionData: Partial<FlightDeal>) => void;
}

const AdminAddEmissionScreen: React.FC<AdminAddEmissionScreenProps> = ({ onBack, onSelectDates }) => {
    const [emission, setEmission] = useState({
        airline: 'LATAM',
        to: '',
        from: '',
        tripType: 'ida-e-volta',
        priceMiles: 100000
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEmission(prev => ({ ...prev, [name]: name === 'priceMiles' ? parseInt(value, 10) : value }));
    };

    const handleNext = () => {
        // Simple validation
        if (emission.from.trim() && emission.to.trim() && emission.priceMiles > 0) {
            onSelectDates({
                ...emission,
                id: `admin-emission-${Date.now()}`,
                airlineLogoUrl: `https://logo.clearbit.com/${emission.airline.toLowerCase().replace(/\s/g, '')}.com`,
                imageUrl: `https://picsum.photos/seed/${emission.to.toLowerCase()}/400/200`,
            });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Adicionar Emissão" onBack={onBack} />
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Companhia Aérea</label>
            <select name="airline" value={emission.airline} onChange={handleChange} className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>LATAM</option>
                <option>Azul</option>
                <option>GOL</option>
                <option>TAP Air Portugal</option>
                <option>Iberia</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Origem</label>
            <input type="text" name="from" value={emission.from} onChange={handleChange} placeholder="Ex: São Paulo" className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Destino</label>
            <input type="text" name="to" value={emission.to} onChange={handleChange} placeholder="Ex: Lisboa" className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
         <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo de Viagem</label>
            <select name="tripType" value={emission.tripType} onChange={handleChange} className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="ida-e-volta">Ida e Volta</option>
                <option value="ida">Só Ida</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Número de Milhas (trecho)</label>
            <input type="number" name="priceMiles" value={emission.priceMiles} onChange={handleChange} placeholder="100000" className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button onClick={handleNext} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors">Selecionar Datas</button>
      </div>
    </div>
  );
};

export default AdminAddEmissionScreen;