import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Info } from 'lucide-react';
import { toast } from 'sonner';

interface GrantAccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function GrantAccessModal({ open, onClose }: GrantAccessModalProps) {
  const [verifierAddress, setVerifierAddress] = useState('');
  const [duration, setDuration] = useState('48');

  const handleGrantAccess = () => {
    toast.success('Access granted successfully', {
      description: `Access granted to ${verifierAddress.slice(0, 6)}...${verifierAddress.slice(-4)} for ${duration} hours`
    });
    onClose();
    setVerifierAddress('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Grant Temporary Access</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share your credential with a verifier for a limited time
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="verifier-address">Verifier's Wallet Address</Label>
            <Input
              id="verifier-address"
              placeholder="0x..."
              value={verifierAddress}
              onChange={(e) => setVerifierAddress(e.target.value)}
              className="bg-input-background border border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Access Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration" className="bg-input-background border border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24">24 hours</SelectItem>
                <SelectItem value="48">48 hours</SelectItem>
                <SelectItem value="72">72 hours</SelectItem>
                <SelectItem value="168">1 week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg bg-secondary/10 border border-secondary p-3 flex gap-2">
            <Info className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-foreground" style={{ fontSize: '12px' }}>
              This creates a secure, time-limited permission for the verifier to decrypt 
              and view your credential data. You can revoke access at any time.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGrantAccess}
              disabled={!verifierAddress}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Grant Access
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
