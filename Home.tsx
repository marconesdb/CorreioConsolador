import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import MasonryLayout from './components/MasonryLayout';
import PinModal from './components/PinModal';
import { Pin } from './types';

const INITIAL_PINS: Pin[] = [
  { id: '1', title: 'Fracasso',   description: 'Fracasso, queda, insucesso', imageUrl: '/img/msg-01.png', width: 400, height: 500, tags: ['tag1', 'tag2'] },
  { id: '2', title: 'Autoperdão', description: 'Autoperdão',                 imageUrl: '/img/msg-02.png', width: 400, height: 550, tags: ['tag2', 'tag3'] },
  { id: '3', title: 'Perdão',     description: 'Perdão',                     imageUrl: '/img/msg-03.png', width: 400, height: 700, tags: ['tag1', 'tag3'] },
  { id: '4', title: 'Egoísmo',   description: 'Egoísmo',                    imageUrl: '/img/msg-04.png', width: 400, height: 650, tags: ['tag1', 'tag2', 'tag3'] },
  { id: '5', title: 'Batalha',   description: 'Batalha',                    imageUrl: '/img/msg-05.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '6', title: 'Fracasso',   description: 'Fracasso, queda, insucesso', imageUrl: '/img/msg-06.png', width: 400, height: 500, tags: ['tag1', 'tag2'] },
  { id: '7', title: 'Autoperdão', description: 'Autoperdão',                 imageUrl: '/img/msg-07.png', width: 400, height: 550, tags: ['tag2', 'tag3'] },
  { id: '8', title: 'Perdão',     description: 'Perdão',                     imageUrl: '/img/msg-08.png', width: 400, height: 700, tags: ['tag1', 'tag3'] },
  { id: '9', title: 'Egoísmo',   description: 'Egoísmo',                    imageUrl: '/img/msg-09.png', width: 400, height: 650, tags: ['tag1', 'tag2', 'tag3'] },
  { id: '10', title: 'Batalha',   description: 'Batalha',                    imageUrl: '/img/msg-10.png', width: 400, height: 480, tags: ['tag2'] },
];

const Home = () => {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPins = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return INITIAL_PINS;
    return INITIAL_PINS.filter(pin =>
      pin.title.toLowerCase().includes(term)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onSearch={setSearchQuery}
        onHomeClick={() => setSearchQuery('')}
      />

      <main className="pt-24 pb-12">
        {filteredPins.length > 0 ? (
          <MasonryLayout pins={filteredPins} onPinClick={setSelectedPin} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-lg font-medium">Nenhuma mensagem encontrada para "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Limpar busca
            </button>
          </div>
        )}
      </main>

      {selectedPin && (
        <PinModal pin={selectedPin} onClose={() => setSelectedPin(null)} />
      )}
    </div>
  );
};

export default Home;