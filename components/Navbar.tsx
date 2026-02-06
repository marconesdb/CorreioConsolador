import React, { useState } from 'react';
import { LogoIcon, SearchIcon, BellIcon, MessageIcon, ChevronDown } from './Icons';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onSearch: (query: string) => void;
  onLoginClick: () => void;
  onHomeClick: () => void;
  onProfileClick: () => void;
  isSearching: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSearch, onLoginClick, onHomeClick, onProfileClick, isSearching }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-white z-50 px-4 flex items-center shadow-sm">
      {/* Logo */}
      <div 
        className="flex items-center justify-center h-22 w-16 min-w-[58px] rounded-full  cursor-pointer mr-2"
        onClick={onHomeClick}
      >
        <LogoIcon />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-2 mr-4">
        <button onClick={onHomeClick} className="bg-amber-100 text-black-900 hover:bg-amber-300 px-4 py-3 rounded-3xl font-semibold text-base">Correio Consolador</button>
        <button className="bg-white text-black hover:bg-gray-100 px-4 py-3 rounded-3xl font-semibold text-base">Home</button>
      </div>

      {/* Search Bar */}
      <div className="flex-grow mx-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isSearching ? "Dreaming up ideas..." : "Search for inspiration"}
            className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-gray-100 text-gray-900 text-base rounded-3xl pl-12 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
            disabled={isSearching}
          />
        </div>
      </div>

      {/* User Actions */}
      {user ? (
        <div className="flex items-center space-x-1 ml-2">
          <button className="p-3 hover:bg-gray-100 rounded-full relative">
             <BellIcon />
             <span className="absolute top-2 right-2 h-4 w-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">3</span>
          </button>
          <button className="p-3 hover:bg-gray-100 rounded-full">
             <MessageIcon />
          </button>
          <button 
            onClick={onProfileClick}
            className="h-12 w-12 flex items-center justify-center hover:bg-gray-100 rounded-full ml-1"
          >
            <img src={user.avatarUrl} alt="Profile" className="h-6 w-6 rounded-full object-cover" />
          </button>
           <button className="p-1 hover:bg-gray-100 rounded-full">
             <ChevronDown />
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2 ml-2">
           <button 
            onClick={onLoginClick}
            className="bg-red-600 text-purple-900 hover:bg-red-500 text-white px-4 py-2 rounded-3xl font-semibold text-sm"
          >
         Sobre Nós
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-3xl font-semibold text-sm hidden sm:block">
         Quem Somos
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;