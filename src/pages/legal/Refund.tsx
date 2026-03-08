import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const Refund = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BrandLogo size="sm" />
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8 text-gradient-gold">
          Refund Policy
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="glass-card p-6 border-destructive/30">
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">Important Notice</h2>
            <p className="text-foreground font-semibold">
              All challenge fees paid to The BEST Propfirm are NON-REFUNDABLE. By purchasing a challenge, you acknowledge and accept this policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">1. No Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The BEST Propfirm operates under a strict no-refund policy. Once payment is made for a trading challenge, the fee is non-refundable under any circumstances, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Failure to pass evaluation phases</li>
              <li>Disqualification due to rule violations</li>
              <li>Change of mind after purchase</li>
              <li>Inability to trade</li>
              <li>Technical issues on trader's end</li>
              <li>Drawdown limit exceeded</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">2. Nature of Challenge Fees</h2>
            <p className="text-muted-foreground leading-relaxed">
              Challenge fees are:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Access fees for the evaluation program, not investments</li>
              <li>Payment for the opportunity to demonstrate trading skills</li>
              <li>Not conditional on success or passing the evaluation</li>
              <li>Final and non-negotiable once processed</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">3. Account Activation</h2>
            <p className="text-muted-foreground leading-relaxed">
              Upon payment confirmation:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Your account will be activated within 24 hours</li>
              <li>MT5 credentials will be sent to your registered email</li>
              <li>Once credentials are issued, no refund requests will be considered</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">4. Exceptional Circumstances</h2>
            <p className="text-muted-foreground leading-relaxed">
              In rare cases, The BEST Propfirm may consider account credits (not refunds) for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Documented platform errors directly caused by The BEST Propfirm</li>
              <li>Payment processed but account never activated due to our error</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Any such consideration is at the sole discretion of The BEST Propfirm management and is not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">5. Chargebacks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Initiating a chargeback or payment dispute after purchasing a challenge will result in:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Immediate termination of your account</li>
              <li>Permanent ban from The BEST Propfirm platform</li>
              <li>Potential legal action to recover funds</li>
              <li>Reporting to fraud prevention databases</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">6. New Challenge After Failure</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you fail an evaluation phase or are disqualified:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>You may purchase a new challenge at any time</li>
              <li>No discounts are applied for previous failures</li>
              <li>Each challenge is an independent evaluation</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions regarding this policy, contact us at: <a href="mailto:contact@the_best_propfirm.com" className="text-primary hover:underline">contact@the_best_propfirm.com</a>
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Last updated: February 2024
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Refund;
