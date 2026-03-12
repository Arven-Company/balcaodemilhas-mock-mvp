import React, { useState } from 'react';
import Header from '../components/Header';

interface ContractScreenProps {
  onFinish: () => void;
  onSkip: () => void;
}

const ContractScreen: React.FC<ContractScreenProps> = ({ onFinish, onSkip }) => {
  const [step, setStep] = useState(1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contrato de Intermediação</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Para garantir a segurança de todas as transações, atuamos como intermediadores. Por favor, leia e aceite os termos para continuar.
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Termos e Condições</h2>
            <div className="h-64 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <p>Cláusula 1: O presente contrato tem por objeto a prestação de serviços de intermediação pela CONTRATADA na compra e venda de milhas aéreas entre usuários da plataforma.</p>
              <p>Cláusula 2: A CONTRATADA se compromete a reter o pagamento do comprador até que o vendedor transfira as milhas e o comprador confirme o recebimento.</p>
              <p>Cláusula 3: Em caso de disputas, a CONTRATADA atuará como mediadora para buscar uma solução justa para ambas as partes.</p>
              <p>[...] Outras cláusulas importantes sobre taxas, responsabilidades e prazos.</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Confirmação</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ao clicar em "Finalizar", você confirma que leu, compreendeu e concorda com todos os termos do Contrato de Intermediação.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title="Contrato" onBack={step > 1 ? () => setStep(step - 1) : onSkip} />
      <div className="flex-grow p-6 flex flex-col justify-between">
        <div>{renderStepContent()}</div>
        <div className="space-y-3">
          {step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors"
            >
              Próximo
            </button>
          )}
          {step === 3 && (
            <button
              onClick={onFinish}
              className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors"
            >
              Aceitar e Finalizar
            </button>
          )}
          <button
            onClick={onSkip}
            className="w-full bg-transparent text-gray-500 dark:text-gray-400 py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Pular por enquanto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractScreen;