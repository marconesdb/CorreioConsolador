import React, { useState } from 'react';
import { Pin } from '../types';
import { ShareIcon, MoreHorizontal } from './Icons';

interface PinCardProps {
  pin: Pin;
  onClick: (pin: Pin) => void;
}

const PinCard: React.FC<PinCardProps> = ({ pin, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div 
      className="relative mb-4 break-inside-avoid cursor-zoom-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(pin)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-200">
        <img 
          src={pin.imageUrl} 
          alt={pin.title}
          className="w-full h-auto object-cover block transform transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-200 flex flex-col justify-between p-3">
             <div className="flex justify-between items-start">
                <span className="text-white font-medium text-sm drop-shadow-md px-2">{pin.title}</span>
                <button 
                  onClick={handleSave}
                  className={`${isSaved ? 'bg-black text-white' : 'bg-red-600 text-white'} px-4 py-3 rounded-3xl font-bold text-sm hover:opacity-90 transition-colors`}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </button>
             </div>
             
             <div className="flex justify-end space-x-2">
                <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                  <ShareIcon />
                </button>
                <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                  <MoreHorizontal />
                </button>
             </div>
          </div>
        )}
      </div>
      
      {/* Metadata below image */}
      <div className="mt-2 px-1">
         <h3 className="text-sm font-semibold text-gray-900 truncate">{pin.title}</h3>
         <div className="flex items-center mt-1">
             <img src={pin.author.avatarUrl} alt="" className="w-6 h-6 rounded-full mr-2" />
             <p className="text-xs text-gray-600 truncate">{pin.author.displayName}</p>
         </div>
      </div>
    </div>
  );
};

export default PinCard;