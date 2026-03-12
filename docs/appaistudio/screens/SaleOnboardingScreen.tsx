import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { MarketOffer } from '../types';
import { ClockIcon, CheckCircleIcon, MessageSquareIcon } from '../components/icons/Icons';

interface EmissionDetails {
    reservationCode: string;
    flightInfo: string;
    flightDate: string;
}

interface SaleOnboardingScreenProps {
  offer: MarketOffer;
  onBack: () => void;
  onComplete: (details: EmissionDetails) => void;
  onChat: () => void;
  onDispute: () => void;
  step: number;
  setStep: (step: number) => void;
}

const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = ["Termos", "Aguardar", "Venda"];
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

const StepNode: React.FC<{ status: 'completed' | 'active' | 'pending' }> = ({ status }) => {
    const statusClasses = {
        completed: 'bg-green-500',
        active: 'bg-blue-500 ring-4 ring-blue-500/30',
        pending: 'bg-gray-400 dark:bg-gray-600',
    };
    return (
        <div className={`w-4 h-4 rounded-full transition-colors`}>
             <div className={`w-full h-full rounded-full ${statusClasses[status]}`}></div>
        </div>
    );
};

const EmissionDetailsModal: React.FC<{
    onSave: (details: EmissionDetails) => void;
    onCancel: () => void;
    initialDetails?: EmissionDetails;
}> = ({ onSave, onCancel, initialDetails }) => {
    const [details, setDetails] = useState(
        initialDetails && initialDetails.reservationCode
        ? initialDetails
        : {
            reservationCode: '',
            flightInfo: 'São Paulo (GRU) -> Frankfurt (FRA)',
            flightDate: '25/09/2025 - Voo LH507',
        }
    );

    const handleSave = () => {
        if (details.reservationCode.trim() && details.flightInfo.trim() && details.flightDate.trim()) {
            onSave(details);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-30 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl p-6 animate-scale-up" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Detalhes da Emissão</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Código da Reserva</label>
                        <input
                            type="text"
                            value={details.reservationCode}
                            onChange={(e) => setDetails({ ...details, reservationCode: e.target.value.toUpperCase() })}
                            placeholder="ABCXYZ"
                            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Dados da Passagem</label>
                        <input
                            type="text"
                            value={details.flightInfo}
                            onChange={(e) => setDetails({ ...details, flightInfo: e.target.value })}
                            placeholder="São Paulo (GRU) -> Frankfurt (FRA)"
                            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Data e Voo</label>
                        <input
                            type="text"
                            value={details.flightDate}
                            onChange={(e) => setDetails({ ...details, flightDate: e.target.value })}
                            placeholder="25/09/2025 - Voo LH507"
                            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button onClick={onCancel} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancelar</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">Salvar e Confirmar</button>
                </div>
            </div>
        </div>
    );
};


const SaleOnboardingScreen: React.FC<SaleOnboardingScreenProps> = ({ offer, onBack, onComplete, onChat, onDispute, step, setStep }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [securityStatus, setSecurityStatus] = useState<'pending' | 'in_progress' | 'approved'>('pending');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'in_progress' | 'approved'>('pending');
  const [emissionConfirmed, setEmissionConfirmed] = useState(false);
  const [isEmissionModalVisible, setIsEmissionModalVisible] = useState(false);
  const [emissionDetails, setEmissionDetails] = useState<EmissionDetails>({
    reservationCode: '',
    flightInfo: '',
    flightDate: '',
  });


  useEffect(() => {
    if (step === 3 && securityStatus === 'pending') {
      setTimeout(() => setSecurityStatus('in_progress'), 1500);
    }
  }, [step, securityStatus]);
  
  useEffect(() => {
    if (securityStatus === 'in_progress') {
        setTimeout(() => setSecurityStatus('approved'), 2000);
    }
  }, [securityStatus]);
  
  useEffect(() => {
    if (securityStatus === 'approved' && paymentStatus === 'pending') {
        setTimeout(() => setPaymentStatus('in_progress'), 1000);
    }
  }, [securityStatus, paymentStatus]);
  
  useEffect(() => {
    if(paymentStatus === 'in_progress') {
        setTimeout(() => setPaymentStatus('approved'), 2000);
    }
  }, [paymentStatus]);
  
  const handleBack = () => {
    if (step > 1) {
        setStep(step - 1);
    } else {
        onBack();
    }
  }
  
  const handleSaveEmissionDetails = (details: EmissionDetails) => {
    setEmissionDetails(details);
    setEmissionConfirmed(true);
    setIsEmissionModalVisible(false);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Termos de Venda</h2>
            <div className="h-64 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <p>Cláusula 1: Você, o VENDEDOR, concorda em utilizar nossa plataforma como intermediária para a venda de milhas.</p>
              <p>Cláusula 2: Você se compromete a emitir a passagem aérea com os dados do passageiro fornecidos pelo comprador em até 24 horas após a confirmação da segurança.</p>
              <p>Cláusula 3: O pagamento será liberado para você após a confirmação da emissão da passagem por ambas as partes.</p>
            </div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded text-blue-500 focus:ring-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Li e concordo com os Termos de Venda.</span>
            </label>
          </div>
        );
      case 2:
        return (
          <div className="p-4 text-center flex flex-col items-center justify-center flex-grow">
            <ClockIcon className="w-20 h-20 text-blue-500 dark:text-blue-400 mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Aguardando Comprador</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">Sua oferta foi listada com sucesso. Notificaremos você assim que um comprador aceitar e o processo de venda puder continuar.</p>
          </div>
        );
      case 3:
        const isSecurityDone = securityStatus === 'approved';
        const isPaymentDone = paymentStatus === 'approved';
        
        const StepperItem: React.FC<{title: string; nodeStatus: 'completed' | 'active' | 'pending'; children: React.ReactNode}> = ({title, nodeStatus, children}) => (
            <div className="flex">
                <div className="flex flex-col items-center mr-6">
                    <StepNode status={nodeStatus} />
                    <div className="w-px h-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="pb-12">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                    {children}
                </div>
            </div>
        );

        return (
            <div className="p-6">
                <div className="relative">
                    <StepperItem title="1. Análise de Segurança" nodeStatus={isSecurityDone ? 'completed' : 'active'}>
                         <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg w-full">
                            {securityStatus !== 'approved' && <ClockIcon className={`w-6 h-6 mr-3 ${securityStatus === 'in_progress' ? 'animate-spin' : ''} ${securityStatus === 'pending' ? 'text-gray-500' : 'text-blue-500 dark:text-blue-400'}`} />}
                            {securityStatus === 'approved' && <CheckCircleIcon className="w-6 h-6 mr-3 text-green-500" />}
                            <span className="text-gray-700 dark:text-gray-300">
                                {securityStatus === 'pending' && 'Pendente de início'}
                                {securityStatus === 'in_progress' && 'Análise em andamento...'}
                                {securityStatus === 'approved' && 'Análise de segurança aprovada!'}
                            </span>
                        </div>
                    </StepperItem>

                    <StepperItem title="2. Dados do Passageiro" nodeStatus={isPaymentDone ? 'completed' : isSecurityDone ? 'active' : 'pending'}>
                         <div className={`transition-opacity duration-300 ${!isSecurityDone ? 'opacity-50' : ''}`}>
                            <button onClick={onChat} disabled={!isSecurityDone} className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-700 disabled:cursor-not-allowed transition-colors">
                                <MessageSquareIcon className="w-6 h-6 mr-3 text-blue-500 dark:text-blue-400"/>
                                <span className="font-semibold text-gray-900 dark:text-white">Abrir Chat Seguro</span>
                            </button>
                         </div>
                    </StepperItem>

                    <div className="flex">
                        <div className="flex flex-col items-center mr-6">
                             <StepNode status={emissionConfirmed ? 'completed' : isPaymentDone ? 'active' : 'pending'} />
                        </div>
                         <div className="pb-12 w-full">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Confirmações</h3>
                            <div className={`space-y-3 transition-opacity duration-300 ${!isSecurityDone ? 'opacity-50' : ''}`}>
                                <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                    {paymentStatus !== 'approved' && <ClockIcon className={`w-6 h-6 mr-3 ${paymentStatus === 'in_progress' ? 'animate-spin' : 'text-gray-500' }`} />}
                                    {paymentStatus === 'approved' && <CheckCircleIcon className="w-6 h-6 mr-3 text-green-500" />}
                                    <span className="text-gray-700 dark:text-gray-300">
                                        {paymentStatus === 'pending' && 'Aguardando Pagamento PIX'}
                                        {paymentStatus === 'in_progress' && 'Processando pagamento...'}
                                        {paymentStatus === 'approved' && 'Pagamento PIX Recebido!'}
                                    </span>
                                </div>
                                <div className={`transition-opacity duration-300 ${!isPaymentDone ? 'opacity-50' : ''}`}>
                                    {!emissionConfirmed ? (
                                        <button 
                                            disabled={!isPaymentDone}
                                            onClick={() => setIsEmissionModalVisible(true)}
                                            className="w-full text-left flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                                        >
                                            <div className="w-5 h-5 border-2 border-gray-400 dark:border-gray-500 rounded-sm flex items-center justify-center mr-3 flex-shrink-0"></div>
                                            <span className="text-gray-700 dark:text-gray-300">Confirmo a emissão da passagem.</span>
                                        </button>
                                    ) : (
                                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center mb-2">
                                                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                                        <span className="font-semibold text-gray-800 dark:text-gray-200">Emissão confirmada</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 break-all"><strong>Reserva:</strong> {emissionDetails.reservationCode}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 break-all"><strong>Voo:</strong> {emissionDetails.flightInfo}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 break-all"><strong>Data:</strong> {emissionDetails.flightDate}</p>
                                                </div>
                                                <button 
                                                    onClick={() => setIsEmissionModalVisible(true)} 
                                                    className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline flex-shrink-0 ml-2 p-1">
                                                    Editar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  const renderFooter = () => {
    switch(step) {
        case 1:
            return <button onClick={() => setStep(2)} disabled={!termsAccepted} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">Aceitar e Continuar</button>;
        case 2:
            return <button onClick={() => setStep(3)} className="w-full bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600">Simular Aceite do Comprador</button>;
        case 3:
            const isSaleComplete = emissionConfirmed && paymentStatus === 'approved';
            return (
                <div className="space-y-3">
                    <button onClick={() => onComplete(emissionDetails)} disabled={!isSaleComplete} className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed">
                        Finalizar Venda
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
      <Header title="Iniciar Venda" onBack={handleBack} />
      <Stepper currentStep={step} />
      <div className="flex-grow overflow-y-auto">{renderStepContent()}</div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {renderFooter()}
      </div>
      {isEmissionModalVisible && (
        <EmissionDetailsModal 
            onSave={handleSaveEmissionDetails}
            onCancel={() => setIsEmissionModalVisible(false)}
            initialDetails={emissionDetails}
        />
      )}
    </div>
  );
};

export default SaleOnboardingScreen;