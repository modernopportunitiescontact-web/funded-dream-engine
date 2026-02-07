import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Wallet, 
  Target, 
  AlertTriangle,
  History,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  DollarSign
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { tradingRules } from "@/lib/pricing-data";

// Mock data for demo
const mockTraderData = {
  name: "Jean Dupont",
  email: "jean.dupont@email.com",
  phase: "Phase 1",
  accountType: "Synthetic",
  capital: 50000,
  balance: 50000,
  equity: 50750,
  profit: 750,
  profitPercent: 1.5,
  targetPercent: tradingRules.phase1.profitTarget,
  drawdown: 0.3,
  maxDrawdown: tradingRules.phase1.maxDrawdown,
  status: "active",
  mt5Login: "12345678",
  trades: [
    { id: 1, pair: "Volatility 75 Index", type: "buy", volume: 0.5, profit: 425.50, time: "2024-01-15 14:32" },
    { id: 2, pair: "Volatility 100 Index", type: "sell", volume: 0.25, profit: -123.30, time: "2024-01-15 10:15" },
    { id: 3, pair: "Volatility 50 Index", type: "buy", volume: 1.0, profit: 447.80, time: "2024-01-14 16:45" },
  ]
};

const Dashboard = () => {
  const [trader] = useState(mockTraderData);
  
  const profitProgress = (trader.profitPercent / trader.targetPercent) * 100;
  const drawdownProgress = (trader.drawdown / trader.maxDrawdown) * 100;
  const canWithdraw = trader.phase === "Funded" && trader.profitPercent >= tradingRules.funded.withdrawalTarget;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <BrandLogo size="sm" linkTo="/" />

            {/* Phase Badge */}
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full">
                <span className="text-sm font-medium text-primary">{trader.phase}</span>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-medium">{trader.name.charAt(0)}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Bienvenue, <span className="text-gradient-gold">{trader.name}</span>
          </h1>
          <p className="text-muted-foreground">
            Votre tableau de bord • {trader.accountType} • Capital: ${trader.capital.toLocaleString()}
          </p>
        </div>

        {/* Withdrawal Button (for Funded accounts) */}
        {trader.phase === "Funded" && (
          <div className={`mb-6 p-4 rounded-xl ${canWithdraw ? 'bg-success/10 border border-success/30' : 'bg-secondary/50'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-success" />
                  Retrait
                </h3>
                <p className="text-sm text-muted-foreground">
                  {canWithdraw 
                    ? "Vous êtes éligible au retrait !" 
                    : `Atteignez +${tradingRules.funded.withdrawalTarget}% de profit pour demander un retrait`
                  }
                </p>
              </div>
              <Button 
                variant={canWithdraw ? "hero" : "ghost"} 
                disabled={!canWithdraw}
              >
                Demander un retrait
              </Button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Balance */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Solde</div>
            <div className="font-display text-2xl font-bold">
              ${trader.balance.toLocaleString()}
            </div>
          </div>

          {/* Equity */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Équité</div>
            <div className="font-display text-2xl font-bold">
              ${trader.equity.toLocaleString()}
            </div>
          </div>

          {/* Profit */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                trader.profit >= 0 ? "bg-success/10" : "bg-destructive/10"
              }`}>
                {trader.profit >= 0 ? (
                  <ArrowUpRight className="w-5 h-5 text-success" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-destructive" />
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Profit</div>
            <div className={`font-display text-2xl font-bold ${
              trader.profit >= 0 ? "text-success" : "text-destructive"
            }`}>
              {trader.profit >= 0 ? "+" : ""}${trader.profit.toFixed(2)} ({trader.profitPercent}%)
            </div>
          </div>

          {/* Drawdown */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-1">Drawdown</div>
            <div className="font-display text-2xl font-bold">
              {trader.drawdown}% <span className="text-sm text-muted-foreground font-normal">/ {trader.maxDrawdown}%</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profit Target Progress */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Objectif de Profit
              </h3>
              <span className="text-sm text-muted-foreground">
                {trader.profitPercent}% / {trader.targetPercent}%
              </span>
            </div>
            <div className="h-4 bg-secondary rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${Math.min(profitProgress, 100)}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {profitProgress >= 100 
                ? "🎉 Objectif atteint ! Passage à la phase suivante."
                : `Encore ${(trader.targetPercent - trader.profitPercent).toFixed(2)}% pour atteindre l'objectif`
              }
            </p>
          </div>

          {/* Drawdown Progress */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Limite de Drawdown
              </h3>
              <span className="text-sm text-muted-foreground">
                {trader.drawdown}% / {trader.maxDrawdown}%
              </span>
            </div>
            <div className="h-4 bg-secondary rounded-full overflow-hidden mb-2">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  drawdownProgress > 80 ? "bg-destructive" : drawdownProgress > 50 ? "bg-yellow-500" : "bg-success"
                }`}
                style={{ width: `${Math.min(drawdownProgress, 100)}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {drawdownProgress >= 100 
                ? "⚠️ Limite atteinte. Compte disqualifié."
                : `Marge restante : ${(trader.maxDrawdown - trader.drawdown).toFixed(2)}%`
              }
            </p>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Historique des Trades
            </h3>
            <Button variant="ghost" size="sm">
              Voir tout
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Paire</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Volume</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">P/L</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {trader.trades.map((trade) => (
                  <tr key={trade.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 font-medium">{trade.pair}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.type === "buy" 
                          ? "bg-success/20 text-success" 
                          : "bg-destructive/20 text-destructive"
                      }`}>
                        {trade.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">{trade.volume}</td>
                    <td className={`py-3 px-4 font-medium ${
                      trade.profit >= 0 ? "text-success" : "text-destructive"
                    }`}>
                      {trade.profit >= 0 ? "+" : ""}${trade.profit.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {trade.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MT5 Info */}
        <div className="mt-6 glass-card p-6">
          <h3 className="font-display font-semibold mb-4">Informations MT5</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Login</div>
              <div className="font-mono font-medium">{trader.mt5Login}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Serveur</div>
              <div className="font-mono font-medium">Deriv-Demo</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Statut</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-success font-medium">Actif</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
