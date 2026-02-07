import { Check, ArrowRight, TrendingUp, AlertTriangle, Trophy } from "lucide-react";
import { tradingRules } from "@/lib/pricing-data";

const phases = [
  {
    phase: "Phase 1",
    title: "Évaluation Initiale",
    subtitle: "Prouvez votre discipline",
    profitTarget: `+${tradingRules.phase1.profitTarget}%`,
    maxDrawdown: `${tradingRules.phase1.maxDrawdown}%`,
    description: "Démontrez votre discipline et votre gestion du risque avec un objectif de profit modéré.",
    features: [
      `Objectif de profit: +${tradingRules.phase1.profitTarget}%`,
      `Drawdown maximum: ${tradingRules.phase1.maxDrawdown}%`,
      "Pas de limite de temps",
      "Tous styles de trading acceptés",
      "Passage automatique si objectif atteint",
    ],
    icon: TrendingUp,
    color: "primary",
  },
  {
    phase: "Phase 2",
    title: "Confirmation",
    subtitle: "Confirmez votre talent",
    profitTarget: `+${tradingRules.phase2.profitTarget}%`,
    maxDrawdown: `${tradingRules.phase2.maxDrawdown}%`,
    description: "Confirmez votre constance avec un objectif plus élevé tout en respectant des règles strictes de gestion du risque.",
    features: [
      `Objectif de profit: +${tradingRules.phase2.profitTarget}%`,
      `Drawdown maximum: ${tradingRules.phase2.maxDrawdown}%`,
      "Pas de limite de temps",
      "Mêmes règles de trading",
      "Accès au compte Funded si réussi",
    ],
    highlighted: true,
    icon: TrendingUp,
    color: "accent",
  },
  {
    phase: "Funded",
    title: "Compte Financé",
    subtitle: "Tradez et retirez vos gains",
    profitTarget: `${tradingRules.funded.withdrawalTarget}% pour retrait`,
    maxDrawdown: `${tradingRules.funded.maxDrawdown}%`,
    description: "Tradez avec notre capital et retirez vos profits. Votre discipline devient votre revenu.",
    features: [
      "Capital financé par The BEST Propfirm",
      `Retrait possible à +${tradingRules.funded.withdrawalTarget}% de profit`,
      `Drawdown maximum: ${tradingRules.funded.maxDrawdown}%`,
      "Retraits illimités",
      "Nouveau compte après chaque retrait",
    ],
    icon: Trophy,
    color: "success",
  },
];

const Phases = () => {
  return (
    <section id="phases" className="py-20 md:py-32 relative bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Comment ça{" "}
            <span className="text-gradient-gold">Marche</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un parcours en 3 étapes vers votre compte de trading financé. Prouvez votre talent, pas votre chance.
          </p>
        </div>

        {/* Phases Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          {phases.map((phase, index) => {
            const IconComponent = phase.icon;
            return (
              <div
                key={index}
                className={`glass-card p-6 md:p-8 relative z-10 ${
                  phase.highlighted
                    ? "border-primary/50 gold-glow"
                    : ""
                }`}
              >
                {phase.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold rounded-full text-xs font-bold text-primary-foreground">
                    ÉTAPE CLÉ
                  </div>
                )}

                {/* Phase Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    phase.color === "success" ? "bg-success/20 text-success" : 
                    phase.color === "accent" ? "bg-accent/20 text-accent" :
                    "bg-primary/20 text-primary"
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{phase.phase}</span>
                    <h3 className="font-display text-xl font-bold">{phase.title}</h3>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-primary font-medium mb-4">{phase.subtitle}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background/50 rounded-xl">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Objectif</div>
                    <div className="font-display text-xl font-bold text-success">{phase.profitTarget}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <AlertTriangle className="w-3 h-3 text-destructive" />
                      <span>Drawdown max</span>
                    </div>
                    <div className="font-display text-xl font-bold text-destructive">{phase.maxDrawdown}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6">
                  {phase.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {phase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Arrow (except last) */}
                {index < phases.length - 1 && (
                  <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background border border-border rounded-full items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            <span className="text-primary font-semibold">Pas besoin de capital</span> pour commencer.{" "}
            <span className="text-primary font-semibold">Prouvez votre talent</span> et accédez à des fonds.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Phases;
