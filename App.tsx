import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate('/');
  };

  const handleHomeClick = () => {
    setSearchQuery('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar
        onSearch={handleSearch}
        onHomeClick={handleHomeClick}
      />
      <main className="pt-24 pb-12 flex-1">
        <Outlet context={{ searchQuery, setSearchQuery }} />
      </main>
      <Footer/>
    </div>
  );
};

export default App;