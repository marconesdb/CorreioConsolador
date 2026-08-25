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
  { id: '14',  title: 'Escola, Aluno, Aprendiz',                     description: 'Escola, Aluno, Aprendiz',                                   imageUrl: '/img/msg-14.png', width: 400, height: 500, tags: ['tag1', 'tag2'] },
  { id: '15',  title: 'Vigilância', description: 'Vigilância', imageUrl: '/img/msg-15.png', width: 400, height: 550, tags: ['tag2', 'tag3'] },
  { id: '16',  title: 'Paz',   description: 'Paz',                                                       imageUrl: '/img/msg-16.png', width: 400, height: 700, tags: ['tag1', 'tag3'] },
  { id: '17',  title: 'Vencer, Vitória',     description: 'Vencer, Vitória',                                                     imageUrl: '/img/msg-17.png', width: 400, height: 650, tags: ['tag1', 'tag2', 'tag3'] },
  { id: '18',  title: 'Riqueza, Tesouro, Dinheiro',     description: 'Riqueza, Tesouro, Dinheiro',                                               imageUrl: '/img/msg-18.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '19',  title: 'Respeito',    description: 'Respeito',                                         imageUrl: '/img/msg-19.png', width: 400, height: 500, tags: ['tag1', 'tag2'] },
  { id: '20',  title: 'Desânimo',    description: 'Desânimo',   imageUrl: '/img/msg-20.png', width: 400, height: 550, tags: ['tag2', 'tag3'] },
  { id: '21',  title: 'Amai-vos',    description: 'Amai-vos',   imageUrl: '/img/msg-21.png', width: 400, height: 700, tags: ['tag1', 'tag3'] },
  { id: '22',  title: 'Ensina-nos',   description: 'Aprendizado', imageUrl: '/img/msg-22.png', width: 400, height: 650, tags: ['tag1', 'tag2', 'tag3'] },
  { id: '23', title: 'Luz Divina',  description: 'Luz Divina',  imageUrl: '/img/msg-23.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '24', title: 'Benção',  description: 'Benção, Amizade, Amigo, Amor',  imageUrl: '/img/msg-24.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '25', title: 'Amor',  description: 'Ciência, Amor',  imageUrl: '/img/msg-25.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '26', title: 'Cooperação',  description: 'Trabalho, Auxilio',  imageUrl: '/img/msg-26.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '27', title: 'Humildade',  description: 'Humildade',  imageUrl: '/img/msg-27.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '28', title: 'Prazer',  description: 'Prazer',  imageUrl: '/img/msg-28.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '29', title: 'Caridade',  description: 'Caridade',  imageUrl: '/img/msg-29.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '30', title: 'Bens Materiais',  description: 'Bens Materiais',  imageUrl: '/img/msg-30.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '31', title: 'Dinheiro',  description: 'Dinheiro',  imageUrl: '/img/msg-31.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '32', title: 'Bondade',  description: 'Bondade',  imageUrl: '/img/msg-32.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '33', title: 'Leis',  description: 'Leis',  imageUrl: '/img/msg-33.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '34', title: 'Paciência',  description: 'Paciência',  imageUrl: '/img/msg-34.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '35', title: 'Problemas',  description: 'Problemas',  imageUrl: '/img/msg-35.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '36', title: 'Problema',  description: 'Problema',  imageUrl: '/img/msg-36.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '37', title: 'Alegria',  description: 'Alegria',  imageUrl: '/img/msg-37.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '38', title: 'Providência',  description: 'Providência',  imageUrl: '/img/msg-38.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '39', title: 'Se',  description: 'Se',  imageUrl: '/img/msg-39.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '40', title: 'Pensamentos',  description: 'Pensamentos',  imageUrl: '/img/msg-40.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '41', title: 'Felicidade',  description: 'Felicidade',  imageUrl: '/img/msg-41.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '42', title: 'Irritação',  description: 'Irritação',  imageUrl: '/img/msg-42.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '43', title: 'Benção',  description: 'Benção',  imageUrl: '/img/msg-43.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '44', title: 'Trabalho',  description: 'Trabalho',  imageUrl: '/img/msg-44.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '45', title: 'Dúvidas',  description: 'Dúvidas',  imageUrl: '/img/msg-45.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '46', title: 'Problemas',  description: 'Problemas',  imageUrl: '/img/msg-46.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '47', title: 'Gratidão',  description: 'Gratidão',  imageUrl: '/img/msg-47.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '48', title: 'Auxílio',  description: 'Auxílio',  imageUrl: '/img/msg-48.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '49', title: 'Evangelho',  description: 'Evangelho',  imageUrl: '/img/msg-49.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '50', title: 'Coragem',  description: 'Coragem',  imageUrl: '/img/msg-50.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '51', title: 'Semeadura',  description: 'Semeadura',  imageUrl: '/img/msg-51.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '52', title: 'Providência',  description: 'Providência',  imageUrl: '/img/msg-52.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '53', title: 'Lutas',  description: 'Lutas',  imageUrl: '/img/msg-53.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '54', title: 'Coração',  description: 'Coração',  imageUrl: '/img/msg-54.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '55', title: 'Paz',  description: 'Paz',  imageUrl: '/img/msg-55.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '56', title: 'Luz',  description: 'Luz',  imageUrl: '/img/msg-56.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '57', title: 'Confiança',  description: 'Confiança',  imageUrl: '/img/msg-57.png', width: 400, height: 480, tags: ['tag2'] },
  { id: '58', title: 'Auxílio',  description: 'Auxílio',  imageUrl: '/img/msg-58.png', width: 400, height: 480, tags: ['tag2'] },
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