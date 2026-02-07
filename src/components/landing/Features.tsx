import { 
  Wallet, 
  Copy, 
  BarChart3, 
  Shield, 
  Users, 
  Zap,
  Clock,
  Target
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Capital de 3,000$",
    description: "Commencez à trader avec un capital conséquent dès la première phase d'évaluation.",
  },
  {
    icon: Copy,
    title: "Copy Trading Automatique",
    description: "Vos trades sont copiés automatiquement sur nos comptes réels en arrière-plan.",
  },
  {
    icon: BarChart3,
    title: "Suivi en Temps Réel",
    description: "Dashboard complet avec suivi de vos performances, drawdown et objectifs.",
  },
  {
    icon: Shield,
    title: "Zéro Risque Personnel",
    description: "Tradez sans risquer votre propre capital. Nous assumons le risque.",
  },
  {
    icon: Target,
    title: "Objectifs Clairs",
    description: "Des objectifs de profit et drawdown transparents pour chaque phase.",
  },
  {
    icon: Clock,
    title: "Pas de Limite de Temps",
    description: "Prenez le temps qu'il vous faut pour atteindre vos objectifs.",
  },
  {
    icon: Users,
    title: "Support Dédié",
    description: "Une équipe disponible pour vous accompagner tout au long de votre parcours.",
  },
  {
    icon: Zap,
    title: "Retrait Rapide",
    description: "Demandez un retrait dès que vous atteignez 10% de profit sur votre compte Funded.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Pourquoi Choisir{" "}
            <span className="text-gradient-gold">The Best Propfirm</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une plateforme conçue pour maximiser vos chances de succès en tant que trader professionnel.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
