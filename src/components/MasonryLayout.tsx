import React, { useState, useEffect } from 'react';
import { Pin } from '../../types';
import PinCard from './PinCard';

interface MasonryLayoutProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
}

const getNumCols = (width: number) => {
  if (width >= 1280) return 5; // xl
  if (width >= 1024) return 4; // lg
  if (width >= 768)  return 3; // md
  if (width >= 480)  return 2; // sm
  return 1;                    // xs
};

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ pins, onPinClick }) => {
  const [numCols, setNumCols] = useState(() => getNumCols(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setNumCols(getNumCols(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns: Pin[][] = Array.from({ length: numCols }, () => []);
  pins.forEach((pin, i) => columns[i % numCols].push(pin));

  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex gap-4 w-full max-w-[1800px]">
        {columns.map((colPins, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-4 min-w-0">
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