import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import MasonryLayout from './components/MasonryLayout';
import PinModal from './components/PinModal';
import UserProfile from './components/UserProfile';
import { Pin, User } from './types';
import { generatePinIdeas } from './services/geminiService';

// Define a Current User
const CURRENT_USER: User = {
  id: 'u1',
  username: 'frontend_wizard',
  displayName: 'Frontend Wizard',
  bio: 'Building beautiful interfaces with React & Tailwind.',
  avatarUrl: 'https://picsum.photos/seed/user123/200/200',
  followers: 240,
  following: 15
};

const App = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [user, setUser] = useState<User | null>(null); // Null = not logged in
  const [view, setView] = useState<'home' | 'profile'>('home');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initial Load
  useEffect(() => {
    handleSearch('Nature Photography');
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setIsSearching(true);
    setLoading(true);
    // Clear current pins to show loading state clearly or keep them and append? 
    // Pinterest usually keeps them until new ones load, but for this demo we clear to show Gemini working.
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
      
      {/* Login Notification (Toast-ish) */}
      {!user && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold z-40">
          Log in to save ideas!
        </div>
      )}
    </div>
  );
};

export default App;