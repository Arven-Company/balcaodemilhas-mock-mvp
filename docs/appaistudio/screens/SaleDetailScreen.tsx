import React from 'react';
import Header from '../components/Header';
import { MarketOffer } from '../types';
import { CheckCircleIcon } from '../components/icons/Icons';

interface SaleDetailScreenProps {
  sale: MarketOffer;
  onBack: () => void;
}

const StepNode: React.FC<{ status: 'completed' | 'pending' }> = ({ status }) => {
    const statusClasses = {
        completed: 'bg-green-500',
        pending: 'bg-gray-400 dark:bg-gray-600',
    };
    return (
        <div className="w-4 h-4 rounded-full flex items-center justify-center">
             <div className={`w-3 h-3 rounded-full ${statusClasses[status]}`}></div>
        </div>
    );
};

const StepperItem: React.FC<{title: string; description: string; nodeStatus: 'completed' | 'pending'; isLast?: boolean}> = ({title, description, nodeStatus, isLast = false}) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <StepNode status={nodeStatus} />
            {!isLast && <div className="w-px h-full bg-gray-300 dark:bg-gray-600"></div>}
        </div>
        <div className="pb-8">
            <h3 className={`font-bold ${nodeStatus === 'completed' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{title}</h3>
            <p className={`text-sm ${nodeStatus === 'completed' ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>{description}</p>
        </div>
    </div>
);


const SaleDetailScreen: React.FC<SaleDetailScreenProps> = ({ sale, onBack }) => {
  // Mock status for demonstration
  const saleStatus = {
    security: 'completed',
    payment: 'completed',
    emission: 'pending',
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title="Detalhes da Venda" onBack={onBack} />
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Oferta de Venda</p>
            <p className="font-bold text-xl text-gray-900 dark:text-white">{sale.miles.toLocaleString('pt-BR')}k {sale.airline}</p>
        </div>

         <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Comprador</p>
            <div className="flex items-center mt-2">
                <img src={sale.user.avatarUrl} alt={sale.user.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{sale.user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ID da Transação: #{sale.id}</p>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Status da Transação</h3>
            <div className="relative">
                <StepperItem 
                    title="Análise de Segurança" 
                    description="Análise concluída com sucesso." 
                    nodeStatus={saleStatus.security as 'completed' | 'pending'} 
                />
                <StepperItem 
                    title="Pagamento" 
                    description="Pagamento PIX recebido." 
                    nodeStatus={saleStatus.payment as 'completed' | 'pending'} 
                />
                 <StepperItem 
                    title="Emissão da Passagem" 
                    description="Aguardando confirmação de emissão." 
                    nodeStatus={saleStatus.emission as 'completed' | 'pending'}
                    isLast={true}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailScreen;
