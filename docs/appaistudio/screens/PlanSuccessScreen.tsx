import React from 'react';
import Header from '../components/Header';
import { RocketIcon } from '../components/icons/Icons';

interface PlanSuccessScreenProps {
  planName: string;
  onDone: () => void;
}

const PlanSuccessScreen: React.FC<PlanSuccessScreenProps> = ({ planName, onDone }) => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <Header title="Sucesso!" />
      <div className="flex-grow p-6 flex flex-col items-center justify-center text-center">
        <div className="p-5 bg-white/10 rounded-full animate-scale-up mb-6">
            <RocketIcon className="w-24 h-24 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Agora você é {planName}!</h1>
        <p className="text-blue-100 max-w-sm">
          Parabéns! Você agora tem acesso a todas as vantagens exclusivas. Comece a aproveitar.
        </p>
      </div>
      <div className="p-4 m-4 border-t border-white/20">
        <button
          onClick={onDone}
          className="w-full bg-white text-blue-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Voltar para a Conta
        </button>
      </div>
    </div>
  );
};

export default PlanSuccessScreen;