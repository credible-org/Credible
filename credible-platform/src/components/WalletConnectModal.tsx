import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
  onConnect: (type: 'holder' | 'issuer' | 'verifier') => void;
}

export function WalletConnectModal({ open, onClose, onConnect }: WalletConnectModalProps) {
  const [step, setStep] = useState<'user-type' | 'wallet-provider'>('user-type');
  const [selectedUserType, setSelectedUserType] = useState<'holder' | 'issuer' | 'verifier' | null>(null);

  // Reset to step 1 when modal closes
  useEffect(() => {
    if (!open) {
      setStep('user-type');
      setSelectedUserType(null);
    }
  }, [open]);

  const handleUserTypeSelect = (userType: 'holder' | 'issuer' | 'verifier') => {
    setSelectedUserType(userType);
    setStep('wallet-provider');
  };

  const handleWalletProviderSelect = () => {
    if (selectedUserType) {
      onConnect(selectedUserType);
      onClose();
    }
  };

  const handleBack = () => {
    setStep('user-type');
    setSelectedUserType(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'user-type' ? 'Select User Type' : 'Connect Wallet'}
          </DialogTitle>
          <DialogDescription>
            {step === 'user-type' 
              ? 'Choose how you want to use Credible'
              : 'Select your wallet provider to continue'
            }
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'user-type' && (
            <motion.div 
              key="user-type"
              className="space-y-3 py-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => handleUserTypeSelect('holder')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue as Holder
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => handleUserTypeSelect('issuer')}
                  variant="secondary"
                  className="w-full"
                >
                  Continue as Issuer
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => handleUserTypeSelect('verifier')}
                  variant="outline"
                  className="w-full hover:bg-muted hover:text-foreground"
                >
                  Continue as Verifier
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === 'wallet-provider' && (
            <motion.div 
              key="wallet-provider"
              className="space-y-4 py-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="mb-2 -ml-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <p className="text-muted-foreground">Select your wallet provider:</p>
              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full justify-start gap-3 h-12"
                    variant="outline"
                    onClick={handleWalletProviderSelect}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 40 40" fill="none">
                      <path d="M10 14L18 8L26 14V26L18 32L10 26V14Z" fill="#F6851B" />
                    </svg>
                    MetaMask
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full justify-start gap-3 h-12"
                    variant="outline"
                    onClick={handleWalletProviderSelect}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="16" fill="#3B99FC" />
                    </svg>
                    WalletConnect
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
