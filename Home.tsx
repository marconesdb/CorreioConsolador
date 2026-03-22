import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import MasonryLayout from './src/components/MasonryLayout';
import PinModal from './src/components/PinModal';
import { Pin } from './types';

type OutletContext = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

const INITIAL_PINS: Pin[] = [
  { id: '1',  title: 'Fracasso, Queda, Insucesso, Inteligente',                     description: 'Fracasso, Queda, Insucesso, Inteligente',                                   imageUrl: '/img/msg-01.png', width: 400, height: 500, tags: ['tag1', 'tag2'] },
  { id: '2',  title: 'Autoperdão, Amadurecimento, Reflexões, Atitude, Desculpar, Próximo', description: 'Autoperdão, Amadurecimento, Reflexões, Atitude, Desculpar, Próximo', imageUrl: '/img/msg-02.png', width: 400, height: 550, tags: ['tag2', 'tag3'] },
  { id: '3',  title: 'Perdão, Higiene',                                             description: 'Perdão, Higiene',                                                       imageUrl: '/img/msg-03.png', width: 400, height: 700, tags: ['tag1', 'tag3'] },
  { id: '4',  title: 'Egoísmo',                                                     description: 'Egoísmo',                                                     imageUrl: '/img/msg-04.png', width: 400, height: 650, tags: ['tag1', 'tag2', 'tag3'] },
  { id: '5',  title: 'Batalha, Luta',                                               description: 'Batalha, Luta',                                               imageUrl: '/img/msg-05.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '6',  title: 'Humildade, Caridade',                                         description: 'Humildade, Caridade',                                         imageUrl: '/img/msg-06.png', width: 400, height: 500, tags: ['tag1', 'tag2'] },
  { id: '7',  title: 'Trabalho, Esforço, Cooperação',                               description: 'Trabalho, Esforço, Cooperação',                               imageUrl: '/img/msg-07.png', width: 400, height: 550, tags: ['tag2', 'tag3'] },
  { id: '8',  title: 'Pensamento, Pensamentos, Imaginação',                         description: 'Pensamento, Pensamentos, Imaginação',                         imageUrl: '/img/msg-08.png', width: 400, height: 700, tags: ['tag1', 'tag3'] },
  { id: '9',  title: 'Justiça, Vingança, Amor',                                     description: 'Justiça, Vingança, Amor',                                     imageUrl: '/img/msg-09.png', width: 400, height: 650, tags: ['tag1', 'tag2', 'tag3'] },
  { id: '10', title: 'Riqueza, Felicidade, Ouro, Perfume, Misericórdia, Paz, Luz',  description: 'Riqueza, Felicidade, Ouro, Perfume, Misericórdia, Paz, Luz',  imageUrl: '/img/msg-10.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '11', title: 'Humilhação, Discórdia, Crueldade, Pertubação, Elevação, Senhor, Deus',  description: 'Humilhação, Discórdia, Crueldade, Pertubação, Elevação, Senhor, Deus',  imageUrl: '/img/msg-11.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '12', title: 'Auxílio, Céu, Amparo, Caminho',  description: 'Auxílio, Céu, Amparo, Caminho',  imageUrl: '/img/msg-12.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '13', title: 'Colaboradores, Cooperadores, Professores',  description: 'Colaboradores, Cooperadores, Professores',  imageUrl: '/img/msg-13.png', width: 400, height: 480, tags: ['tag2'] },
  


];

const Home = () => {
  const { searchQuery, setSearchQuery } = useOutletContext<OutletContext>();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  const filteredPins = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return INITIAL_PINS;
    return INITIAL_PINS.filter(pin =>
      pin.title.toLowerCase().includes(term)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
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