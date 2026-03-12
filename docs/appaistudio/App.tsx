import React, { useState, useEffect } from 'react';
import { Page, FlightDeal, MarketOffer, Promotion } from './types';

import BottomNav from './components/BottomNav';
import EmissoesScreen from './screens/EmissoesScreen';
import FlightDetailScreen from './screens/FlightDetailScreen';
import BalcaoScreen from './screens/BalcaoScreen';
import PromocoesScreen from './screens/PromocoesScreen';
import ContaScreen from './screens/ContaScreen';
import ContractScreen from './screens/ContractScreen';
import ChatScreen from './screens/ChatScreen';
import SaleOnboardingScreen from './screens/SaleOnboardingScreen';
import SaleConfirmationScreen from './screens/SaleConfirmationScreen';
import PlansScreen from './screens/PlansScreen';
import PlanSuccessScreen from './screens/PlanSuccessScreen';
import FilterScreen from './screens/FilterScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import MySalesScreen from './screens/MySalesScreen';
import MakeOfferScreen from './screens/MakeOfferScreen';
import CreatePurchaseOfferScreen from './screens/CreatePurchaseOfferScreen';
import SaleDetailScreen from './screens/SaleDetailScreen';
import PromotionDetailScreen from './screens/PromotionDetailScreen';
import PurchaseOnboardingScreen from './screens/PurchaseOnboardingScreen';
import PurchaseConfirmationScreen from './screens/PurchaseConfirmationScreen';
import DisputeReasonScreen from './screens/DisputeReasonScreen';
import DisputeStatusScreen from './screens/DisputeStatusScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import AdminAddEmissionScreen from './screens/AdminAddEmissionScreen';
import AdminSelectDatesScreen from './screens/AdminSelectDatesScreen';
import AdminAddPromotionScreen from './screens/AdminAddPromotionScreen';
import AdminAddSuccessScreen from './screens/AdminAddSuccessScreen';
import CreateAdScreen from './screens/CreateAdScreen';
import SelectAdPlanScreen from './screens/SelectAdPlanScreen';
import AdSuccessScreen from './screens/AdSuccessScreen';


interface EmissionDetails {
  reservationCode: string;
  flightInfo: string;
  flightDate: string;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState<Page>('emissions');
  const [selectedFlight, setSelectedFlight] = useState<FlightDeal | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<MarketOffer | null>(null);
  const [selectedSale, setSelectedSale] = useState<MarketOffer | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  
  // Sale flow state
  const [activeSale, setActiveSale] = useState<MarketOffer | null>(null);
  const [saleStep, setSaleStep] = useState(1);
  const [emissionDetails, setEmissionDetails] = useState<EmissionDetails | null>(null);

  // Purchase flow state
  const [activePurchase, setActivePurchase] = useState<MarketOffer | null>(null);
  const [purchaseStep, setPurchaseStep] = useState(1);

  // Dispute flow state
  const [disputeContext, setDisputeContext] = useState<'sale' | 'purchase' | null>(null);
  const [disputeReason, setDisputeReason] = useState<string | null>(null);
  
  // Admin flow state
  const [adminNewEmission, setAdminNewEmission] = useState<Partial<FlightDeal> | null>(null);
  const [adminSuccessInfo, setAdminSuccessInfo] = useState<{ type: 'emission' | 'promotion', title: string } | null>(null);

  // Plan purchase flow state
  const [purchasedPlanName, setPurchasedPlanName] = useState<string | null>(null);

  // Ad creation flow
  const [adDetails, setAdDetails] = useState<any>(null);


  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navigateTo = (page: Page) => {
    window.scrollTo(0, 0); // Scroll to top on page change
    setCurrentPage(page);
  };

  const handleSelectFlight = (flight: FlightDeal) => {
    setSelectedFlight(flight);
    navigateTo('flight-detail');
  };

  const handleStartSale = (offer: MarketOffer) => {
    setActiveSale(offer);
    setSaleStep(1);
    navigateTo('sale-onboarding');
  };

  const handleStartPurchase = (offer: MarketOffer) => {
    setActivePurchase(offer);
    setPurchaseStep(1);
    navigateTo('purchase-onboarding');
  };

