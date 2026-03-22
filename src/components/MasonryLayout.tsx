import React from 'react';
import { Pin } from '../types';
import PinCard from './PinCard';

interface MasonryLayoutProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ pins, onPinClick }) => {
  // Distribui os pins em 5 colunas fixas
  const NUM_COLS = 5;
  const columns: Pin[][] = Array.from({ length: NUM_COLS }, () => []);
  pins.forEach((pin, i) => columns[i % NUM_COLS].push(pin));

  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex gap-4 w-full max-w-[1800px]">
        {columns.map((colPins, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-4">
            {colPins.map((pin) => (
              <PinCard key={pin.id} pin={pin} onClick={onPinClick} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryLayout;