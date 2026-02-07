import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const RiskDisclosure = () => {
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
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="w-10 h-10 text-destructive" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
            Risk Disclosure
          </h1>
        </div>

        <div className="glass-card p-6 mb-8 border-destructive/30">
          <p className="text-foreground font-semibold">
            IMPORTANT: Please read this Risk Disclosure carefully before participating in any trading activities with The BEST Propfirm. Trading in financial markets involves substantial risk of loss.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">1. Trading Risks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trading in foreign exchange (Forex), synthetic indices, and other financial instruments carries a high level of risk and may not be suitable for all individuals. The volatile nature of financial markets means that significant losses can occur rapidly and without warning.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You should carefully consider whether trading is appropriate for you in light of your financial situation, experience level, and risk tolerance. You should be aware that you could lose some or all of your initial investment.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">2. No Guarantee of Profits</h2>
            <p className="text-muted-foreground leading-relaxed">
              The BEST Propfirm makes no representations or guarantees regarding:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Your ability to generate profits</li>
              <li>The success rate of traders on our platform</li>
              <li>The likelihood of passing evaluation phases</li>
              <li>Future trading performance based on past results</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4 font-semibold">
              Past performance is not indicative of future results.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">3. Trader Responsibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              As a trader, you are solely responsible for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>All trading decisions and their consequences</li>
              <li>Proper risk management and position sizing</li>
              <li>Understanding and following all trading rules</li>
              <li>Educating yourself about market dynamics</li>
              <li>Managing emotional and psychological aspects of trading</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">4. Market Conditions</h2>
            <p className="text-muted-foreground leading-relaxed">
              Financial markets are subject to various conditions that may affect your trading, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li><strong>Volatility:</strong> Prices can fluctuate dramatically within short periods</li>
              <li><strong>Slippage:</strong> Executed prices may differ from requested prices</li>
              <li><strong>Gaps:</strong> Markets may open at significantly different prices than previous closes</li>
              <li><strong>Liquidity:</strong> Some instruments may have limited liquidity during certain periods</li>
              <li><strong>News Events:</strong> Economic announcements and geopolitical events can cause extreme market movements</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">5. Technology Risks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trading platforms and technology systems may experience issues including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Internet connectivity problems</li>
              <li>Platform downtime or technical failures</li>
              <li>Order execution delays</li>
              <li>Data feed interruptions</li>
              <li>Software bugs or errors</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              The BEST Propfirm is not responsible for losses resulting from technological failures beyond our control.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">6. Nature of Evaluation Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              The accounts provided by The BEST Propfirm are demonstration (demo) accounts used for the purpose of evaluating trading skills and performance. These accounts:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Operate with virtual funds during evaluation phases</li>
              <li>Are subject to all platform rules and conditions</li>
              <li>May be terminated at any time for rule violations</li>
              <li>Do not constitute real trading accounts</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">7. Challenge Fees</h2>
            <p className="text-muted-foreground leading-relaxed">
              Challenge fees are:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Non-refundable under any circumstances</li>
              <li>Not investment funds</li>
              <li>Fees for access to the evaluation program</li>
              <li>Not guaranteed to result in funded account access</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">8. Acceptance of Risk</h2>
            <div className="glass-card p-6 border-primary/30">
              <p className="text-foreground leading-relaxed">
                By registering for and participating in The BEST Propfirm programs, you acknowledge that you have read, understood, and accept all risks disclosed in this document. You confirm that you are making an informed decision to participate and that you will not hold The BEST Propfirm liable for any trading losses or failed evaluation attempts.
              </p>
            </div>
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

export default RiskDisclosure;
