import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Award, Users, Clock, CheckCircle2 } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  required: string;
}

const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Year 1 Transcript',
    description: 'Complete and submit verified transcript for first year coursework',
    required: 'JSON file containing course grades and credits'
  },
  {
    id: '2',
    title: 'Year 2 Transcript',
    description: 'Complete and submit verified transcript for second year coursework',
    required: 'JSON file containing course grades and credits'
  },
  {
    id: '3',
    title: 'Core Requirements',
    description: 'Complete all core computer science requirements',
    required: 'Proof of completion for CS fundamentals courses'
  },
  {
    id: '4',
    title: 'Elective Courses',
    description: 'Complete required elective credits',
    required: 'Documentation of elective course completion'
  },
  {
    id: '5',
    title: 'Capstone Project',
    description: 'Complete and defend capstone project',
    required: 'Project repository link and presentation recording'
  },
  {
    id: '6',
    title: 'Thesis Approval',
    description: 'Submit and receive approval for senior thesis',
    required: 'Approved thesis document link'
  },
  {
    id: '7',
    title: 'Final Exams',
    description: 'Pass all final comprehensive examinations',
    required: 'Proof of passing scores'
  },
  {
    id: '8',
    title: 'Graduation Requirements',
    description: 'Meet all university graduation requirements',
    required: 'Final transcript and degree audit'
  }
];

interface IssuerPackDetailProps {
  packId: string;
  onBack: () => void;
}

export function IssuerPackDetail({ packId, onBack }: IssuerPackDetailProps) {
  // Mock pack data - in real implementation, this would come from blockchain
  const packData = {
    id: packId,
    title: 'B.S. in Computer Science',
    issuer: 'Web3 University',
    logo: 'W3U',
    description: 'Complete your Bachelor of Science degree in Computer Science with fully verified, blockchain-based academic credentials. This comprehensive program validates your achievement through a series of milestone-based proofs that demonstrate your mastery of computer science fundamentals, specialized coursework, and capstone projects.',
    stats: {
      enrolled: 124,
      pending: 18,
      completed: 45
    },
    milestones: mockMilestones
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-8 py-12">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl">
                    {packData.logo}
                  </div>
                  <div>
                    <CardTitle className="text-foreground" style={{ fontSize: '36px' }}>
                      {packData.title}
                    </CardTitle>
                    <p className="text-muted-foreground">{packData.issuer}</p>
                  </div>
                </div>
                <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Award className="mr-1 h-3 w-3" />
                  {packData.milestones.length} Milestones
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              {packData.description}
            </p>
            
            {/* Statistics Card - Replaces enrollment button in holder view */}
            <Card className="bg-muted/50 border-border">
              <CardContent className="pt-6">
                <h4 className="text-foreground mb-4">Pack Statistics</h4>
                <div className="grid grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Users className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-2xl text-foreground" style={{ fontWeight: 600 }}>
                        {packData.stats.enrolled}
                      </div>
                      <div className="text-muted-foreground" style={{ fontSize: '12px' }}>
                        Enrolled
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFC107]/10">
                      <Clock className="h-5 w-5 text-[#FFC107]" />
                    </div>
                    <div>
                      <div className="text-2xl text-[#FFC107]" style={{ fontWeight: 600 }}>
                        {packData.stats.pending}
                      </div>
                      <div className="text-muted-foreground" style={{ fontSize: '12px' }}>
                        Pending
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl text-primary" style={{ fontWeight: 600 }}>
                        {packData.stats.completed}
                      </div>
                      <div className="text-muted-foreground" style={{ fontSize: '12px' }}>
                        Completed
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Required Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {packData.milestones.map((milestone, index) => (
                <div 
                  key={milestone.id}
                  className="flex gap-4 p-4 rounded-lg border border-border bg-card"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">{milestone.title}</h4>
                    <p className="text-muted-foreground mb-2" style={{ fontSize: '14px' }}>
                      {milestone.description}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                      <span className="font-medium">Required:</span> {milestone.required}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
