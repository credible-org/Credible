import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Submission {
  id: string;
  holderAddress: string;
  packTitle: string;
  milestone: string;
  submittedAt: string;
}

interface ReviewSubmissionModalProps {
  open: boolean;
  onClose: () => void;
  submission: Submission;
  onReviewComplete: (submissionId: string, approved: boolean) => void;
}

export function ReviewSubmissionModal({ 
  open, 
  onClose, 
  submission,
  onReviewComplete 
}: ReviewSubmissionModalProps) {
  const [feedback, setFeedback] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const mockProofData = {
    fileName: 'transcript_year3_data.json',
    coursework: [
      { code: 'CS301', title: 'Advanced Algorithms', grade: 'A', credits: 4 },
      { code: 'CS302', title: 'Database Systems', grade: 'A-', credits: 3 },
      { code: 'CS303', title: 'Operating Systems', grade: 'B+', credits: 4 },
      { code: 'CS304', title: 'Software Engineering', grade: 'A', credits: 3 }
    ],
    gpa: 3.75,
    totalCredits: 14
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Milestone approved', {
      description: `${submission.milestone} approved for ${submission.holderAddress}`
    });
    
    setIsProcessing(false);
    onReviewComplete(submission.id, true);
  };

  const handleReject = async () => {
    if (!feedback.trim()) {
      toast.error('Feedback required', {
        description: 'Please provide feedback when rejecting a submission'
      });
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.info('Milestone rejected', {
      description: 'Holder has been notified with your feedback'
    });
    
    setIsProcessing(false);
    onReviewComplete(submission.id, false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Submission</DialogTitle>
          <DialogDescription>
            Review the holder's milestone proof and approve or reject their submission
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-[#E7F3FF] border border-[#007BFF] p-4">
            <div className="flex gap-3">
              <Lock className="h-5 w-5 text-[#007BFF] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#0A2540] mb-1">
                  <span className="font-medium">Viewing secure student data</span>
                </p>
                <p className="text-[#0A2540]" style={{ fontSize: '12px' }}>
                  This is a temporary, read-only view. Access is programmatically controlled 
                  and will be revoked after your decision.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#F8F9FA]">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[#6C757D]">Holder:</span>{' '}
                  <span className="text-[#0A2540] font-mono">{submission.holderAddress}</span>
                </div>
                <div>
                  <span className="text-[#6C757D]">Submitted:</span>{' '}
                  <span className="text-[#0A2540]">{submission.submittedAt}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#6C757D]">Pack:</span>{' '}
                  <span className="text-[#0A2540]">{submission.packTitle}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#6C757D]">Milestone:</span>{' '}
                  <span className="text-[#0A2540]">{submission.milestone}</span>
                </div>
              </div>
            </div>

            <div className="border border-[#E9ECEF] rounded-lg p-4 bg-white">
              <h4 className="text-[#0A2540] mb-3">Proof Data</h4>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="text-[#6C757D]">File:</span>{' '}
                  <span className="text-[#0A2540] font-mono">{mockProofData.fileName}</span>
                </div>
                
                <div>
                  <h5 className="text-[#6C757D] mb-2" style={{ fontSize: '14px' }}>Coursework</h5>
                  <div className="space-y-2">
                    {mockProofData.coursework.map((course, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-[#F8F9FA]">
                        <div className="flex-1">
                          <span className="text-[#0A2540] font-mono text-sm">{course.code}</span>
                          <span className="text-[#6C757D] text-sm ml-2">{course.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#0A2540]">{course.grade}</span>
                          <span className="text-[#6C757D] text-sm">{course.credits} credits</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 pt-2">
                  <div>
                    <span className="text-[#6C757D]">GPA:</span>{' '}
                    <span className="text-[#0A2540]">{mockProofData.gpa}</span>
                  </div>
                  <div>
                    <span className="text-[#6C757D]">Total Credits:</span>{' '}
                    <span className="text-[#0A2540]">{mockProofData.totalCredits}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback (required for rejection)</Label>
              <Textarea
                id="feedback"
                placeholder="Provide feedback to the holder..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="bg-input-background border border-border min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handleReject}
              disabled={isProcessing}
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Reject'
              )}
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isProcessing}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Approve'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
