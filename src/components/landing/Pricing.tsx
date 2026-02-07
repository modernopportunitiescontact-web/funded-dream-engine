import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { pricingTiers, tradingRules } from "@/lib/pricing-data";

const Pricing = () => {
  const features = [
    "Accès Phase 1 + Phase 2",
    "Compte MT5 démo personnel",
    "Dashboard trader complet",
    "Support par email",
    "Identifiants envoyés sous 24h",
    "Pas de limite de temps",
    "Accès compte Funded si réussi",
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Choisissez{" "}
            <span className="text-gradient-gold">Votre Capital</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Plusieurs niveaux de capital pour s'adapter à votre ambition. Choisissez le capital qui correspond à votre niveau et commencez votre challenge.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`glass-card p-6 relative overflow-hidden flex flex-col ${
                tier.popular ? "border-primary/50 gold-glow" : ""
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-primary/20 rounded-full">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium text-primary">Populaire</span>
                </div>
              )}

              {/* Capital */}
              <div className="mb-4">
                <h3 className="font-display text-sm text-muted-foreground mb-1">Capital</h3>
                <div className="font-display text-3xl font-bold text-gradient-gold">
                  {tier.capitalFormatted}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl font-bold text-foreground">
                    {tier.feeFormatted}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Frais unique • USDT (TRC20)
                </p>
              </div>

              {/* Rules Summary */}
              <div className="space-y-2 mb-6 text-sm flex-grow">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phase 1</span>
                  <span className="text-success font-medium">+{tradingRules.phase1.profitTarget}% / {tradingRules.phase1.maxDrawdown}% DD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phase 2</span>
                  <span className="text-success font-medium">+{tradingRules.phase2.profitTarget}% / {tradingRules.phase2.maxDrawdown}% DD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funded</span>
                  <span className="text-primary font-medium">{tradingRules.funded.maxDrawdown}% DD max</span>
                </div>
              </div>

              {/* CTA */}
              <Link to={`/register?capital=${tier.capital}`} className="mt-auto">
                <Button 
                  variant={tier.popular ? "hero" : "hero-outline"} 
                  size="lg" 
                  className="w-full group"
                >
                  Choisir
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="max-w-3xl mx-auto glass-card p-8">
          <h3 className="font-display text-xl font-bold text-center mb-6">
            Inclus dans tous les challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Elements */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Paiement USDT sécurisé</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Activation sous 24h</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Support disponible</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
