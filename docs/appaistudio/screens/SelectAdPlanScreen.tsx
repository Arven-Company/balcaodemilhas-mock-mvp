import React, { useState } from 'react';
import Header from '../components/Header';
import { CheckIcon } from '../components/icons/Icons';

interface SelectAdPlanScreenProps {
  onBack: () => void;
  onConfirm: (plan: any) => void;
}

const adPlans = [
    {
        name: "Destaque",
        price: "49,90",
        duration: "7 dias",
        benefits: [
            "Posição de destaque 1x por dia",
            "Selo 'Anúncio' no card",
            "Visibilidade por 7 dias"
        ]
    },
    {
        name: "Patrocinado",
        price: "99,90",
        duration: "14 dias",
        benefits: [
            "Topo da lista 3x por dia",
            "Selo 'Patrocinado'",
            "Borda dourada de destaque",
            "Visibilidade por 14 dias"
        ]
    }
];

const SelectAdPlanScreen: React.FC<SelectAdPlanScreenProps> = ({ onBack, onConfirm }) => {
    const [selectedPlan, setSelectedPlan] = useState(adPlans[1]);

    return (
        <div className="flex flex-col h-full bg-[#111] text-white relative">
             <div 
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
                    backgroundSize: '20px 20px',
                }}
            />
            <Header title="Escolha um Plano" onBack={onBack} />
            <div className="flex-grow overflow-y-auto p-6 space-y-4 z-10">
                {adPlans.map(plan => {
                    const isSelected = selectedPlan.name === plan.name;
                    return (
                        <button
                            key={plan.name}
                            onClick={() => setSelectedPlan(plan)}
                            className={`w-full bg-[#1A1A1A]/70 border ${isSelected ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-700'} rounded-2xl p-6 text-left transition-all duration-300 backdrop-blur-sm`}
                        >
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-3xl font-bold mb-4">R$ {plan.price}<span className="text-lg font-normal text-gray-400">/{plan.duration}</span></p>
                            <ul className="space-y-2">
                                {plan.benefits.map(benefit => (
                                    <li key={benefit} className="flex items-center">
                                        <CheckIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                        <span className="text-gray-300">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </button>
                    )
                })}
            </div>
            <div className="p-4 border-t border-white/20 z-10">
                <button
                    onClick={() => onConfirm(selectedPlan)}
                    className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Confirmar Anúncio por R$ {selectedPlan.price}
                </button>
            </div>
        </div>
    )
}

export default SelectAdPlanScreen;