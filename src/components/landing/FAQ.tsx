import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment fonctionne The Best Propfirm ?",
    answer: "Vous vous inscrivez, payez les frais d'évaluation de 32$, puis recevez un compte MT5 démo avec 3,000$ de capital. Vous passez deux phases d'évaluation. Si vous réussissez, vous accédez à un compte Funded où vous pouvez retirer vos profits.",
  },
  {
    question: "Quel capital recevrai-je ?",
    answer: "Vous recevez un capital de 3,000$ pour les phases d'évaluation et le compte Funded. Ce capital est géré sur un compte démo, mais vos performances sont réelles et vos profits sont payés.",
  },
  {
    question: "Quels sont les objectifs de profit ?",
    answer: "Phase 1 : +3% de profit. Phase 2 : +9% de profit. Compte Funded : +10% pour demander un retrait. Il n'y a pas de limite de temps pour atteindre ces objectifs.",
  },
  {
    question: "Qu'est-ce que le drawdown maximum ?",
    answer: "Le drawdown est la perte maximale autorisée par rapport à votre capital. Phase 1 : 1%, Phase 2 : 3%, Funded : 4%. Si vous dépassez ces limites, votre compte est disqualifié.",
  },
  {
    question: "Comment puis-je retirer mes profits ?",
    answer: "Une fois que vous atteignez +10% de profit sur votre compte Funded, un bouton 'Demande de retrait' devient disponible dans votre dashboard. L'admin valide et traite votre paiement.",
  },
  {
    question: "Quels instruments puis-je trader ?",
    answer: "Vous pouvez choisir entre deux types de comptes : Synthetic (indices synthétiques) ou Financial (Forex). Le choix se fait lors de l'inscription.",
  },
  {
    question: "Combien de temps pour recevoir mes identifiants MT5 ?",
    answer: "Après validation de votre paiement par l'admin, vos identifiants MT5 (login, mot de passe, serveur) sont envoyés automatiquement par email sous 24h.",
  },
  {
    question: "Puis-je avoir plusieurs comptes ?",
    answer: "Non, chaque trader ne peut avoir qu'un seul compte actif. L'unicité est vérifiée par email et numéro de téléphone.",
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
            Tout ce que vous devez savoir sur notre programme de trading financé.
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