  const handleMakeOffer = (offer: MarketOffer) => {
    setSelectedOffer(offer);
    navigateTo('make-offer');
  };
  
  const handleSelectSale = (sale: MarketOffer) => {
    setSelectedSale(sale);
    navigateTo('sale-detail');
  }

  const handleSelectPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    navigateTo('promotion-detail');
  };

  const handleCompleteSale = (details: EmissionDetails) => {
    setEmissionDetails(details);
    navigateTo('sale-confirmation');
  };
  
  const handleCompletePurchase = () => {
    navigateTo('purchase-confirmation');
  };

  const handleFinishSaleFlow = () => {
    setActiveSale(null);
    setSaleStep(1);
    setEmissionDetails(null);
    navigateTo('counter');
  }
  
  const handleFinishPurchaseFlow = () => {
    setActivePurchase(null);
    setPurchaseStep(1);
    navigateTo('counter');
  }

  const handleOpenDispute = (context: 'sale' | 'purchase') => {
    setDisputeContext(context);
    navigateTo('dispute-reason');
  };
  
  const handleConfirmDispute = (reason: string) => {
    setDisputeReason(reason);
    navigateTo('dispute-status');
  };

  const handleFinishDisputeFlow = () => {
    setActiveSale(null);
    setActivePurchase(null);
    setDisputeContext(null);
    setDisputeReason(null);
    setSaleStep(1);
    setPurchaseStep(1);
    navigateTo('counter');
  };

  const handleSelectEmissionDates = (emissionData: Partial<FlightDeal>) => {
    setAdminNewEmission(emissionData);
    navigateTo('admin-select-dates');
  };

  const handleAdminConfirm = (type: 'emission' | 'promotion', title: string) => {
    setAdminSuccessInfo({ type, title });
    setAdminNewEmission(null); // Clear temp data
    navigateTo('admin-add-success');
  };

  const handlePurchasePlan = (planName: string) => {
    setPurchasedPlanName(planName);
    navigateTo('plan-success');
  };

  const handleFinishPlanPurchase = () => {
    setPurchasedPlanName(null);
    navigateTo('account');
  };

  const handleSelectAdPlan = (details: any) => {
    setAdDetails(details);
    navigateTo('select-ad-plan');
  };

  const handleConfirmAd = (plan: any) => {
    console.log('Ad Confirmed:', { ...adDetails, plan });
    navigateTo('ad-success');
  };

  const handleFinishAdFlow = () => {
    setAdDetails(null);
    navigateTo('account');
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'emissions':
        return <EmissoesScreen onSelectFlight={handleSelectFlight} />;
      case 'counter':
        return <BalcaoScreen onStartSale={handleStartSale} onStartPurchase={handleStartPurchase} onMakeOffer={handleMakeOffer} onNavigate={navigateTo} />;
      case 'promotions':
        return <PromocoesScreen onSelectPromotion={handleSelectPromotion} />;
      case 'account':
        return <ContaScreen onNavigate={navigateTo} />;
      case 'flight-detail':
        return <FlightDetailScreen flight={selectedFlight!} onBack={() => navigateTo('emissions')} onNavigate={navigateTo} />;
      case 'contract':
        return <ContractScreen onFinish={() => navigateTo('counter')} onSkip={() => navigateTo('account')} />;
      case 'chat':
        const handleChatBack = () => {
          if (activeSale) navigateTo('sale-onboarding');
          else if (activePurchase) navigateTo('purchase-onboarding');
          else navigateTo('counter');
        };
        return <ChatScreen onBack={handleChatBack} />;
      case 'sale-onboarding':
        return <SaleOnboardingScreen offer={activeSale!} onBack={handleFinishSaleFlow} onComplete={handleCompleteSale} onChat={() => navigateTo('chat')} step={saleStep} setStep={setSaleStep} onDispute={() => handleOpenDispute('sale')} />;
      case 'sale-confirmation':
        return <SaleConfirmationScreen offer={activeSale!} onDone={handleFinishSaleFlow} emissionDetails={emissionDetails} />;
      case 'purchase-onboarding':
        return <PurchaseOnboardingScreen offer={activePurchase!} onBack={handleFinishPurchaseFlow} onComplete={handleCompletePurchase} onChat={() => navigateTo('chat')} step={purchaseStep} setStep={setPurchaseStep} onDispute={() => handleOpenDispute('purchase')} />;
      case 'purchase-confirmation':
        return <PurchaseConfirmationScreen offer={activePurchase!} onDone={handleFinishPurchaseFlow} />;
      case 'plans':
        return <PlansScreen onBack={() => navigateTo('account')} onPurchasePlan={handlePurchasePlan} />;
      case 'plan-success':
        return <PlanSuccessScreen planName={purchasedPlanName!} onDone={handleFinishPlanPurchase} />;
      case 'filters':
        return <FilterScreen onBack={() => navigateTo('counter')} />;
      case 'settings':
        return <SettingsScreen onBack={() => navigateTo('account')} theme={theme} toggleTheme={toggleTheme} onNavigate={navigateTo} />;
      case 'edit-profile':
        return <EditProfileScreen onBack={() => navigateTo('account')} />;
      case 'my-sales':
        return <MySalesScreen onBack={() => navigateTo('account')} onSelectSale={handleSelectSale} />;
      case 'make-offer':
        return <MakeOfferScreen offer={selectedOffer!} onBack={() => navigateTo('counter')} />;
      case 'create-purchase-offer':
        return <CreatePurchaseOfferScreen flight={selectedFlight!} onBack={() => navigateTo('flight-detail')} />;
      case 'sale-detail':
          return <SaleDetailScreen sale={selectedSale!} onBack={() => navigateTo('my-sales')} />;
      case 'promotion-detail':
        return <PromotionDetailScreen promotion={selectedPromotion!} onBack={() => navigateTo('promotions')} />;
      case 'dispute-reason':
        const offerForDispute = disputeContext === 'sale' ? activeSale! : activePurchase!;
        const backPage = disputeContext === 'sale' ? 'sale-onboarding' : 'purchase-onboarding';
        return <DisputeReasonScreen offer={offerForDispute} onBack={() => navigateTo(backPage as Page)} onConfirm={handleConfirmDispute} />;
      case 'dispute-status':
        const disputedOffer = disputeContext === 'sale' ? activeSale! : activePurchase!;
        return <DisputeStatusScreen offer={disputedOffer} reason={disputeReason!} onDone={handleFinishDisputeFlow} />;
      case 'admin-panel':
        return <AdminPanelScreen onBack={() => navigateTo('settings')} onNavigate={navigateTo} />;
      case 'admin-add-emission':
        return <AdminAddEmissionScreen onBack={() => navigateTo('admin-panel')} onSelectDates={handleSelectEmissionDates} />;
      case 'admin-select-dates':
        return <AdminSelectDatesScreen emissionData={adminNewEmission!} onBack={() => navigateTo('admin-add-emission')} onConfirm={handleAdminConfirm} />;
      case 'admin-add-promotion':
        return <AdminAddPromotionScreen onBack={() => navigateTo('admin-panel')} onConfirm={handleAdminConfirm} />;
      case 'admin-add-success':
        return <AdminAddSuccessScreen type={adminSuccessInfo!.type} title={adminSuccessInfo!.title} onNavigate={navigateTo} />;
      case 'create-ad':
        return <CreateAdScreen onBack={() => navigateTo('account')} onNext={handleSelectAdPlan} />;
      case 'select-ad-plan':
        return <SelectAdPlanScreen onBack={() => navigateTo('create-ad')} onConfirm={handleConfirmAd} />;
      case 'ad-success':
        return <AdSuccessScreen adDetails={adDetails} onDone={handleFinishAdFlow} onNavigate={navigateTo} />;
      default:
        return <EmissoesScreen onSelectFlight={handleSelectFlight} />;
    }
  };

  const showBottomNav = ['emissions', 'counter', 'promotions', 'account'].includes(currentPage);

  return (
    <div className="font-sans antialiased">
       <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <div className="container mx-auto max-w-md bg-white dark:bg-black min-h-screen flex flex-col shadow-2xl dark:shadow-blue-900/20">
              <main className="flex-grow">
                {renderPage()}
              </main>
              {showBottomNav && <BottomNav activePage={currentPage} setActivePage={navigateTo} />}
            </div>
       </div>
    </div>
  );
};

export default App;