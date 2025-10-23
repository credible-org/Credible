import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FileText, Eye } from 'lucide-react';
import { ReviewSubmissionModal } from './ReviewSubmissionModal';

interface Submission {
  id: string;
  holderAddress: string;
  packTitle: string;
  milestone: string;
  submittedAt: string;
  status: 'pending';
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    holderAddress: '0x1234...abcd',
    packTitle: 'B.S. in Computer Science',
    milestone: 'Core Requirements',
    submittedAt: '2024-10-10',
    status: 'pending'
  },
  {
    id: '2',
    holderAddress: '0x5678...efgh',
    packTitle: 'B.S. in Computer Science',
    milestone: 'Year 2 Transcript',
    submittedAt: '2024-10-09',
    status: 'pending'
  },
  {
    id: '3',
    holderAddress: '0x9abc...ijkl',
    packTitle: 'M.S. in Data Science',
    milestone: 'Research Proposal',
    submittedAt: '2024-10-08',
    status: 'pending'
  }
];

export function ReviewQueue() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleReview = (submission: Submission) => {
    setSelectedSubmission(submission);
    setReviewModalOpen(true);
  };

  const handleReviewComplete = (submissionId: string, approved: boolean) => {
    setSubmissions(prev => prev.filter(s => s.id !== submissionId));
    setReviewModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-8 py-12">
        <div className="mb-8">
          <h1 className="text-foreground" style={{ fontSize: '48px', fontWeight: 700 }}>
            Submissions Queue
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review and approve pending milestone submissions
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">
                Pending Submissions ({submissions.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No pending submissions</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-secondary border-secondary">
                          {submission.holderAddress}
                        </Badge>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
                          {submission.submittedAt}
                        </span>
                      </div>
                      <h4 className="text-foreground">{submission.packTitle}</h4>
                      <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                        Milestone: {submission.milestone}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleReview(submission)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedSubmission && (
        <ReviewSubmissionModal
          open={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          submission={selectedSubmission}
          onReviewComplete={handleReviewComplete}
        />
      )}
    </div>
  );
}
