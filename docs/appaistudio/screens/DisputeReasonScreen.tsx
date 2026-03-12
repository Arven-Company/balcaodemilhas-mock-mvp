import React, { useState } from 'react';
import Header from '../components/Header';
import { MarketOffer } from '../types';

interface DisputeReasonScreenProps {
  offer: MarketOffer;
  onBack: () => void;
  onConfirm: (reason: string) => void;
}

const DISPUTE_REASONS = [
    "Passagem não disponível",
    "Outra parte solicitou cancelamento",
    "Outro"
];

const DisputeReasonScreen: React.FC<DisputeReasonScreenProps> = ({ offer, onBack, onConfirm }) => {
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [otherReasonText, setOtherReasonText] = useState('');

    const isOtherSelected = selectedReason === 'Outro';
    const canConfirm = selectedReason && (!isOtherSelected || (isOtherSelected && otherReasonText.trim() !== ''));

    const handleConfirm = () => {
        if (canConfirm) {
            const reasonToSubmit = isOtherSelected ? otherReasonText : selectedReason;
            onConfirm(reasonToSubmit);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-black">
            <Header title="Abrir Disputa" onBack={onBack} />
            <div className="flex-grow p-6 overflow-y-auto">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Disputa para a transação</p>
                    <p className="font-bold text-xl text-gray-900 dark:text-white">{offer.miles.toLocaleString('pt-BR')}k {offer.airline}</p>
                    <p className="text-gray-600 dark:text-gray-300">com {offer.user.name}</p>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Selecione o motivo:</h3>
                <div className="space-y-3">
                    {DISPUTE_REASONS.map(reason => (
                         <label key={reason} className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <input 
                                type="radio" 
                                name="disputeReason"
                                value={reason}
                                checked={selectedReason === reason}
                                onChange={() => setSelectedReason(reason)}
                                className="w-5 h-5 bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-blue-500 focus:ring-blue-500" />
                            <span className="text-gray-800 dark:text-gray-200">{reason}</span>
                        </label>
                    ))}
                    {isOtherSelected && (
                        <textarea
                            value={otherReasonText}
                            onChange={(e) => setOtherReasonText(e.target.value)}
                            placeholder="Por favor, descreva o motivo."
                            className="w-full h-24 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mt-2"
                        />
                    )}
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button onClick={handleConfirm} disabled={!canConfirm} className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600">Confirmar Disputa</button>
            </div>
        </div>
    );
};

export default DisputeReasonScreen;
