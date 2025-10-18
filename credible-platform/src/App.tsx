import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { WalletConnectModal } from './components/WalletConnectModal';
import { DiscoverPacks } from './components/holder/DiscoverPacks';
import { PackDetail } from './components/holder/PackDetail';
import { HolderDashboard } from './components/holder/HolderDashboard';
import { IssuerDashboard } from './components/issuer/IssuerDashboard';
import { CreatePack } from './components/issuer/CreatePack';
import { ReviewQueue } from './components/issuer/ReviewQueue';
import { IssuerPackDetail } from './components/issuer/IssuerPackDetail';
import { VerificationPortal } from './components/verifier/VerificationPortal';
import { AnimatePresence } from 'motion/react';

type UserType = 'holder' | 'issuer' | 'verifier' | null;
type HolderView = 'discover' | 'pack-detail' | 'dashboard';
type IssuerView = 'dashboard' | 'create-pack' | 'review-queue' | 'pack-detail';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  
  // Holder state
  const [holderView, setHolderView] = useState<HolderView>('discover');
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [selectedEnrolledPackId, setSelectedEnrolledPackId] = useState<string | null>(null);
  
  // Issuer state
  const [issuerView, setIssuerView] = useState<IssuerView>('dashboard');
  const [selectedIssuerPackId, setSelectedIssuerPackId] = useState<string | null>(null);

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleWalletConnect = (type: UserType) => {
    setWalletConnected(true);
    setUserType(type);
    // Mock wallet address - in real app, this comes from Web3 provider
    setWalletAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
    
    // Set initial view based on user type
    if (type === 'holder') {
      setHolderView('dashboard');
    } else if (type === 'issuer') {
      setIssuerView('dashboard');
    }
  };

  const handleUserTypeChange = (type: UserType) => {
    if (!type) {
      // Going back to landing
      setUserType(null);
      setWalletConnected(false);
      setWalletAddress('');
    } else {
      setUserType(type);
      if (type === 'holder') {
        setHolderView('dashboard');
      } else if (type === 'issuer') {
        setIssuerView('dashboard');
      }
    }
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setUserType(null);
  };

  // Holder navigation handlers
  const handleHolderNavigate = (view: HolderView) => {
    setHolderView(view);
    // Reset enrolled pack selection when navigating to dashboard
    if (view === 'dashboard') {
      setSelectedEnrolledPackId(null);
    }
  };

  const handlePackSelect = (packId: string) => {
    setSelectedPackId(packId);
    setHolderView('pack-detail');
  };

  const handleBackToDiscover = () => {
    setHolderView('discover');
  };

  const handleEnrollPack = (packId: string) => {
    setHolderView('dashboard');
  };

  const handleEnrolledPackSelect = (packId: string) => {
    setSelectedEnrolledPackId(packId);
  };

  const handleBackToEnrolledList = () => {
    setSelectedEnrolledPackId(null);
  };

  // Issuer navigation handlers
  const handleIssuerNavigate = (view: IssuerView) => {
    setIssuerView(view);
  };

  const handleIssuerPackSelect = (packId: string) => {
    setSelectedIssuerPackId(packId);
    setIssuerView('pack-detail');
  };

  const handleBackToIssuerDashboard = () => {
    setIssuerView('dashboard');
  };

  const handlePublishPack = () => {
    setIssuerView('dashboard');
  };

  // Render appropriate view
  const renderContent = () => {
    if (!walletConnected || !userType) {
      return <LandingPage onConnectWallet={handleConnectWallet} />;
    }

    if (userType === 'holder') {
      if (holderView === 'discover') {
        return <DiscoverPacks onPackSelect={handlePackSelect} />;
      } else if (holderView === 'pack-detail' && selectedPackId) {
        return (
          <PackDetail 
            packId={selectedPackId} 
            onBack={handleBackToDiscover}
            onEnroll={handleEnrollPack}
          />
        );
      } else if (holderView === 'dashboard') {
        return (
          <HolderDashboard 
            selectedPackId={selectedEnrolledPackId}
            onPackSelect={handleEnrolledPackSelect}
            onBack={handleBackToEnrolledList}
          />
        );
      }
    }

    if (userType === 'issuer') {
      if (issuerView === 'dashboard') {
        return <IssuerDashboard onPackSelect={handleIssuerPackSelect} />;
      } else if (issuerView === 'create-pack') {
        return <CreatePack onPublish={handlePublishPack} />;
      } else if (issuerView === 'review-queue') {
        return <ReviewQueue />;
      } else if (issuerView === 'pack-detail' && selectedIssuerPackId) {
        return (
          <IssuerPackDetail 
            packId={selectedIssuerPackId}
            onBack={handleBackToIssuerDashboard}
          />
        );
      }
    }

    if (userType === 'verifier') {
      return <VerificationPortal />;
    }

    return <LandingPage onConnectWallet={handleConnectWallet} />;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-200">
        {walletConnected && (
          <Header 
            userType={userType}
            walletAddress={walletAddress}
            onUserTypeChange={handleUserTypeChange}
            onDisconnect={handleDisconnect}
            currentView={userType === 'holder' ? holderView : userType === 'issuer' ? issuerView : undefined}
            onHolderNavigate={handleHolderNavigate}
            onIssuerNavigate={handleIssuerNavigate}
          />
        )}
        
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>

        <WalletConnectModal
          open={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onConnect={handleWalletConnect}
        />

        <Toaster />
      </div>
    </ThemeProvider>
  );
}
