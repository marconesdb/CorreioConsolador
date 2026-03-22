import React, { useState } from 'react';

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
}

interface PinCardProps {
  pin: Pin;
  onClick: (pin: Pin) => void;
}

const PinCard: React.FC<PinCardProps> = ({ pin, onClick }) => {
  const [isHovered, setIsHovered]     = useState(false);
  const [shareMsg, setShareMsg]       = useState('');
  const [menuOpen, setMenuOpen]       = useState(false);

  const shareUrl  = `${window.location.origin}/?q=${encodeURIComponent(pin.title.split(',')[0].trim())}`;
  const shareText = `"${pin.title}" — Correio Consolador`;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Web Share API — abre menu nativo no celular
    if (navigator.share) {
      try {
        await navigator.share({ title: pin.title, text: shareText, url: shareUrl });
      } catch (_) {
        // usuário cancelou — sem erro
      }
    } else {
      // Fallback desktop: copia link
      await navigator.clipboard.writeText(shareUrl);
      setShareMsg('Link copiado!');
      setTimeout(() => setShareMsg(''), 2500);
    }
  };

  const handleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(prev => !prev);
  };

  const handleCopyImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    await navigator.clipboard.writeText(`${window.location.origin}${pin.imageUrl}`);
    setShareMsg('Link da imagem copiado!');
    setTimeout(() => setShareMsg(''), 2500);
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    await navigator.clipboard.writeText(shareUrl);
    setShareMsg('Link copiado!');
    setTimeout(() => setShareMsg(''), 2500);
  };

  return (
    <div
      className="relative mb-4 break-inside-avoid cursor-zoom-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMenuOpen(false); }}
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
            <div className="flex justify-end space-x-2 relative">

              {/* Botão Compartilhar */}
              <button
                onClick={handleShare}
                className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                title="Compartilhar"
              >
                <ShareIcon />
              </button>

              {/* Botão Menu */}
              <button
                onClick={handleMenu}
                className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                title="Mais opções"
              >
                <MoreHorizontal />
              </button>

              {/* Dropdown do menu */}
              {menuOpen && (
                <div
                  className="absolute top-10 right-0 bg-white rounded-2xl shadow-xl z-50 overflow-hidden min-w-[180px]"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                  >
                    🔗 Copiar link da mensagem
                  </button>
                  <button
                    onClick={handleCopyImage}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                  >
                    🖼️ Copiar link da imagem
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast de confirmação */}
      {shareMsg && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap z-50">
          {shareMsg}
        </div>
      )}
    </div>
  );
};

export default PinCard;