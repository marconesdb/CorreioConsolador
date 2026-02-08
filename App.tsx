import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import MasonryLayout from './components/MasonryLayout';
import PinModal from './components/PinModal';
import UserProfile from './components/UserProfile';
import { Pin, User } from './types';
import { generatePinIdeas } from './services/geminiService';

// ✅ CURRENT_USER - APENAS UMA VEZ!
const CURRENT_USER: User = {
  id: 'u1',
  username: 'frontend_wizard',
  displayName: 'Frontend Wizard',
  bio: 'Building beautiful interfaces with React & Tailwind.',
  avatarUrl: 'https://picsum.photos/seed/user123/200/200',
  followers: 240,
  following: 15
};

// ✅ INITIAL_PINS - Logo depois
const INITIAL_PINS: Pin[] = [
  {
    id: '1',
    title: 'Minha Imagem 1',
    description: 'Descrição da imagem',
    imageUrl: 'https://picsum.photos/seed/image1/400/500',
    author: CURRENT_USER,
    width: 400,
    height: 500,
    tags: ['tag1', 'tag2']
  },
  {
    id: '2',
    title: 'Minha Imagem 2',
    description: 'Descrição da imagem',
    imageUrl: 'https://picsum.photos/seed/image2/400/600',
    author: CURRENT_USER,
    width: 400,
    height: 600,
    tags: ['tag1']
  },
  {
    id: '3',
    title: 'Minha Imagem 3',
    description: 'Descrição da imagem',
    imageUrl: 'https://picsum.photos/seed/image3/400/550',
    author: CURRENT_USER,
    width: 400,
    height: 550,
    tags: ['tag2', 'tag3']
  },
  {
    id: '4',
    title: 'Minha Imagem 4',
    description: 'Descrição da imagem',
    imageUrl: 'https://picsum.photos/seed/image4/400/700',
    author: CURRENT_USER,
    width: 400,
    height: 700,
    tags: ['tag1', 'tag3']
  },
  {
    id: '5',
    title: 'Minha Imagem 5',
    description: 'Descrição da imagem',
    imageUrl: '/img/logo.png',
    author: CURRENT_USER,
    width: 400,
    height: 480,
    tags: ['tag2']
  },
  {
    id: '6',
    title: 'Minha Imagem 6',
    description: 'Descrição da imagem',
    imageUrl: 'https://picsum.photos/seed/image6/400/650',
    author: CURRENT_USER,
    width: 400,
    height: 650,
    tags: ['tag1', 'tag2', 'tag3']
  }
];

const App = () => {
  const [pins, setPins] = useState<Pin[]>(INITIAL_PINS);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'profile'>('home');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔍 DEBUG
  useEffect(() => {
    console.log('📌 Total de pins:', pins.length);
    console.log('📌 Pins completos:', pins);
  }, [pins]);

  // ❌ COMENTADO - Não buscar do Gemini
  /*
  useEffect(() => {
    handleSearch('Nature Photography');
  }, []);
  */

  const handleSearch = useCallback(async (query: string) => {
    setIsSearching(true);
    setLoading(true);
    setPins([]);
    
    const newPins = await generatePinIdeas(query);
    setPins(newPins);
    setLoading(false);
    setIsSearching(false);
    setView('home');
  }, []);

  const toggleAuth = () => {
    if (user) setUser(null);
    else setUser(CURRENT_USER);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        user={user} 
        onSearch={handleSearch} 
        onLoginClick={toggleAuth} 
        onHomeClick={() => setView('home')}
        onProfileClick={() => setView('profile')}
        isSearching={isSearching}
      />

      <main className="pt-24 pb-12">
        {view === 'home' && (
          <>
            {loading ? (
               <div className="flex flex-col items-center justify-center h-64 space-y-4">
                 <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-gray-500 font-medium animate-pulse">Curating ideas with Gemini...</p>
               </div>
            ) : (
              <MasonryLayout pins={pins} onPinClick={setSelectedPin} />
            )}
          </>
        )}

        {view === 'profile' && user && (
          <UserProfile user={user} />
        )}

        {view === 'profile' && !user && (
          <div className="flex flex-col items-center justify-center h-[50vh]">
             <h2 className="text-2xl font-bold mb-4">Login to see your profile</h2>
             <button onClick={toggleAuth} className="bg-red-600 text-white px-6 py-3 rounded-3xl font-bold">Log In</button>
          </div>
        )}
      </main>

      {selectedPin && (
        <PinModal pin={selectedPin} onClose={() => setSelectedPin(null)} />
      )}
      
      
     
    </div>
  );
};

export default App;