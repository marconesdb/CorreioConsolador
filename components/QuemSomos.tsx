// pages/QuemSomos.tsx
import React from 'react';

const QuemSomos: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-800 leading-relaxed text-justify">
      <h1 className="text-3xl font-bold text-center mb-6">Quem Somos</h1>
      
      <p className="mb-4">
        O <span className="font-semibold">Correio Consolador</span> foi idealizado e desenvolvido por <span className="font-semibold">Marcone Silva de Brito</span>, espírita, voluntário e estudioso das ciências humanas, tecnológicas e espirituais, movido pelo desejo de contribuir de forma concreta para a divulgação de mensagens consoladoras, educativas e evangelizadoras, à luz dos princípios do Evangelho e da Doutrina Espírita.
      </p>

      <p className="mb-4">
        A iniciativa surge da compreensão de que todo conhecimento, quando aliado ao amor e à caridade, transforma-se em instrumento de serviço ao bem. Nesse sentido, o projeto integra tecnologia, comunicação e espiritualidade, utilizando os recursos digitais como meios legítimos de propagação da esperança, da fé esclarecida e do consolo moral.
      </p>

      <p className="mb-4">
        Como voluntário, Marcone Silva de Brito dedica-se à produção, curadoria e organização dos conteúdos publicados, buscando sempre fidelidade doutrinária, profundidade reflexiva, clareza textual e elevação moral, respeitando a diversidade de crenças e valorizando os princípios universais da fraternidade humana.
      </p>

      <p className="mb-4">
        O Correio Consolador não se apresenta como espaço de autoridade espiritual, mas como canal fraterno de partilha, aprendizado contínuo e serviço desinteressado, inspirado na máxima evangélica:
      </p>

      <blockquote className="italic text-center text-lg font-medium text-gray-700 mb-6">
        “Ide e anunciai a Boa Nova.”
      </blockquote>

      <p className="mb-4">
        Assim, cada publicação é concebida como um convite à reflexão, à transformação íntima e ao despertar da consciência, fortalecendo a fé, restaurando esperanças e auxiliando na construção de uma sociedade mais justa, solidária e espiritualmente consciente.
      </p>
    </div>
  );
};

export default QuemSomos;
