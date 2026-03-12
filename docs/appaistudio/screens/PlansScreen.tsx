import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/Header';
import { CheckIcon, ChevronLeftIcon, InfoIcon, LockIcon } from '../components/icons/Icons';

interface PlansScreenProps {
  onBack: () => void;
  onPurchasePlan: (planName: string) => void;
}

const plansData = [
  {
    id: 'basic',
    name: 'Básico',
    price: '12,00',
    features: [
      {
        category: 'Transações e Taxas',
        items: [
          { name: 'Taxa Administrativa', value: '5%', available: true },
          { name: 'Limite de Ofertas Ativas', value: '10 por mês', available: true },
        ],
      },
      {
        category: 'Suporte',
        items: [
          { name: 'Suporte via Chat', value: 'Horário comercial', available: true },
        ],
      },
       {
        category: 'Benefícios Exclusivos',
        items: [
          { name: 'Radar de Ofertas', value: <LockIcon className="w-5 h-5 text-gray-500" />, available: false, info: true },
          { name: 'Selo de Verificação', value: <LockIcon className="w-5 h-5 text-gray-500" />, available: false },
        ],
      },
    ],
  },
  {
    id: 'premium',
    name: 'Premium+',
    price: '199,00',
    features: [
       {
        category: 'Transações e Taxas',
        items: [
          { name: 'Taxa Administrativa', value: 'Apenas 3%', available: true, note: 'Reduzida' },
          { name: 'Limite de Ofertas Ativas', value: 'Ilimitadas', available: true },
        ],
      },
      {
        category: 'Suporte',
        items: [
          { name: 'Suporte via Chat', value: 'Prioritário 24/7', available: true },
        ],
      },
      {
        category: 'Benefícios Exclusivos',
        items: [
          { name: 'Radar de Ofertas', value: <CheckIcon className="w-5 h-5 text-green-400" />, available: true, info: true },
          { name: 'Selo de Verificação', value: 'Perfil Premium', available: true },
        ],
      },
    ],
  },
];

const PlansScreen: React.FC<PlansScreenProps> = ({ onBack, onPurchasePlan }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const scrollLeft = container.scrollLeft;
          const childNodes = Array.from(container.children) as HTMLElement[];
          const containerCenter = container.offsetWidth / 2;
    
          let closestIndex = -1;
          let closestDistance = Infinity;
    
          childNodes.forEach((node, index) => {
            const nodeCenter = node.offsetLeft - scrollLeft + node.offsetWidth / 2;
            const distance = Math.abs(containerCenter - nodeCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });
    
          if (closestIndex !== -1) {
              scrollToPlan(closestIndex);
          }
        }
    }, 150);
  };
  
   useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
        container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
        if(container) {
            container.removeEventListener('scroll', handleScroll);
        }
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
    }
   }, []);

  const scrollToPlan = (index: number) => {
    setActivePlanIndex(index);
    const container = scrollContainerRef.current;
    if(container) {
        const targetNode = container.children[index] as HTMLElement;
        if(targetNode) {
            const containerWidth = container.offsetWidth;
            const nodeWidth = targetNode.offsetWidth;
            const nodeLeft = targetNode.offsetLeft;
            const scrollTo = nodeLeft - (containerWidth / 2) + (nodeWidth / 2);
            container.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    }
  }

  const handleArrowClick = (direction: 'prev' | 'next') => {
      const newIndex = direction === 'prev' ? Math.max(0, activePlanIndex - 1) : Math.min(plansData.length - 1, activePlanIndex + 1);
      scrollToPlan(newIndex);
  }

  const handleSubscribe = () => {
    const selectedPlan = plansData[activePlanIndex];
    if (selectedPlan) {
      onPurchasePlan(selectedPlan.name);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#111] text-white overflow-hidden">
        <div 
            className="absolute inset-0 w-full h-full"
            style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
                backgroundSize: '20px 20px',
            }}
        />
      <Header title="Assine" onBack={onBack} />
      
      <div className="relative flex-grow flex flex-col justify-center">
        <div 
            ref={scrollContainerRef}
            className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory py-4 scroll-smooth px-[calc((100%-85%)/2)]"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
            {plansData.map((plan, index) => (
            <div 
                key={plan.id} 
                className="flex-shrink-0 w-[85%] min-w-[300px] snap-center"
            >
                <div className={`w-full bg-[#1A1A1A]/70 border ${activePlanIndex === index ? 'border-blue-500' : 'border-gray-700'} rounded-2xl p-4 transition-all duration-300 backdrop-blur-sm h-full flex flex-col`}>
                    <div 
                        className="text-center font-bold text-lg text-white p-3 bg-cover bg-center bg-no-repeat bg-gray-900/80 rounded-xl mb-6"
                        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/scratchy-metal.png')" }}
                    >
                        {plan.name}
                    </div>
                    <div className="space-y-6">
                        {plan.features.map(category => (
                            <div key={category.category} className="bg-black/30 p-4 rounded-xl">
                                <h3 className="font-bold text-white mb-3">{category.category}</h3>
                                <ul className="space-y-3">
                                    {category.items.map(item => (
                                        <li key={item.name} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center text-gray-300">
                                                <span>{item.name}</span>
                                                {item.info && <InfoIcon className="w-4 h-4 ml-1.5 text-gray-500"/>}
                                            </div>
                                            <div className="flex items-center">
                                                {item.note && <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full mr-2">{item.note}</span>}
                                                <span className={item.available ? "text-white font-semibold" : "text-gray-500"}>{item.value}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            ))}
        </div>
        <button 
            onClick={() => handleArrowClick('prev')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-700 transition-colors hidden md:block"
            aria-label="Previous Plan"
        >
            <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button 
            onClick={() => handleArrowClick('next')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/50 rounded-full text-white hover:bg-gray-700 transition-colors hidden md:block"
            aria-label="Next Plan"
        >
            <ChevronLeftIcon className="w-6 h-6 rotate-180" />
        </button>
      </div>

      <div className="px-8 pb-8 mt-auto z-10">
        <button 
          onClick={handleSubscribe}
          className="w-full bg-white text-black font-bold py-4 px-6 rounded-xl hover:bg-gray-200 transition-colors"
        >
          Assinar Plano por R$ {plansData[activePlanIndex]?.price || '...'}
        </button>
      </div>
    </div>
  );
};

export default PlansScreen;