import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle2, Clock, Upload, Share2, Award, ArrowLeft, ChevronRight } from 'lucide-react';
import { SubmitProofModal } from './SubmitProofModal';
import { GrantAccessModal } from './GrantAccessModal';
import { motion } from 'motion/react';

type MilestoneStatus = 'not-submitted' | 'pending' | 'approved' | 'rejected';

interface MilestoneProgress {
  id: string;
  title: string;
  status: MilestoneStatus;
  submittedAt?: string;
  reviewedAt?: string;
}

interface EnrolledPack {
  id: string;
  name: string;
  issuer: string;
  issuerLogo: string;
  totalMilestones: number;
  approvedMilestones: number;
  pendingMilestones: number;
  status: 'in-progress' | 'completed' | 'minted';
  enrolledDate: string;
}

interface HolderDashboardProps {
  selectedPackId: string | null;
  onPackSelect: (packId: string) => void;
  onBack: () => void;
}

// Mock enrolled packs data
const mockEnrolledPacks: EnrolledPack[] = [
  {
    id: 'pack-1',
    name: 'B.S. in Computer Science',
    issuer: 'Web3 University',
    issuerLogo: 'W3U',
    totalMilestones: 8,
    approvedMilestones: 2,
    pendingMilestones: 1,
    status: 'in-progress',
    enrolledDate: '2024-09-01'
  },
  {
    id: 'pack-2',
    name: 'Full Stack Developer Certificate',
    issuer: 'Tech Academy',
    issuerLogo: 'TA',
    totalMilestones: 5,
    approvedMilestones: 5,
    pendingMilestones: 0,
    status: 'completed',
    enrolledDate: '2024-08-15'
  },
  {
    id: 'pack-3',
    name: 'Blockchain Fundamentals',
    issuer: 'Crypto Institute',
    issuerLogo: 'CI',
    totalMilestones: 6,
    approvedMilestones: 4,
    pendingMilestones: 2,
    status: 'in-progress',
    enrolledDate: '2024-10-01'
  }
];

// Mock milestones for pack-1
const pack1Milestones: MilestoneProgress[] = [
  { id: '1', title: 'Year 1 Transcript', status: 'approved', submittedAt: '2024-09-15', reviewedAt: '2024-09-20' },
  { id: '2', title: 'Year 2 Transcript', status: 'approved', submittedAt: '2024-10-01', reviewedAt: '2024-10-05' },
  { id: '3', title: 'Core Requirements', status: 'pending', submittedAt: '2024-10-10' },
  { id: '4', title: 'Elective Courses', status: 'not-submitted' },
  { id: '5', title: 'Capstone Project', status: 'not-submitted' },
  { id: '6', title: 'Thesis Approval', status: 'not-submitted' },
  { id: '7', title: 'Final Exams', status: 'not-submitted' },
  { id: '8', title: 'Graduation Requirements', status: 'not-submitted' }
];

// Mock milestones for pack-2
const pack2Milestones: MilestoneProgress[] = [
  { id: '1', title: 'HTML & CSS Fundamentals', status: 'approved', submittedAt: '2024-08-20', reviewedAt: '2024-08-22' },
  { id: '2', title: 'JavaScript Advanced', status: 'approved', submittedAt: '2024-09-05', reviewedAt: '2024-09-07' },
  { id: '3', title: 'React Development', status: 'approved', submittedAt: '2024-09-20', reviewedAt: '2024-09-22' },
  { id: '4', title: 'Node.js & APIs', status: 'approved', submittedAt: '2024-10-01', reviewedAt: '2024-10-03' },
  { id: '5', title: 'Final Project', status: 'approved', submittedAt: '2024-10-10', reviewedAt: '2024-10-12' }
];

// Mock milestones for pack-3
const pack3Milestones: MilestoneProgress[] = [
  { id: '1', title: 'Introduction to Blockchain', status: 'approved', submittedAt: '2024-10-05', reviewedAt: '2024-10-07' },
  { id: '2', title: 'Cryptography Basics', status: 'approved', submittedAt: '2024-10-10', reviewedAt: '2024-10-12' },
  { id: '3', title: 'Smart Contracts', status: 'approved', submittedAt: '2024-10-15', reviewedAt: '2024-10-17' },
  { id: '4', title: 'DeFi Protocols', status: 'approved', submittedAt: '2024-10-20', reviewedAt: '2024-10-22' },
  { id: '5', title: 'Consensus Mechanisms', status: 'pending', submittedAt: '2024-10-25' },
  { id: '6', title: 'Security Best Practices', status: 'pending', submittedAt: '2024-10-28' }
];

