import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'motion/react';
import logo from '../assets/logo.png';

type HolderView = 'discover' | 'pack-detail' | 'dashboard';
type IssuerView = 'dashboard' | 'create-pack' | 'review-queue';

interface HeaderProps {
  userType?: 'holder' | 'issuer' | 'verifier' | null;
  walletAddress: string;
  onUserTypeChange?: (type: 'holder' | 'issuer' | 'verifier' | null) => void;
  onDisconnect: () => void;
  currentView?: HolderView | IssuerView;
  onHolderNavigate?: (view: HolderView) => void;
  onIssuerNavigate?: (view: IssuerView) => void;
}

export function Header({ 
  userType,
  walletAddress,
  onUserTypeChange,
  onDisconnect,
  currentView,
  onHolderNavigate,
  onIssuerNavigate 
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onUserTypeChange?.(null)}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="Credible" className="h-10 w-10" />
              <span className="text-foreground" style={{ fontSize: '24px', fontWeight: 600 }}>
                Credible
              </span>
            </button>

            {walletAddress && userType && (
              <nav className="flex gap-1">
                {userType === 'holder' && (
                  <>
                    <button 
                      className={`px-4 py-2 rounded-lg transition-colors relative ${
                        currentView === 'dashboard' 
                          ? 'text-primary' 
                          : 'text-foreground hover:text-primary hover:bg-accent/10'
                      }`}
                      onClick={() => onHolderNavigate?.('dashboard')}
                    >
                      Dashboard
                      {currentView === 'dashboard' && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="holder-nav-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-lg transition-colors relative ${
                        currentView === 'discover' 
                          ? 'text-primary' 
                          : 'text-foreground hover:text-primary hover:bg-accent/10'
                      }`}
                      onClick={() => onHolderNavigate?.('discover')}
                    >
                      Discover
                      {currentView === 'discover' && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="holder-nav-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </>
                )}
                {userType === 'issuer' && (
                  <>
                    <button 
                      className={`px-4 py-2 rounded-lg transition-colors relative ${
                        currentView === 'dashboard' 
                          ? 'text-primary' 
                          : 'text-foreground hover:text-primary hover:bg-accent/10'
                      }`}
                      onClick={() => onIssuerNavigate?.('dashboard')}
                    >
                      Dashboard
                      {currentView === 'dashboard' && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="issuer-nav-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-lg transition-colors relative ${
                        currentView === 'create-pack' 
                          ? 'text-primary' 
                          : 'text-foreground hover:text-primary hover:bg-accent/10'
                      }`}
                      onClick={() => onIssuerNavigate?.('create-pack')}
                    >
                      Create Pack
                      {currentView === 'create-pack' && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="issuer-nav-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-lg transition-colors relative ${
                        currentView === 'review-queue' 
                          ? 'text-primary' 
                          : 'text-foreground hover:text-primary hover:bg-accent/10'
                      }`}
                      onClick={() => onIssuerNavigate?.('review-queue')}
                    >
                      Review Queue
                      {currentView === 'review-queue' && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="issuer-nav-indicator"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </>
                )}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 text-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-foreground" />
                )}
              </motion.div>
            </motion.button>

            {walletAddress && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-foreground">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
                <motion.button
                  onClick={onDisconnect}
                  className="px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors text-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Disconnect
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
