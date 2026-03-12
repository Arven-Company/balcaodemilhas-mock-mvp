import React from 'react';
import Header from '../components/Header';
import { FilePlusIcon } from '../components/icons/Icons';
import { FlightDeal } from '../types';

interface CreatePurchaseOfferScreenProps {
  flight: FlightDeal;
  onBack: () => void;
}

const CreatePurchaseOfferScreen: React.FC<CreatePurchaseOfferScreenProps> = ({ flight, onBack }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Criar Oferta de Compra" onBack={onBack} />
      <div className="p-4 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center flex-grow">
        <FilePlusIcon className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-600"/>
        <h2 className="text-xl font-semibold mb-2">Oferta para {flight.to}</h2>
        <p>Funcionalidade a ser implementada.</p>
      </div>
    </div>
  );
};

export default CreatePurchaseOfferScreen;
