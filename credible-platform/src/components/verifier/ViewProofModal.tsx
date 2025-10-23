import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Clock, Award } from 'lucide-react';

interface ViewProofModalProps {
  open: boolean;
  onClose: () => void;
}

export function ViewProofModal({ open, onClose }: ViewProofModalProps) {
  const mockFullData = {
    holder: '0x1234...abcd',
    pack: 'B.S. in Computer Science',
    issuer: 'Web3 University',
    completedMilestones: [
      {
        title: 'Year 1 Transcript',
        completedAt: '2024-09-20',
        courses: [
          { code: 'CS101', title: 'Intro to Programming', grade: 'A', credits: 4 },
          { code: 'MATH101', title: 'Calculus I', grade: 'A-', credits: 4 },
          { code: 'PHYS101', title: 'Physics I', grade: 'B+', credits: 3 }
        ],
        gpa: 3.83
      },
      {
        title: 'Year 2 Transcript',
        completedAt: '2024-10-05',
        courses: [
          { code: 'CS201', title: 'Data Structures', grade: 'A', credits: 4 },
          { code: 'CS202', title: 'Discrete Math', grade: 'A', credits: 3 },
          { code: 'CS203', title: 'Computer Architecture', grade: 'A-', credits: 4 }
        ],
        gpa: 3.91
      }
    ],
    overallGPA: 3.87,
    totalCredits: 120,
    mintedAt: 'October 1, 2024'
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detailed Credential Proof</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <span>View the complete verified academic record and credential details</span>
            <Badge className="bg-[#FFC107] text-foreground w-fit">
              <Clock className="mr-1 h-3 w-3" />
              Access expires in 47h 59m
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground" style={{ fontSize: '14px' }}>Holder</span>
                <div className="text-foreground font-mono">{mockFullData.holder}</div>
              </div>
              <div>
                <span className="text-muted-foreground" style={{ fontSize: '14px' }}>Minted</span>
                <div className="text-foreground">{mockFullData.mintedAt}</div>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground" style={{ fontSize: '14px' }}>Credential</span>
                <div className="text-foreground">{mockFullData.pack}</div>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground" style={{ fontSize: '14px' }}>Issuer</span>
                <div className="text-foreground">{mockFullData.issuer}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Academic Record
            </h3>
            <div className="space-y-4">
              {mockFullData.completedMilestones.map((milestone, i) => (
                <div key={i} className="border border-border rounded-lg p-4 bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-foreground">{milestone.title}</h4>
                    <Badge variant="outline" className="text-primary border-primary">
                      Verified {milestone.completedAt}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {milestone.courses.map((course, j) => (
                      <div 
                        key={j} 
                        className="flex items-center justify-between p-2 rounded bg-muted"
                      >
                        <div className="flex-1">
                          <span className="text-foreground font-mono text-sm">{course.code}</span>
                          <span className="text-muted-foreground text-sm ml-2">{course.title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-foreground">{course.grade}</span>
                          <span className="text-muted-foreground text-sm">{course.credits} credits</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border">
                    <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
                      GPA: <span className="text-foreground">{milestone.gpa}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-primary/10 border border-primary p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-muted-foreground mb-1" style={{ fontSize: '14px' }}>
                  Overall GPA
                </div>
                <div className="text-2xl text-foreground" style={{ fontWeight: 600 }}>
                  {mockFullData.overallGPA}
                </div>
              </div>
              <div className="text-right">
                <div className="text-muted-foreground mb-1" style={{ fontSize: '14px' }}>
                  Total Credits
                </div>
                <div className="text-2xl text-foreground" style={{ fontWeight: 600 }}>
                  {mockFullData.totalCredits}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
