import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { CheckCircle2, Search, Loader2, Shield, Eye, Clock } from 'lucide-react';
import { ViewProofModal } from './ViewProofModal';

interface VerifiedCredential {
  id: string;
  title: string;
  issuer: string;
  mintedAt: string;
  verified: boolean;
}

export function VerificationPortal() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [credentials, setCredentials] = useState<VerifiedCredential[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [accessRequested, setAccessRequested] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    setHasSearched(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock verified credentials
    setCredentials([
      {
        id: '1',
        title: 'B.S. in Computer Science',
        issuer: 'Web3 University',
        mintedAt: 'October 1, 2024',
        verified: true
      }
    ]);
    
    setIsVerifying(false);
  };

  const handleRequestAccess = () => {
    setAccessRequested(true);
    // In a real app, this would send a notification to the holder
    setTimeout(() => {
      setAccessGranted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-8 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary mb-6">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-foreground mb-4" style={{ fontSize: '48px', fontWeight: 700 }}>
            Verify Credentials
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: '16px' }}>
            Instantly verify the authenticity of blockchain credentials
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter Holder's Wallet Address (0x...)"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="bg-input-background border border-border flex-1"
                  disabled={isVerifying}
                />
                <Button 
                  onClick={handleVerify}
                  disabled={!walletAddress || isVerifying}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Verify
                    </>
                  )}
                </Button>
              </div>

              <p className="text-muted-foreground text-center" style={{ fontSize: '14px' }}>
                Demo: Use "0x1234...abcd" or any address
              </p>
            </div>
          </CardContent>
        </Card>

        {hasSearched && !isVerifying && credentials.length > 0 && (
          <div className="space-y-4">
            {credentials.map((credential) => (
              <Card key={credential.id} className="border-primary border-2">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-foreground" style={{ fontSize: '24px', fontWeight: 600 }}>
                            {credential.title}
                          </h2>
                          <Badge className="bg-primary text-primary-foreground px-3 py-1 text-base">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            ON-CHAIN VERIFIED
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>Issuer:</span>
                            <span className="text-foreground">{credential.issuer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>Minted:</span>
                            <span className="text-foreground">{credential.mintedAt}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>Token ID:</span>
                            <span className="text-foreground font-mono" style={{ fontSize: '14px' }}>
                              #00001
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      {!accessGranted && !accessRequested && (
                        <Button 
                          onClick={handleRequestAccess}
                          variant="outline"
                          className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Request Access to Detailed Proof
                        </Button>
                      )}

                      {accessRequested && !accessGranted && (
                        <div className="text-center p-4 rounded-lg bg-[#FFC107]/10 border border-[#FFC107]">
                          <Clock className="mx-auto h-8 w-8 text-[#FFC107] mb-2" />
                          <p className="text-foreground">
                            Access requested. Waiting for holder approval...
                          </p>
                        </div>
                      )}

                      {accessGranted && (
                        <div className="space-y-3">
                          <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary">
                            <CheckCircle2 className="mx-auto h-6 w-6 text-primary mb-1" />
                            <p className="text-foreground">
                              Access granted for 48 hours
                            </p>
                          </div>
                          <Button 
                            onClick={() => setShowProofModal(true)}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Detailed Proof
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {hasSearched && !isVerifying && credentials.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-[#6C757D] mb-4" />
              <p className="text-[#6C757D]">
                No credentials found for this wallet address
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <ViewProofModal 
        open={showProofModal}
        onClose={() => setShowProofModal(false)}
      />
    </div>
  );
}
