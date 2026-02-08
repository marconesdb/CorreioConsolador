import React, { useState } from 'react';

// Ícones simplificados
const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const MoreHorizontal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

interface Pin {
  id: string;
  title: string;
  imageUrl: string;
  author: {
    displayName: string;
    avatarUrl: string;
  };
}

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
      
      {/* Metadata removida - sem título e autor */}
    </div>
  );
};

export default PinCard;