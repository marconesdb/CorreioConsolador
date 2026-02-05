import React, { useEffect } from 'react';
import { Pin } from '../types';
import { ShareIcon, MoreHorizontal, HeartIcon, ChevronDown } from './Icons';

interface PinModalProps {
  pin: Pin;
  onClose: () => void;
}

const PinModal: React.FC<PinModalProps> = ({ pin, onClose }) => {
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[60] flex justify-center items-center overflow-y-auto p-4 sm:p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[32px] w-full max-w-[1000px] min-h-[600px] flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Image */}
        <div className="w-full md:w-1/2 bg-gray-100">
          <img 
            src={pin.imageUrl.replace('/400/', '/800/')} // Higher res for modal
            alt={pin.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col h-[600px]">
           <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10">
              <div className="flex space-x-2">
                 <button className="p-3 hover:bg-gray-100 rounded-full">
                   <MoreHorizontal />
                 </button>
                 <button className="p-3 hover:bg-gray-100 rounded-full">
                   <ShareIcon />
                 </button>
              </div>
              <div className="flex space-x-2">
                 <div className="flex items-center px-4 py-3 hover:bg-gray-100 rounded-3xl cursor-pointer font-semibold text-base">
                   Profile <ChevronDown />
                 </div>
                 <button className="bg-red-600 text-white px-6 py-3 rounded-3xl font-bold hover:bg-red-700 transition-colors">
                   Save
                 </button>
              </div>
           </div>

           <div className="flex-grow overflow-y-auto no-scrollbar">
             <a href="#" className="text-sm underline decoration-1 hover:no-underline mb-2 block">
               generated-content.com
             </a>
             <h1 className="text-3xl font-bold text-gray-900 mb-4">{pin.title}</h1>
             <p className="text-gray-700 mb-6">{pin.description}</p>

             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <img src={pin.author.avatarUrl} alt="" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold text-sm">{pin.author.displayName}</p>
                    <p className="text-xs text-gray-500">{pin.author.followers} followers</p>
                  </div>
                </div>
                <button className="bg-gray-200 px-4 py-2 rounded-3xl font-semibold text-sm hover:bg-gray-300">
                  Follow
                </button>
             </div>

             <div className="border-t border-gray-200 pt-6">
               <h3 className="text-lg font-semibold mb-4">Comments</h3>
               <p className="text-gray-500 text-sm">No comments yet! Add one to start the conversation.</p>
             </div>
             
             <div className="mt-4 flex flex-wrap gap-2">
                {pin.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">#{tag}</span>
                ))}
             </div>
           </div>

           <div className="border-t border-gray-200 pt-4 mt-auto bg-white flex items-center justify-between">
              <h4 className="font-semibold text-lg">What do you think?</h4>
              <div className="flex items-center space-x-2">
                 <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                   <HeartIcon filled={false} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PinModal;