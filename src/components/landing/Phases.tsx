import { Check, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Évaluation",
    capital: "3,000$",
    profitTarget: "+3%",
    maxDrawdown: "1%",
    description: "Prouvez vos compétences de base en atteignant l'objectif de profit tout en respectant les règles de drawdown.",
    features: [
      "Capital de départ: 3,000$",
      "Objectif de profit: +3%",
      "Drawdown maximum: 1%",
      "Pas de limite de temps",
      "Tous styles de trading acceptés",
    ],
  },
  {
    phase: "Phase 2",
    title: "Confirmation",
    capital: "3,000$",
    profitTarget: "+9%",
    maxDrawdown: "3%",
    description: "Confirmez votre constance en atteignant un objectif plus ambitieux avec des règles de drawdown ajustées.",
    features: [
      "Capital maintenu: 3,000$",
      "Objectif de profit: +9%",
      "Drawdown maximum: 3%",
      "Pas de limite de temps",
      "Accès au compte Funded si réussi",
    ],
    highlighted: true,
  },
  {
    phase: "Funded",
    title: "Compte Financé",
    capital: "3,000$+",
    profitTarget: "10% pour retrait",
    maxDrawdown: "4%",
    description: "Tradez avec notre capital et gardez vos profits. Demandez un retrait dès 10% de gains.",
    features: [
      "Capital financé par la propfirm",
      "Retrait possible à +10% de profit",
      "Drawdown maximum: 4%",
      "Retraits illimités",
      "Nouveau compte après chaque retrait",
    ],
  },
];

const Phases = () => {
  return (
    <section id="phases" className="py-20 md:py-32 relative bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Les Phases{" "}
            <span className="text-gradient-gold">d'Évaluation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un parcours en 3 étapes vers votre compte de trading financé.
          </p>
        </div>

        {/* Phases Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          {phases.map((phase, index) => (
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
                  POPULAIRE
                </div>
              )}

              {/* Phase Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index === 2 ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                }`}>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{phase.phase}</span>
                  <h3 className="font-display text-xl font-bold">{phase.title}</h3>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background/50 rounded-xl">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Capital</div>
                  <div className="font-display text-xl font-bold text-gradient-gold">{phase.capital}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Objectif</div>
                  <div className="font-display text-xl font-bold text-success">{phase.profitTarget}</div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-muted-foreground">Drawdown max:</span>
                    <span className="font-semibold text-destructive">{phase.maxDrawdown}</span>
                  </div>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Phases;
