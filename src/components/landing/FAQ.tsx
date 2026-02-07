import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { tradingRules } from "@/lib/pricing-data";

const faqs = [
  {
    question: "Qu'est-ce que The BEST Propfirm ?",
    answer: "The BEST Propfirm est une plateforme qui permet aux traders talentueux de prouver leurs compétences et d'accéder à un capital de trading financé. Nous croyons au talent et à la discipline, pas à la chance. Passez nos phases d'évaluation et tradez avec notre capital.",
  },
  {
    question: "Comment fonctionne le challenge ?",
    answer: `Le challenge se déroule en deux phases d'évaluation : Phase 1 (Objectif +${tradingRules.phase1.profitTarget}%, Drawdown max ${tradingRules.phase1.maxDrawdown}%) et Phase 2 (Objectif +${tradingRules.phase2.profitTarget}%, Drawdown max ${tradingRules.phase2.maxDrawdown}%). Réussissez les deux phases pour accéder à votre compte Funded.`,
  },
  {
    question: "Quels capitaux sont disponibles ?",
    answer: "Nous proposons 5 niveaux de capital : 3,000$, 10,000$, 50,000$, 100,000$ et 500,000$. Choisissez le capital qui correspond à votre niveau d'expérience et à votre ambition de trading.",
  },
  {
    question: "Que se passe-t-il si je dépasse le drawdown ?",
    answer: "Si vous dépassez le drawdown maximum autorisé (1% en Phase 1, 3% en Phase 2, 10% en Funded), votre compte est automatiquement disqualifié. Le système surveille le drawdown en temps réel.",
  },
  {
    question: "Puis-je recommencer après un échec ?",
    answer: "Oui, vous pouvez acheter un nouveau challenge à tout moment après une disqualification. Chaque challenge est une évaluation indépendante.",
  },
  {
    question: "Quand puis-je retirer mes gains ?",
    answer: `Sur votre compte Funded, vous pouvez demander un retrait dès que vous atteignez +${tradingRules.funded.withdrawalTarget}% de profit. Le drawdown maximum sur le compte Funded est de ${tradingRules.funded.maxDrawdown}%.`,
  },
  {
    question: "Les retraits sont-ils automatiques ?",
    answer: "Non, les retraits sont validés manuellement par notre équipe après vérification. Une fois approuvé, votre profit est payé et vous recevez un nouveau compte Funded pour continuer à trader.",
  },
  {
    question: "Quels marchés puis-je trader ?",
    answer: "Vous choisissez votre type de compte lors de l'inscription : Compte Synthétique (indices synthétiques) ou Compte Financial (Forex). Vous devez obligatoirement trader sur le type de marché sélectionné.",
  },
  {
    question: "Quels sont les moyens de paiement ?",
    answer: "Actuellement, nous acceptons uniquement les paiements en crypto USDT (réseau TRC20). D'autres méthodes de paiement seront ajoutées prochainement.",
  },
  {
    question: "Puis-je utiliser un robot ou EA ?",
    answer: "L'utilisation d'Expert Advisors (EA) est autorisée tant qu'elle respecte nos règles de trading. Les stratégies d'arbitrage, de manipulation ou d'exploitation de failles sont strictement interdites.",
  },
  {
    question: "Que se passe-t-il après un retrait ?",
    answer: "Après chaque retrait validé, vous recevez automatiquement un nouveau compte Funded avec le capital initial. Le cycle recommence et vous pouvez continuer à générer des profits.",
  },
  {
    question: "Combien de temps pour recevoir mes identifiants ?",
    answer: "Après validation de votre paiement par notre équipe, vos identifiants MT5 (login, mot de passe, serveur) sont envoyés par email sous 24 heures maximum.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32 relative bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Questions{" "}
            <span className="text-gradient-gold">Fréquentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur The BEST Propfirm et notre programme de trading financé.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card border-none px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
