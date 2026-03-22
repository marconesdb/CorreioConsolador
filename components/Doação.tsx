import React, { useState } from 'react';

const Doacao: React.FC = () => {
  const [copiado, setCopiado] = useState(false);

  const chavePix = '00020126690014br.gov.bcb.pix0136f3204052-2ea5-4b63-b565-3f5836db57cc0207Doacoes5204000053039865802BR5922MARCONE SILVA DE BRITO6013MONTES CLAROS62080504Doao63042983'; // ← substitua pela chave PIX real

  const copiarPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">

      {/* Cabeçalho */}
      <div className="text-center mb-10">
        <span className="text-5xl">🤍</span>
        <h1 className="text-3xl font-bold mt-4 mb-3">Apoie o Correio Consolador</h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto">
          Uma obra voluntária, sustentada pela fé e pela generosidade de pessoas como você.
        </p>
      </div>

      {/* Mensagem principal */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-justify leading-relaxed">
        <p className="mb-4">
          O <span className="font-semibold">Correio Consolador</span> é um projeto inteiramente voluntário,
          idealizado e mantido por <span className="font-semibold">Marcone Silva de Brito</span> com o propósito
          sincero de levar consolo, esperança e reflexão espiritual a quem mais precisa.
        </p>
        <p className="mb-4">
          Cada mensagem publicada representa horas de dedicação, pesquisa e cuidado — um serviço
          desinteressado, inspirado nos valores do amor ao próximo, da caridade moral e da fraternidade
          humana, à luz do Evangelho de Jesus e da Doutrina Espírita.
        </p>
        <p>
          Para que esta obra continue alcançando corações aflitos e espíritos em renovação,
          precisamos manter o site no ar. Os custos de hospedagem, domínio e infraestrutura digital
          são reais — e é aqui que <span className="font-semibold">você pode fazer a diferença</span>.
        </p>
      </div>

      {/* O que sua doação sustenta */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-center">Sua doação ajuda a manter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { icone: '🌐', titulo: 'Hospedagem', descricao: 'Servidor e domínio do site no ar' },
            { icone: '📖', titulo: 'Conteúdo', descricao: 'Produção de mensagens e reflexões' },
            { icone: '💌', titulo: 'Alcance', descricao: 'Chegar a mais pessoas que precisam' },
          ].map((item) => (
            <div key={item.titulo} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-3xl mb-2">{item.icone}</div>
              <div className="font-semibold text-gray-800 mb-1">{item.titulo}</div>
              <div className="text-gray-500 text-sm">{item.descricao}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PIX */}
      <div className="bg-white border-2 border-green-400 rounded-2xl p-6 mb-6 text-center shadow-sm">
        <h2 className="text-xl font-bold mb-1">Doe via PIX</h2>
        <p className="text-gray-500 text-sm mb-5">Rápido, seguro e sem taxas</p>

        <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3 mb-4">
          <span className="text-gray-700 font-mono text-sm break-all">{chavePix}</span>
          <button
            onClick={copiarPix}
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl whitespace-nowrap transition-colors"
          >
            {copiado ? '✓ Copiado!' : 'Copiar'}
          </button>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center my-4">
    
            <img
                src="/img/qrcode-pix.png"
                alt="QR Code PIX para doação"
                className="w-48 h-48 object-contain rounded-xl border border-gray-200 bg-white p-2"
                onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                }}
            />
            

          <p className="text-gray-400 text-xs mt-2">Aponte a câmera do celular para o QR Code</p>
        </div>

        <p className="text-gray-400 text-xs">
          Qualquer valor é bem-vindo e representa um gesto de amor e caridade.
        </p>
      </div>

      {/* Citação */}
      <blockquote className="text-center text-gray-500 italic text-base border-t border-gray-100 pt-8 mt-4">
        "Todo conhecimento, quando aliado ao amor e à caridade,<br />
        transforma-se em instrumento de serviço ao bem."
      </blockquote>
      <p className="text-center text-gray-400 text-sm mt-2">— Correio Consolador</p>

    </div>
  );
};

export default Doacao;