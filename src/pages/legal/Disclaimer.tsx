import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const Disclaimer = () => {
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
          <AlertTriangle className="w-10 h-10 text-accent" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
            Trading Disclaimer
          </h1>
        </div>

        <div className="glass-card p-6 mb-8 border-destructive/30">
          <p className="text-foreground font-semibold text-center">
            TRADING INVOLVES SIGNIFICANT RISK. PLEASE READ THIS DISCLAIMER CAREFULLY.
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">1. General Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information and services provided by The BEST Propfirm are for educational and evaluation purposes only. Nothing on this platform should be construed as financial advice, investment advice, or trading recommendations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">2. Nature of Demo Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              All trading accounts provided by The BEST Propfirm are demonstration (demo) accounts. These accounts:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Use virtual/simulated funds</li>
              <li>Are designed to evaluate trading skills and discipline</li>
              <li>May not perfectly replicate real market conditions</li>
              <li>Are subject to all platform rules and may be terminated at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">3. Not Investment Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The BEST Propfirm does not provide:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Investment advice or recommendations</li>
              <li>Trading signals or strategies</li>
              <li>Financial planning services</li>
              <li>Portfolio management</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All trading decisions are made solely by the trader at their own risk.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">4. Past Performance</h2>
            <p className="text-muted-foreground leading-relaxed font-semibold">
              PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Any performance data, statistics, or testimonials shown on this platform:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Do not guarantee similar results for other traders</li>
              <li>May not account for all market conditions</li>
              <li>Should not be used as a basis for trading decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">5. Challenge Fees</h2>
            <p className="text-muted-foreground leading-relaxed">
              Challenge fees paid to The BEST Propfirm:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Are fees for access to the evaluation program</li>
              <li>Are NOT investments or deposits</li>
              <li>Are non-refundable regardless of outcome</li>
              <li>Do not guarantee access to funded trading capital</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">6. Disqualification</h2>
            <p className="text-muted-foreground leading-relaxed">
              The BEST Propfirm reserves the right to disqualify any trader for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Violation of trading rules (including drawdown limits)</li>
              <li>Suspected manipulation or abuse</li>
              <li>Use of prohibited trading strategies</li>
              <li>Providing false information</li>
              <li>Any behavior deemed harmful to the platform</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All disqualification decisions are final and not subject to appeal.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">7. Third-Party Platforms</h2>
            <p className="text-muted-foreground leading-relaxed">
              The BEST Propfirm uses MetaTrader 5 and other third-party services:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>We are not responsible for third-party platform failures</li>
              <li>Execution issues beyond our control are not compensated</li>
              <li>Traders must accept third-party platform terms of service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, The BEST Propfirm shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Trading losses incurred during evaluation or funded phases</li>
              <li>Loss of profits or expected earnings</li>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Platform downtime or technical issues</li>
              <li>Decisions made based on platform information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">9. Acknowledgment</h2>
            <div className="glass-card p-6 border-primary/30">
              <p className="text-foreground leading-relaxed">
                By using The BEST Propfirm services, you acknowledge that you have read, understood, and agree to this disclaimer. You accept full responsibility for your trading decisions and understand that trading carries substantial risk of loss.
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

export default Disclaimer;
