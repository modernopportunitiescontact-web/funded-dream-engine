import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, AlertTriangle } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { tradingRules } from "@/lib/pricing-data";

const RulesConditions = () => {
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
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
          Rules & Conditions
        </h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Complete guide to The BEST Propfirm trading rules and evaluation process.
        </p>

        <div className="space-y-12">
          {/* Introduction */}
          <section className="glass-card p-6">
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              The BEST Propfirm offers traders worldwide the opportunity to access funded trading capital by demonstrating their skills through our structured evaluation process. Success is based entirely on performance, discipline, and strict adherence to our trading rules. Any violation of these rules may result in immediate disqualification without refund.
            </p>
          </section>

          {/* Account Types */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">1</span>
              Account Types
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Synthetic Account</h3>
                <p className="text-muted-foreground text-sm">
                  Trade synthetic indices including Volatility Indices, Crash/Boom, and other synthetic instruments.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Financial (Forex) Account</h3>
                <p className="text-muted-foreground text-sm">
                  Trade forex currency pairs, commodities, and other financial instruments.
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
              <p className="text-sm text-destructive flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Trading on a market type different from your selected account type results in immediate disqualification.</span>
              </p>
            </div>
          </section>

          {/* Challenge Phases */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">2</span>
              Challenge Phases
            </h2>
            <div className="space-y-4">
              {/* Phase 1 */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Phase 1 - Initial Evaluation</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Profit Target</div>
                    <div className="text-xl font-bold text-success">+{tradingRules.phase1.profitTarget}%</div>
                  </div>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Max Drawdown</div>
                    <div className="text-xl font-bold text-destructive">{tradingRules.phase1.maxDrawdown}%</div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Demonstrate your discipline and risk management skills. No time limit to reach the target.
                </p>
              </div>

              {/* Phase 2 */}
              <div className="glass-card p-6 border-primary/30">
                <h3 className="font-semibold text-foreground mb-4">Phase 2 - Advanced Evaluation</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Profit Target</div>
                    <div className="text-xl font-bold text-success">+{tradingRules.phase2.profitTarget}%</div>
                  </div>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <div className="text-sm text-muted-foreground">Max Drawdown</div>
                    <div className="text-xl font-bold text-destructive">{tradingRules.phase2.maxDrawdown}%</div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  Confirm your consistency and trading mastery. Successfully completing this phase grants access to a Funded Account.
                </p>
              </div>
            </div>
          </section>

          {/* Funded Account */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">3</span>
              Funded Account
            </h2>
            <div className="glass-card p-6 border-success/30">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Withdrawal Target</div>
                  <div className="text-xl font-bold text-primary">+{tradingRules.funded.withdrawalTarget}%</div>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Max Drawdown</div>
                  <div className="text-xl font-bold text-destructive">{tradingRules.funded.maxDrawdown}%</div>
                </div>
              </div>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  Withdrawals available once profit reaches 10%
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  Manual validation and processing of all withdrawals
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  New funded account issued after each successful withdrawal
                </li>
              </ul>
            </div>
          </section>

          {/* Drawdown Rules */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">4</span>
              Drawdown Rules
            </h2>
            <div className="glass-card p-6 border-destructive/30">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  Drawdown is monitored continuously in real-time
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  Exceeding maximum drawdown results in immediate disqualification
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  All system decisions are automatic and final
                </li>
              </ul>
            </div>
          </section>

          {/* Payment Rules */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">5</span>
              Registration & Payments
            </h2>
            <div className="glass-card p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  Registration is only valid after payment confirmation
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  Current payment method: USDT (TRC20)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  Account activation within 24 hours of payment validation
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-destructive mt-0.5" />
                  All challenge fees are non-refundable
                </li>
              </ul>
            </div>
          </section>

          {/* Prohibited Behaviors */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">6</span>
              Prohibited Behaviors
            </h2>
            <div className="glass-card p-6 border-destructive/30">
              <p className="text-muted-foreground mb-4">The following actions result in immediate disqualification:</p>
              <ul className="grid md:grid-cols-2 gap-3 text-sm">
                {[
                  "Latency arbitrage",
                  "Price feed exploitation",
                  "Prohibited trading strategies",
                  "Trading wrong account type",
                  "System manipulation",
                  "Account sharing",
                  "Multiple accounts",
                  "Fraudulent activity",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <X className="w-4 h-4 text-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Withdrawal Policy */}
          <section>
            <h2 className="font-display text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">7</span>
              Withdrawal Policy
            </h2>
            <div className="glass-card p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  Withdrawals available only after reaching +10% profit
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  All withdrawal requests are manually validated
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  Profits are paid in full upon approval
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5" />
                  New funded account issued after withdrawal
                </li>
              </ul>
            </div>
          </section>

          {/* General Clause */}
          <section className="glass-card p-6 border-primary/30">
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">General Provisions</h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• The BEST Propfirm reserves the right to modify these rules at any time</li>
              <li>• Any fraud attempt results in immediate account termination</li>
              <li>• All platform decisions are final and not subject to appeal</li>
              <li>• By participating, you agree to all rules and conditions</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RulesConditions;
