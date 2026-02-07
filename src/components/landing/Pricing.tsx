import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const Pricing = () => {
  const features = [
    "Capital de trading: 3,000$",
    "Accès Phase 1 + Phase 2",
    "Compte MT5 démo personnel",
    "Dashboard trader complet",
    "Support par email",
    "Identifiants envoyés par email",
    "Pas de limite de temps",
    "Accès compte Funded si réussi",
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Tarif{" "}
            <span className="text-gradient-gold">Simple et Transparent</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un seul tarif, toutes les fonctionnalités. Commencez votre parcours vers le trading financé.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="glass-card p-8 md:p-10 border-primary/50 gold-glow relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Meilleure offre</span>
            </div>

            {/* Package Name */}
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold mb-2">
                Challenge Starter
              </h3>
              <p className="text-muted-foreground">
                Tout ce dont vous avez besoin pour commencer
              </p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl md:text-6xl font-bold text-gradient-gold">
                  32$
                </span>
                <span className="text-muted-foreground">/ une fois</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Paiement unique, accès complet
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link to="/register">
              <Button variant="hero" size="xl" className="w-full">
                Commencer maintenant
              </Button>
            </Link>

            {/* Guarantee */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              Validation sous 24h après paiement
            </p>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Paiement sécurisé</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Activation rapide</span>
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