export function HolderDashboard({ selectedPackId, onPackSelect, onBack }: HolderDashboardProps) {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [showGrantAccess, setShowGrantAccess] = useState(false);
  const [packMinted, setPackMinted] = useState(false);

  // Get milestones based on selected pack
  const getMilestonesForPack = (packId: string): MilestoneProgress[] => {
    switch (packId) {
      case 'pack-1':
        return pack1Milestones;
      case 'pack-2':
        return pack2Milestones;
      case 'pack-3':
        return pack3Milestones;
      default:
        return [];
    }
  };

  const [milestones, setMilestones] = useState<MilestoneProgress[]>([]);

  // Update milestones when selected pack changes
  useEffect(() => {
    if (selectedPackId) {
      setMilestones(getMilestonesForPack(selectedPackId));
    } else {
      setMilestones([]);
    }
  }, [selectedPackId]);

  const currentPack = mockEnrolledPacks.find(p => p.id === selectedPackId);
  const approvedCount = milestones.filter(m => m.status === 'approved').length;
  const totalCount = milestones.length;
  const progressPercent = totalCount > 0 ? (approvedCount / totalCount) * 100 : 0;
  const canMint = approvedCount === totalCount && totalCount > 0;

  const handleSubmitProof = (milestoneId: string) => {
    setSelectedMilestone(milestoneId);
    setSubmitModalOpen(true);
  };

  const handleProofSubmitted = (milestoneId: string) => {
    setMilestones(prev => prev.map(m => 
      m.id === milestoneId 
        ? { ...m, status: 'pending', submittedAt: new Date().toISOString().split('T')[0] }
        : m
    ));
    setSubmitModalOpen(false);
  };

  const handleMintPack = () => {
    setPackMinted(true);
  };

  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-[#FFC107]" />;
      case 'rejected':
        return <Upload className="h-5 w-5 text-destructive" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-primary text-primary-foreground">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-[#FFC107] text-foreground">Pending Review</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Not Submitted</Badge>;
    }
  };

  const getPackStatusBadge = (status: EnrolledPack['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-primary text-primary-foreground">Completed</Badge>;
      case 'minted':
        return <Badge className="bg-secondary text-secondary-foreground">Minted</Badge>;
      default:
        return <Badge variant="outline">In Progress</Badge>;
    }
  };

  // Show enrolled packs list
  if (!selectedPackId) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-8 py-12">
          <div className="mb-8">
            <h1 className="text-foreground" style={{ fontSize: '48px', fontWeight: 700 }}>
              My Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Track your progress and manage your credentials
            </p>
          </div>

          {mockEnrolledPacks.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <Award className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2">No Enrolled Packs</h3>
                    <p className="text-muted-foreground">
                      You haven't enrolled in any credential packs yet. Use the "Discover" tab in the navigation to browse available packs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockEnrolledPacks.map((pack) => {
                const progress = pack.totalMilestones > 0 
                  ? (pack.approvedMilestones / pack.totalMilestones) * 100 
                  : 0;

                return (
                  <motion.div
                    key={pack.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow h-full"
                      onClick={() => onPackSelect(pack.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                              {pack.issuerLogo}
                            </div>
                            <div className="min-w-0">
                              <CardTitle className="text-foreground line-clamp-2">
                                {pack.name}
                              </CardTitle>
                              <p className="text-muted-foreground mt-1" style={{ fontSize: '14px' }}>
                                {pack.issuer}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          {getPackStatusBadge(pack.status)}
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
                                Progress
                              </span>
                              <span className="text-foreground" style={{ fontSize: '14px' }}>
                                {pack.approvedMilestones} / {pack.totalMilestones}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between text-muted-foreground" style={{ fontSize: '12px' }}>
                            <span>Enrolled: {pack.enrolledDate}</span>
                            {pack.pendingMilestones > 0 && (
                              <span className="text-[#FFC107]">
                                {pack.pendingMilestones} pending
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show pack detail view
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-8 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-foreground" style={{ fontSize: '48px', fontWeight: 700 }}>
            {currentPack?.name || 'Pack Details'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your progress and submit proofs for milestones
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {currentPack?.issuerLogo}
                  </div>
                  <div>
                    <CardTitle className="text-foreground">{currentPack?.name}</CardTitle>
                    <p className="text-muted-foreground" style={{ fontSize: '14px' }}>{currentPack?.issuer}</p>
                  </div>
                </div>
                {packMinted && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Award className="mr-1 h-3 w-3" />
                    Minted
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#6C757D]">Overall Progress</span>
                  <span className="text-foreground">
                    {approvedCount} of {totalCount} Milestones
                  </span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
              
              {!packMinted && canMint && (
                <Button 
                  onClick={handleMintPack}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Award className="mr-2 h-4 w-4" />
                  Mint Pack
                </Button>
              )}

              {packMinted && (
                <Button 
                  onClick={() => setShowGrantAccess(true)}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Credential
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl text-primary" style={{ fontWeight: 600 }}>
                  {approvedCount}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: '14px' }}>Approved</div>
              </div>
              <div>
                <div className="text-2xl text-[#FFC107]" style={{ fontWeight: 600 }}>
                  {milestones.filter(m => m.status === 'pending').length}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: '14px' }}>Pending Review</div>
              </div>
              <div>
                <div className="text-2xl text-muted-foreground" style={{ fontWeight: 600 }}>
                  {milestones.filter(m => m.status === 'not-submitted').length}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: '14px' }}>Remaining</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card"
                >
                  <div className="flex-shrink-0">
                    {getStatusIcon(milestone.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
                        Milestone {index + 1}
                      </span>
                    </div>
                    <h4 className="text-foreground">{milestone.title}</h4>
                    {milestone.submittedAt && (
                      <p className="text-muted-foreground mt-1" style={{ fontSize: '12px' }}>
                        Submitted: {milestone.submittedAt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {getStatusBadge(milestone.status)}
                    {milestone.status === 'not-submitted' && (
                      <Button
                        size="sm"
                        onClick={() => handleSubmitProof(milestone.id)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Submit Proof
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <SubmitProofModal
        open={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        milestoneId={selectedMilestone || ''}
        onSubmit={handleProofSubmitted}
      />

      <GrantAccessModal
        open={showGrantAccess}
        onClose={() => setShowGrantAccess(false)}
      />
    </div>
  );
}
