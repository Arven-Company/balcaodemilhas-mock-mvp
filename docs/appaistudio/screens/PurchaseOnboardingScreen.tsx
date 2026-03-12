import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import { MarketOffer } from '../types';
import { ClockIcon, CheckCircleIcon, MessageSquareIcon, QrCodeIcon } from '../components/icons/Icons';

interface PurchaseOnboardingScreenProps {
  offer: MarketOffer;
  onBack: () => void;
  onComplete: () => void;
  onChat: () => void;
  onDispute: () => void;
  step: number;
  setStep: (step: number) => void;
}

const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = ["Detalhes", "Pagamento", "Dados", "Aguardar"];
    return (
        <div className="flex items-center justify-between px-4 py-2">
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                return (
                    <React.Fragment key={stepNumber}>
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                                isActive ? 'bg-blue-600 text-white ring-2 ring-blue-400' :
                                isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            }`}>
                                {isCompleted ? <CheckCircleIcon className="w-5 h-5" /> : stepNumber}
                            </div>
                            <p className={`mt-2 text-xs font-semibold ${isActive || isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{label}</p>
                        </div>
                        {index < steps.length - 1 && <div className={`flex-grow h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

const PurchaseOnboardingScreen: React.FC<PurchaseOnboardingScreenProps> = ({ offer, onBack, onComplete, onChat, onDispute, step, setStep }) => {
  // --- New state for Step 1 ---
  const [selectedMiles, setSelectedMiles] = useState(offer.miles);
  const [numPeople, setNumPeople] = useState(1);
  const maxPeople = 5; // Example limit

  const totalPrice = useMemo(() => {
    if (!offer.pricePerThousand) return offer.totalPrice || 0;
    return (selectedMiles / 1000) * offer.pricePerThousand;
  }, [selectedMiles, offer.pricePerThousand, offer.totalPrice]);

  // --- Existing State ---
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'in_progress' | 'paid'>('pending');
  const [pixCode, setPixCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (step === 2 && paymentStatus === 'pending') {
        const randomCode = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now()).slice(0, 44);
        setPixCode(randomCode);
        setIsCopied(false);
    }
  }, [step, paymentStatus]);

  useEffect(() => {
    if (paymentStatus === 'in_progress') {
        const timer1 = setTimeout(() => {
            setPaymentStatus('paid');
            const timer2 = setTimeout(() => setStep(3), 1000);
            return () => clearTimeout(timer2);
        }, 2000);
        return () => clearTimeout(timer1);
    }
  }, [paymentStatus, setStep]);
  
  const handleBack = () => {
    if (step === 3) {
        setPaymentStatus('pending');
        setStep(2);
    } else if (step > 1) {
        setStep(step - 1);
    } else {
        onBack();
    }
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
            <div className="p-4 flex flex-col flex-grow">
                 <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Detalhes da Compra</h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                        <label htmlFor="miles-slider" className="text-sm font-medium text-gray-600 dark:text-gray-400">Quantidade de Milhas</label>
                        <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{selectedMiles.toLocaleString('pt-BR')}k</span>
                    </div>
                    <input
                        id="miles-slider"
                        type="range"
                        min="10000"
                        max={offer.miles}
                        step="1000"
                        value={selectedMiles}
                        onChange={(e) => setSelectedMiles(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
                    />
                     <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">Limite: {offer.miles.toLocaleString('pt-BR')}k milhas</p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Pessoas (CPFs)</label>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setNumPeople(p => Math.max(1, p - 1))} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 font-bold">-</button>
                            <span className="font-bold text-lg w-8 text-center">{numPeople}</span>
                            <button onClick={() => setNumPeople(p => Math.min(maxPeople, p + 1))} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 font-bold">+</button>
                        </div>
                    </div>
                     <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">Limite: {maxPeople} CPFs</p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Valor do Milheiro:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">R$ {offer.pricePerThousand?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-lg">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Valor Total:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">R$ {totalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                </div>

                 <div className="mt-auto h-64 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <p>Cláusula 1: Você, o COMPRADOR, concorda que seu pagamento será retido pela plataforma até que a passagem seja emitida pelo vendedor.</p>
                    <p>Cláusula 2: A plataforma garante a devolução do seu pagamento caso o vendedor não emita a passagem no prazo acordado.</p>
                    <p>Cláusula 3: Você se compromete a fornecer os dados corretos do passageiro via chat seguro para a emissão.</p>
                </div>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded text-blue-500 focus:ring-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Li e concordo com os Termos de Compra.</span>
                </label>
            </div>
        );
      case 2:
        if (paymentStatus === 'in_progress') {
            return (
                <div className="p-4 text-center flex flex-col items-center justify-center flex-grow">
                    <ClockIcon className="w-20 h-20 text-blue-500 dark:text-blue-400 mb-6 animate-spin" />
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Confirmando Pagamento...</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-sm">Aguarde, estamos confirmando seu pagamento PIX.</p>
                </div>
            )
        }
        if (paymentStatus === 'paid') {
            return (
                <div className="p-4 text-center flex flex-col items-center justify-center flex-grow">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mb-6" />
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Pagamento Confirmado!</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-sm">Vamos para a próxima etapa.</p>
                </div>
            )
        }
        return (
            <div className="p-4 text-center flex flex-col items-center flex-grow">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Efetue o Pagamento PIX</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
                    Use o QR Code ou o código abaixo para pagar R$ {totalPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}.
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 inline-block shadow">
                    <QrCodeIcon className="w-40 h-40 mx-auto text-gray-800 dark:text-white" />
                </div>
                <div className="w-full max-w-sm text-left bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">PIX Copia e Cola</p>
                    <p className="font-mono text-sm break-all text-gray-800 dark:text-gray-200">{pixCode}</p>
                </div>
            </div>
        );
      case 3:
        return (
             <div className="p-4 text-center flex flex-col items-center justify-center flex-grow">
                <MessageSquareIcon className="w-20 h-20 text-blue-500 dark:text-blue-400 mb-6" />
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Dados do Passageiro</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">Agora, envie os dados do passageiro para o vendedor através do nosso chat seguro. É o último passo antes da emissão!</p>
                <button onClick={onChat} className="w-full max-w-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                     Abrir Chat Seguro
                </button>
             </div>
        )
       case 4:
        return (
          <div className="p-4 text-center flex flex-col items-center justify-center flex-grow">
            <ClockIcon className="w-20 h-20 text-blue-500 dark:text-blue-400 mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Aguardando Emissão</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">O vendedor já recebeu os dados. Estamos aguardando a confirmação da emissão da passagem. Você será notificado em breve.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFooter = () => {
    switch(step) {
        case 1:
            return <button onClick={() => setStep(2)} disabled={!termsAccepted} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">Ir para Pagamento</button>;
        case 2:
            return (
                <div className="space-y-3">
                    <button onClick={handleCopy} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        {isCopied ? 'Copiado!' : 'Copiar o Pix'}
                    </button>
                    <button onClick={() => setPaymentStatus('in_progress')} disabled={paymentStatus !== 'pending'} className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600">
                        Já Efetuei o Pagamento
                    </button>
                </div>
            )
        case 3:
             return (
                <button onClick={() => setStep(4)} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500">
                    Continuar para a Próxima Etapa
                </button>
             )
        case 4:
            return (
                <div className="space-y-3">
                    <button onClick={onComplete} className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500">
                        Simular Conclusão do Vendedor
                    </button>
                    <button onClick={onDispute} className="w-full text-center bg-transparent text-red-500 dark:text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-500/10 transition-colors">
                        Abrir Disputa
                    </button>
                </div>
            );
        default:
            return null;
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title="Iniciar Compra" onBack={handleBack} />
      <Stepper currentStep={step} />
      <div className="flex-grow overflow-y-auto flex flex-col">{renderStepContent()}</div>
      {step !== 2 || paymentStatus === 'paid' || paymentStatus === 'in_progress' ? 
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            {renderFooter()}
        </div>
       :
       <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {renderFooter()}
       </div>
      }
    </div>
  );
};

export default PurchaseOnboardingScreen;