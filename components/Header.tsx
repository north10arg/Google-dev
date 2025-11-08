import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CoinIcon, FocaListLogo, StoreIcon } from './icons';

interface HeaderProps {
    onShopClick: () => void;
}

const Header = ({ onShopClick }: HeaderProps) => {
  const { user, coins } = useAppContext();

  return (
    <header className="bg-surface rounded-xl shadow-md p-4 flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <FocaListLogo />
        <h1 className="text-xl font-bold text-text-primary hidden sm:block">FocaList</h1>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="text-text-secondary hidden md:block">Olá, <span className="font-semibold text-text-primary">{user?.name}</span></span>
        <div className="flex items-center gap-2 bg-amber-100 text-amber-800 font-semibold px-3 py-1.5 rounded-full">
            <CoinIcon className="text-amber-500"/>
            <span>{coins}</span>
        </div>
        <button 
          onClick={onShopClick}
          className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
        >
            <StoreIcon />
            <span className="hidden sm:block">Loja</span>
        </button>
      </div>
    </header>
  );
};

export default Header;