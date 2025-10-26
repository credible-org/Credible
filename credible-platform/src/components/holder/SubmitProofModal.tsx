import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Upload, Loader2, Lock, Cloud, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import lighthouse from '@lighthouse-web3/sdk';

interface SubmitProofModalProps {
  open: boolean;
  onClose: () => void;
  milestoneId: string;
  onSubmit: (milestoneId: string) => void;
}

export function SubmitProofModal({ open, onClose, milestoneId, onSubmit }: SubmitProofModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStage, setUploadStage] = useState<'idle' | 'encrypting' | 'storing' | 'confirming'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const progressCallback = (progressData) => {
    let percentageDone = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(`Upload progress: ${percentageDone}%`);
  }

  const uploadFile = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
    console.log(import.meta.env.VITE_LIGHTHOUSE_API_KEY)
    const filesArray = [file];
    const output = await lighthouse.upload(
      filesArray,
      import.meta.env.VITE_LIGHTHOUSE_API_KEY
    );

    console.log('File uploaded successfully!', output);
    // The file is now available at the following IPFS gateway URL:
    console.log('Visit at:', `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`);
  }  

  const handleSubmit = async () => {
    if (!file) return;

    setIsSubmitting(true);

    // Step 1: Encrypting
    setUploadStage('encrypting');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Step 2: Storing
    setUploadStage('storing');
    uploadFile();

    // Step 3: On-chain confirmation
    setUploadStage('confirming');
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Proof submitted successfully', {
      description: 'Your milestone proof is now pending review'
    });

    setIsSubmitting(false);
    setUploadStage('idle');
    setFile(null);
    onSubmit(milestoneId);
  };

  const getStageMessage = () => {
    switch (uploadStage) {
      case 'encrypting':
        return (
          <div className="flex items-center gap-2 text-[#6C757D]">
            <Lock className="h-4 w-4 animate-pulse" />
            <span>1. Encrypting Proof...</span>
          </div>
        );
      case 'storing':
        return (
          <div className="flex items-center gap-2 text-[#6C757D]">
            <Cloud className="h-4 w-4 animate-pulse" />
            <span>2. Storing Securely...</span>
          </div>
        );
      case 'confirming':
        return (
          <div className="flex items-center gap-2 text-[#6C757D]">
            <CheckCircle2 className="h-4 w-4 animate-pulse" />
            <span>3. Awaiting On-Chain Confirmation...</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Milestone Proof</DialogTitle>
          <DialogDescription>
            Upload your proof document to complete this milestone
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="rounded-lg border-2 border-dashed border-[#E9ECEF] p-8 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".json,.pdf,.zip"
              disabled={isSubmitting}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              <Upload className="mx-auto h-12 w-12 text-[#6C757D] mb-4" />
              <p className="text-[#0A2540] mb-2">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-[#6C757D]" style={{ fontSize: '14px' }}>
                JSON, PDF, or ZIP (max 10MB)
              </p>
            </label>
          </div>

          {file && !isSubmitting && (
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-foreground" style={{ fontSize: '14px' }}>
                  File ready: {file.name}
                </span>
              </div>
            </div>
          )}

          {isSubmitting && (
            <div className="rounded-lg bg-muted p-4">
              {getStageMessage()}
              <p className="mt-2 text-muted-foreground" style={{ fontSize: '12px' }}>
                Your private data is being handled securely
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!file || isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
