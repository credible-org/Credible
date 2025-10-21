import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Award, BookOpen, Briefcase, GraduationCap, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VCPack {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  description: string;
  milestones: number;
  category: string;
}

const mockPacks: VCPack[] = [
  {
    id: '1',
    title: 'B.S. in Computer Science',
    issuer: 'Web3 University',
    issuerLogo: 'W3U',
    description: 'Complete your Bachelor of Science degree with verified academic credentials',
    milestones: 8,
    category: 'Education'
  },
  {
    id: '2',
    title: 'Full-Stack Developer Certification',
    issuer: 'DevAcademy',
    issuerLogo: 'DA',
    description: 'Master full-stack development with hands-on projects',
    milestones: 12,
    category: 'Professional'
  },
  {
    id: '3',
    title: 'Blockchain Developer Track',
    issuer: 'Crypto Institute',
    issuerLogo: 'CI',
    description: 'Learn Solidity, smart contracts, and dApp development',
    milestones: 10,
    category: 'Technology'
  },
  {
    id: '4',
    title: 'Product Management Certificate',
    issuer: 'Business School DAO',
    issuerLogo: 'BSD',
    description: 'Learn product strategy, user research, and agile methodologies',
    milestones: 6,
    category: 'Business'
  }
];

const categoryIcons = {
  Education: GraduationCap,
  Professional: Briefcase,
  Technology: BookOpen,
  Business: Award
};

interface DiscoverPacksProps {
  onPackSelect: (packId: string) => void;
}

const categories = ['All', 'Education', 'Professional', 'Technology', 'Business'];

export function DiscoverPacks({ onPackSelect }: DiscoverPacksProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPacks = mockPacks.filter(pack => {
    const matchesSearch = pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pack.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pack.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto max-w-7xl px-8 py-12">
        <motion.div 
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-foreground" style={{ fontSize: '48px', fontWeight: 700 }}>
            Discover VC Packs
          </h1>
          <p className="mt-2 text-muted-foreground" style={{ fontSize: '16px' }}>
            Browse available credentials and start your journey
          </p>
        </motion.div>

        <motion.div 
          className="mb-8 space-y-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search packs by title, description, or issuer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card"
              />
            </div>
            <Filter className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'hover:bg-accent'
                  }`}
                >
                  {category}
                </Badge>
              </motion.button>
            ))}
          </div>

          <motion.p 
            className="text-sm text-muted-foreground"
            key={filteredPacks.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Showing {filteredPacks.length} {filteredPacks.length === 1 ? 'pack' : 'packs'}
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredPacks.map((pack, index) => {
              const Icon = categoryIcons[pack.category as keyof typeof categoryIcons];
              return (
                <motion.div
                  key={pack.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="cursor-pointer transition-all hover:shadow-lg border-border h-full bg-card"
                    onClick={() => onPackSelect(pack.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {pack.issuerLogo}
                          </motion.div>
                          <div>
                            <CardTitle className="text-foreground">{pack.title}</CardTitle>
                            <CardDescription className="text-muted-foreground">
                              {pack.issuer}
                            </CardDescription>
                          </div>
                        </div>
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">{pack.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Award className="h-4 w-4" />
                          <span style={{ fontSize: '14px' }}>{pack.milestones} Milestones</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPackSelect(pack.id);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredPacks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Award className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-foreground mb-2">No packs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
