import React from 'react';
import { Page } from '../types';
import { PlaneIcon, SwapIcon, TagIcon, UserIcon } from './icons/Icons';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full transition-colors ${
        isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 hover:text-blue-500 dark:hover:text-blue-400'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { page: 'emissions', label: 'Emissões', icon: <PlaneIcon className="w-6 h-6" /> },
    { page: 'counter', label: 'Balcão', icon: <SwapIcon className="w-6 h-6" /> },
    { page: 'promotions', label: 'Promoções', icon: <TagIcon className="w-6 h-6" /> },
    { page: 'account', label: 'Conta', icon: <UserIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.page}
            label={item.label}
            icon={item.icon}
            isActive={activePage === item.page}
            onClick={() => setActivePage(item.page as Page)}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;