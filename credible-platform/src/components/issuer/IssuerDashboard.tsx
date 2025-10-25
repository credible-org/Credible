import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileText, Clock, CheckCircle2, Users } from 'lucide-react';

interface IssuerDashboardProps {
  onPackSelect: (packId: string) => void;
}

export function IssuerDashboard({ onPackSelect }: IssuerDashboardProps) {
  const publishedPacks = [
    {
      id: '1',
      title: 'B.S. in Computer Science',
      enrolled: 124,
      pending: 18,
      completed: 45
    },
    {
      id: '2',
      title: 'M.S. in Data Science',
      enrolled: 67,
      pending: 12,
      completed: 23
    },
    {
      id: '3',
      title: 'Certificate in Web3 Development',
      enrolled: 89,
      pending: 8,
      completed: 34
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-8">
          <h1 className="text-foreground" style={{ fontSize: '48px', fontWeight: 700 }}>
            Issuer Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your VC Packs and review submissions
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground" style={{ fontSize: '14px', fontWeight: 500 }}>
                Total Packs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl text-foreground" style={{ fontWeight: 600 }}>
                  {publishedPacks.length}
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground" style={{ fontSize: '14px', fontWeight: 500 }}>
                Total Enrolled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl text-foreground" style={{ fontWeight: 600 }}>
                  {publishedPacks.reduce((acc, pack) => acc + pack.enrolled, 0)}
                </div>
                <Users className="h-8 w-8 text-[#007BFF] dark:text-[#3B82F6]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground" style={{ fontSize: '14px', fontWeight: 500 }}>
                Pending Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl text-[#FFC107]" style={{ fontWeight: 600 }}>
                  {publishedPacks.reduce((acc, pack) => acc + pack.pending, 0)}
                </div>
                <Clock className="h-8 w-8 text-[#FFC107]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-muted-foreground" style={{ fontSize: '14px', fontWeight: 500 }}>
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl text-primary" style={{ fontWeight: 600 }}>
                  {publishedPacks.reduce((acc, pack) => acc + pack.completed, 0)}
                </div>
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Published VC Packs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {publishedPacks.map((pack) => (
                <div
                  key={pack.id}
                  onClick={() => onPackSelect(pack.id)}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      W3U
                    </div>
                    <div>
                      <h3 className="text-foreground">{pack.title}</h3>
                      <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                        Web3 University
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xl text-foreground" style={{ fontWeight: 600 }}>
                        {pack.enrolled}
                      </div>
                      <div className="text-muted-foreground" style={{ fontSize: '12px' }}>
                        Enrolled
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl text-[#FFC107]" style={{ fontWeight: 600 }}>
                        {pack.pending}
                      </div>
                      <div className="text-muted-foreground" style={{ fontSize: '12px' }}>
                        Pending
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl text-primary" style={{ fontWeight: 600 }}>
                        {pack.completed}
                      </div>
                      <div className="text-muted-foreground" style={{ fontSize: '12px' }}>
                        Completed
                      </div>
                    </div>
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
