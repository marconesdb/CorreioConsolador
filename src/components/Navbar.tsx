import React, { useState } from 'react';
import { LogoIcon, SearchIcon } from './Icons';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onHomeClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  const handleHomeClick = () => {
    setSearchValue('');
    onHomeClick();
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-white z-50 px-4 flex items-center shadow-sm">
      {/* Logo */}
      <div
        className="flex items-center justify-center h-22 w-16 min-w-[58px] rounded-full cursor-pointer mr-2"
        onClick={handleHomeClick}
      >
        <LogoIcon />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-2 mr-4">
        <button
          onClick={handleHomeClick}
          className="bg-amber-100 text-black-900 hover:bg-amber-300 px-4 py-3 rounded-3xl font-semibold text-base"
        >
          Correio Consolador
        </button>
        <button
          onClick={handleHomeClick}
          className="bg-white text-black hover:bg-gray-100 px-4 py-3 rounded-3xl font-semibold text-base"
        >
          Início
        </button>
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
            placeholder="Buscar inspiração..."
            className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-gray-100 text-gray-900 text-base rounded-3xl pl-12 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Navegação */}
      <div className="flex items-center space-x-2 ml-2">
        <button
          onClick={() => navigate('/sobre-nos')}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-3xl font-semibold text-sm"
        >
          Sobre Nós
        </button>
        <button
          onClick={() => navigate('/quem-somos')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-3xl font-semibold text-sm hidden sm:block"
        >
          Quem Somos
        </button>
        <button
          onClick={() => navigate('/doacao')}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-3xl font-semibold text-sm"
        >
          <span>🤍</span> Doe Agora
        </button>
      </div>
    </div>
  );
};

export default Navbar;