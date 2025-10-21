import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Plus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Milestone {
  id: string;
  title: string;
  description: string;
  required: string;
}

interface CreatePackProps {
  onPublish: () => void;
}

export function CreatePack({ onPublish }: CreatePackProps) {
  const [step, setStep] = useState(1);
  const [packTitle, setPackTitle] = useState('');
  const [packDescription, setPackDescription] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', title: '', description: '', required: '' }
  ]);
  const [isPublishing, setIsPublishing] = useState(false);

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { id: Date.now().toString(), title: '', description: '', required: '' }
    ]);
  };

  const removeMilestone = (id: string) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter(m => m.id !== id));
    }
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('VC Pack published successfully', {
      description: 'Your pack is now available for holders to enroll'
    });
    
    setIsPublishing(false);
    onPublish();
  };

  const canProceedToStep2 = packTitle.trim() && packDescription.trim();
  const canPublish = milestones.every(m => m.title.trim() && m.description.trim() && m.required.trim());

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-8 py-12">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-foreground">Create New VC Pack</CardTitle>
            <div className="flex gap-2 mt-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border border-border'}`}>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 dark:bg-black/20">1</div>
                Basic Info
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border border-border'}`}>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 dark:bg-black/20">2</div>
                Define Milestones
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground border border-border'}`}>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 dark:bg-black/20">3</div>
                Review & Publish
              </div>
            </div>
          </CardHeader>
        </Card>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Step 1: Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Pack Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., B.S. in Computer Science"
                  value={packTitle}
                  onChange={(e) => setPackTitle(e.target.value)}
                  className="bg-input-background border border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Pack Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this credential represents and its requirements"
                  value={packDescription}
                  onChange={(e) => setPackDescription(e.target.value)}
                  className="bg-input-background border border-border min-h-[120px]"
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue to Milestones
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Step 2: Define Milestones</CardTitle>
                <Button 
                  onClick={addMilestone}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="p-4 rounded-lg border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Milestone {index + 1}</span>
                    {milestones.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMilestone(milestone.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Milestone Title</Label>
                    <Input
                      placeholder="e.g., Year 1 Transcript"
                      value={milestone.title}
                      onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                      className="bg-input-background border border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe what the holder needs to accomplish"
                      value={milestone.description}
                      onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                      className="bg-input-background border border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Required Proof Format</Label>
                    <Input
                      placeholder="e.g., JSON file containing grades and credits"
                      value={milestone.required}
                      onChange={(e) => updateMilestone(milestone.id, 'required', e.target.value)}
                      className="bg-input-background border border-border"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!canPublish}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Review Pack
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Step 3: Review & Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-foreground mb-2">Pack Information</h3>
                <div className="p-4 rounded-lg bg-muted space-y-2">
                  <div>
                    <span className="text-muted-foreground">Title:</span>{' '}
                    <span className="text-foreground">{packTitle}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Description:</span>{' '}
                    <span className="text-foreground">{packDescription}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Milestones:</span>{' '}
                    <span className="text-foreground">{milestones.length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-foreground mb-2">Milestones</h3>
                <div className="space-y-2">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="p-3 rounded-lg border border-border bg-card">
                      <div className="text-foreground">
                        {index + 1}. {milestone.title}
                      </div>
                      <div className="text-muted-foreground text-sm">{milestone.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={isPublishing}
                >
                  Back
                </Button>
                <Button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isPublishing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    'Publish Pack'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
