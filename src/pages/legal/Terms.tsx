import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const Terms = () => {
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
          Terms & Conditions
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to The BEST Propfirm. By accessing our platform and participating in our trading evaluation programs, you agree to be bound by these Terms & Conditions. The BEST Propfirm provides traders with the opportunity to demonstrate their trading skills and access funded trading capital based on their performance, discipline, and strict adherence to our rules.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Non-compliance with any of these rules may result in immediate disqualification from the program without refund.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">2. Account Types</h2>
            <p className="text-muted-foreground leading-relaxed">
              Traders may choose between two types of trading accounts:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li><strong>Synthetic Account:</strong> Trading on synthetic indices</li>
              <li><strong>Financial (Forex) Account:</strong> Trading on forex currency pairs</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-destructive">Important:</strong> Trading on a market type different from your selected account type will result in immediate disqualification.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">3. Challenge Phases</h2>
            
            <h3 className="font-semibold text-foreground mt-6 mb-3">Phase 1 - Initial Evaluation</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Profit Target: 3%</li>
              <li>Maximum Drawdown: 1%</li>
              <li>Objective: Demonstrate discipline and risk management</li>
              <li>28 jours maximum</li>
            </ul>

            <h3 className="font-semibold text-foreground mt-6 mb-3">Phase 2 - Advanced Evaluation</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Profit Target: 9%</li>
              <li>Maximum Drawdown: 3%</li>
              <li>Objective: Confirm consistency and risk mastery</li>
              <li>28 jours maximum</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              Progression to the next phase depends solely on meeting the profit target while respecting drawdown limits.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">4. Funded Account</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Withdrawal Threshold: 10% profit</li>
              <li>Maximum Drawdown: 10%</li>
              <li>No time limit</li>
              <li>Withdrawals are processed manually after validation</li>
              <li>After each withdrawal, a new funded account is issued with the initial capital</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">5. Drawdown Rules</h2>
            <p className="text-muted-foreground leading-relaxed">
              Drawdown is monitored continuously in real-time. Exceeding the maximum drawdown limit at any point results in immediate and automatic disqualification. All system decisions regarding drawdown violations are final and non-negotiable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">6. Registration & Payments</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Registration is only valid after payment confirmation</li>
              <li>All challenge fees are non-refundable</li>
              <li>Current payment method: USDT (TRC20)</li>
              <li>Additional payment methods may be added in the future</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">7. Prohibited Behaviors</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The following actions are strictly prohibited and will result in immediate disqualification:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Latency arbitrage</li>
              <li>Exploitation of price feed errors</li>
              <li>Use of prohibited trading strategies</li>
              <li>Trading on incorrect account type</li>
              <li>System manipulation attempts</li>
              <li>Account sharing or third-party trading</li>
              <li>Use of multiple accounts per person</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">8. Withdrawal Policy</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Withdrawals are only available after reaching 10% profit on funded accounts</li>
              <li>All withdrawal requests are manually reviewed and processed</li>
              <li>Profits are paid in full upon approval</li>
              <li>A new funded account is issued after each successful withdrawal</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">9. Trader Responsibilities</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Maintain confidentiality of login credentials</li>
              <li>Comply with all trading rules at all times</li>
              <li>Understand that accounts are for performance evaluation purposes</li>
              <li>Accept full responsibility for all trading decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">10. General Provisions</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>The BEST Propfirm reserves the right to modify these terms at any time</li>
              <li>Any fraud attempt results in immediate account termination</li>
              <li>All platform decisions are final</li>
              <li>These terms are governed by applicable international trading laws</li>
            </ul>
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

export default Terms;
