import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, Award, CheckCircle2, Lock, Users, Zap, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import logo from '../assets/logo.png';

interface LandingPageProps {
  onConnectWallet: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export function LandingPage({ onConnectWallet }: LandingPageProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-background to-muted"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dark Mode Toggle - Top Right */}
      <div className="absolute top-8 right-8 z-50">
        <motion.button
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-card hover:bg-accent transition-colors shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-foreground" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-8 py-24">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img 
              src={logo} 
              alt="Credible" 
              className="h-20 w-20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            />
            <h1 className="text-foreground" style={{ fontSize: '64px', fontWeight: 700 }}>
              Credible
            </h1>
          </motion.div>
          <motion.p 
            className="text-muted-foreground mb-8 max-w-2xl mx-auto" 
            style={{ fontSize: '20px' }}
            variants={itemVariants}
          >
            The decentralized reputation network for verifiable credentials. 
            Build trust through blockchain-verified achievements.
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onConnectWallet}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12 py-6 h-auto"
            >
              Connect Wallet to Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid gap-6 md:grid-cols-3 mb-16"
          variants={containerVariants}
        >
          {[
            { icon: Shield, color: 'bg-primary', title: 'Trustworthy', desc: 'All credentials are verified on-chain, ensuring authenticity and preventing fraud.' },
            { icon: Lock, color: 'bg-secondary', title: 'Private & Secure', desc: 'You control your data. Grant temporary access only to who you choose.' },
            { icon: Zap, color: 'bg-foreground', title: 'Instant Verification', desc: 'Verifiers can instantly confirm credential authenticity without intermediaries.' }
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="border-border h-full">
                <CardHeader>
                  <motion.div 
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className="h-6 w-6 text-background" />
                  </motion.div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Use Cases */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-center text-foreground mb-12" style={{ fontSize: '36px', fontWeight: 700 }}>
            Built for Three Key Actors
          </h2>
          <motion.div 
            className="grid gap-8 md:grid-cols-3"
            variants={containerVariants}
          >
            {[
              { icon: Award, bg: 'bg-primary/10', color: 'text-primary', title: 'Issuers', desc: 'Universities, organizations, and DAOs can create and manage verifiable credential packs with milestone-based verification.' },
              { icon: Users, bg: 'bg-secondary/10', color: 'text-secondary', title: 'Holders', desc: 'Students and professionals earn credentials, maintain full control over their data, and share achievements securely.' },
              { icon: CheckCircle2, bg: 'bg-foreground/10', color: 'text-foreground', title: 'Verifiers', desc: 'Employers and dApps can instantly verify credentials with cryptographic proof, eliminating verification delays.' }
            ].map((actor) => (
              <motion.div 
                key={actor.title}
                className="text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${actor.bg} mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <actor.icon className={`h-8 w-8 ${actor.color}`} />
                </motion.div>
                <h3 className="text-foreground mb-3">{actor.title}</h3>
                <p className="text-muted-foreground">{actor.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-primary text-primary-foreground border-primary shadow-xl">
            <CardContent className="py-12 text-center">
              <motion.h2 
                className="mb-4" 
                style={{ fontSize: '36px', fontWeight: 700 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to Build Trust?
              </motion.h2>
              <motion.p 
                className="opacity-90 mb-8 max-w-2xl mx-auto" 
                style={{ fontSize: '18px' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join the decentralized reputation network and start issuing, earning, 
                or verifying credentials today.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={onConnectWallet}
                  size="lg"
                  variant="secondary"
                  className="text-lg px-12 py-6 h-auto shadow-lg"
                >
                  Connect Wallet
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="border-t border-border bg-card py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Credible" className="h-8 w-8" />
              <span className="text-foreground" style={{ fontSize: '20px', fontWeight: 600 }}>Credible</span>
            </div>
            <p className="text-muted-foreground">
              Decentralized Reputation Network
            </p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
