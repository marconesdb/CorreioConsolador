import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Topo: logo + frase */}
        <div className="flex flex-col items-center text-center mb-10">
          <img
            src="/img/logo.png"
            alt="Correio Consolador"
            className="h-10 mb-3"
          />
          <p className="text-gray-500 text-sm max-w-md">
            Levando consolo, esperança e renovação interior através da palavra evangelizadora.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm font-medium text-gray-600">
          <button onClick={() => navigate('/')}          className="hover:text-red-600 transition-colors">Início</button>
          <button onClick={() => navigate('/sobre-nos')} className="hover:text-red-600 transition-colors">Sobre Nós</button>
          <button onClick={() => navigate('/quem-somos')}className="hover:text-red-600 transition-colors">Quem Somos</button>
          <button onClick={() => navigate('/doacao')}    className="hover:text-red-600 transition-colors">Faça uma Doação</button>
        </div>

        {/* Citação */}
        <div className="text-center mb-10">
          <blockquote className="italic text-gray-400 text-sm">
            "Ide e anunciai a Boa Nova."
          </blockquote>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {ano} Correio Consolador. Todos os direitos reservados.</p>
          <p>
            Desenvolvido com 🤍 por{' '}
            <span className="font-semibold text-gray-500">Marcone Silva de Brito</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;