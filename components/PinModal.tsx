import React, { useEffect } from 'react';

// Ícone de Download
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

// Ícone de Fechar
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: {
    displayName: string;
    avatarUrl: string;
    followers: number;
  };
  tags: string[];
}

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

  // Função para fazer download da imagem
  const handleDownload = async () => {
    try {
      const response = await fetch(pin.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image-${pin.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar imagem:', error);
      // Fallback: abrir em nova aba
      window.open(pin.imageUrl, '_blank');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[60] flex justify-center items-center overflow-y-auto p-4 sm:p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[32px] w-full max-w-[1000px] min-h-[600px] flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar no canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Fechar"
        >
          <CloseIcon />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
          <img 
            src={pin.imageUrl.replace('/400/', '/800/')} // Higher res for modal
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Apenas botão de Download */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
           <button 
             onClick={handleDownload}
             className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
           >
             <DownloadIcon />
             Baixar Imagem
           </button>
           
           <p className="text-gray-400 text-sm mt-6">Clique para fazer o download</p>
        </div>
      </div>
    </div>
  );
};

export default PinModal;