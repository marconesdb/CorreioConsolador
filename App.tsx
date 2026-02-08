// App.tsx
import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        user={null} 
        onSearch={() => {}} 
        onLoginClick={() => {}} 
        onHomeClick={() => {}} 
        onProfileClick={() => {}} 
        isSearching={false} 
      />
      <main className="pt-24 pb-12">
        <Outlet /> {/* Aqui entram Home, SobreNos, QuemSomos */}
      </main>
    </div>
  );
};

export default App;
