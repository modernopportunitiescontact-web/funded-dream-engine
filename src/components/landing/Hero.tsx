import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Zap, Award, Users } from "lucide-react";
import { pricingTiers } from "@/lib/pricing-data";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Nous finançons le talent</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Votre Discipline Devient{" "}
            <br className="hidden md:block" />
            <span className="text-gradient-gold">Votre Capital</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            The <span className="font-bold text-foreground">BEST</span> Propfirm vous offre l'opportunité de prouver vos compétences de trading et d'accéder à un capital allant jusqu'à <span className="text-primary font-semibold">500,000$</span>. Pas besoin d'avoir beaucoup d'argent pour trader gros.
          </p>

          {/* Key Messages */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-success" />
              <span>Système équitable basé sur la performance</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>Une opportunité pour les traders sérieux</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/register">
              <Button variant="hero" size="xl" className="group">
                Choisissez votre capital
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#phases">
              <Button variant="hero-outline" size="xl">
                Comment ça marche
              </Button>
            </a>
          </div>

          {/* Stats - Updated with multiple tiers */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`glass-card p-4 ${tier.popular ? 'border-primary/50 gold-glow' : ''}`}>
                <div className="font-display text-xl md:text-2xl font-bold text-gradient-gold mb-1">
                  {tier.capitalFormatted}
                </div>
                <div className="text-xs text-muted-foreground">à partir de {tier.feeFormatted}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-sm">Paiement Crypto USDT</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm">MetaTrader 5</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-sm">Activation sous 24h</span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
