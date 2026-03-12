import React from 'react';
import Header from '../components/Header';
import { BuildingIcon, DollarSignIcon, FileTextIcon, MegaphoneIcon, PencilIcon, SettingsIcon, TrophyIcon, TrendingUpIcon } from '../components/icons/Icons';
import { MOCK_USER } from '../constants';
import { Page } from '../types';

interface ContaScreenProps {
  onNavigate: (page: Page) => void;
}

const Badge: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <div className="flex items-center bg-yellow-400/20 text-yellow-400 dark:text-yellow-300 text-xs font-bold px-3 py-1 rounded-full">
        {icon}
        <span className="ml-1.5">{label}</span>
    </div>
);

const ActionCard: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl flex flex-col items-start justify-between aspect-square hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm dark:shadow-lg">
        {icon}
        <span className="text-base font-semibold text-gray-900 dark:text-white mt-auto">{label}</span>
    </button>
);

const ListItem: React.FC<{icon: React.ReactNode, label: string, onClick: () => void}> = ({ icon, label, onClick }) => (
    <button 
      onClick={onClick}
      className="w-full bg-gray-100 dark:bg-gray-800 text-left p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center text-gray-800 dark:text-gray-200">
      {icon}
      {label}
    </button>
);

const AdBanner: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button 
        onClick={onClick} 
        className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-xl p-4 mb-4 flex items-center space-x-4 text-left border border-blue-900/50 shadow-lg dark:shadow-blue-900/20 hover:border-blue-700 transition-all"
    >
        <div className="bg-blue-500/20 p-3 rounded-full">
            <MegaphoneIcon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
            <h3 className="font-bold text-white text-lg">Anunciar na Aba Emissões</h3>
            <p className="text-sm text-gray-400">Destaque sua oferta para mais compradores.</p>
        </div>
    </button>
);

const ContaScreen: React.FC<ContaScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full">
      <Header title="Minha Conta" />
      <div className="p-4 flex flex-col items-center">
        <div className="relative mb-4">
          <img src={MOCK_USER.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full ring-4 ring-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_USER.name}</h2>
        <p className="text-sm text-blue-500 dark:text-blue-400 font-semibold mt-1">Plano Premium+</p>
        <div className="flex items-center space-x-2 mt-3">
            <Badge icon={<BuildingIcon className="w-4 h-4" />} label="Agência" />
            <Badge icon={<TrophyIcon className="w-4 h-4" />} label="Melhor Avaliado" />
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <AdBanner onClick={() => onNavigate('create-ad')} />
        <div className="grid grid-cols-3 gap-3">
             <ActionCard 
                icon={<PencilIcon className="w-6 h-6 text-blue-500 dark:text-blue-400"/>} 
                label="Editar Perfil" 
                onClick={() => onNavigate('edit-profile')}
            />
            <ActionCard 
                icon={<DollarSignIcon className="w-6 h-6 text-blue-500 dark:text-blue-400"/>} 
                label="Minhas Vendas" 
                onClick={() => onNavigate('my-sales')}
            />
            <ActionCard 
                icon={<TrendingUpIcon className="w-6 h-6 text-blue-500 dark:text-blue-400"/>} 
                label="Ver Planos" 
                onClick={() => onNavigate('plans')}
            />
        </div>
        
        <div className="pt-6 space-y-2 flex-grow">
            <ListItem 
                icon={<FileTextIcon className="w-5 h-5 mr-4 text-gray-500 dark:text-gray-400"/>}
                label="Contrato de Intermediação"
                onClick={() => onNavigate('contract')}
            />
             <ListItem 
                icon={<SettingsIcon className="w-5 h-5 mr-4 text-gray-500 dark:text-gray-400"/>}
                label="Configurações"
                onClick={() => onNavigate('settings')}
            />
        </div>
        
        <button className="w-full text-red-500 dark:text-red-400 text-left p-4 rounded-lg hover:bg-red-500/10 dark:hover:bg-red-900/50 transition-colors mt-4">
          Sair
        </button>
      </div>
    </div>
  );
};

export default ContaScreen;