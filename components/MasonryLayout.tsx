import React from 'react';
import { Pin } from '../types';
import PinCard from './PinCard';

interface MasonryLayoutProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ pins, onPinClick }) => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 mx-auto w-full max-w-[1800px] px-4">
      {pins.map((pin) => (
        <PinCard key={pin.id} pin={pin} onClick={onPinClick} />
      ))}
    </div>
  );
};

export default MasonryLayout;