import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, Wallet, Target, AlertTriangle, History,
  ChevronDown, ArrowUpRight, ArrowDownRight, Clock, DollarSign,
  Eye, EyeOff
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { tradingRules } from "@/lib/pricing-data";
import { useAuth } from "@/hooks/useAuth";
import { fetchMyRegistration, fetchMT5Account, createRegistration } from "@/lib/api";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [registration, setRegistration] = useState<any>(null);
  const [mt5Account, setMt5Account] = useState<any>(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      try {
        // Check for pending registration from signup flow
        const pendingReg = localStorage.getItem("pending_registration");
        let reg = await fetchMyRegistration(user.id);
        
        if (!reg && pendingReg) {
          try {
            const pendingData = JSON.parse(pendingReg);
            reg = await createRegistration({
              user_id: user.id,
              full_name: pendingData.full_name,
              email: pendingData.email,
              phone: pendingData.phone,
              country: pendingData.country,
              account_type: pendingData.account_type,
              capital_tier: pendingData.capital_tier,
              plan_capital: pendingData.plan_capital,
              fee_expected: pendingData.fee_expected,
            });
            localStorage.removeItem("pending_registration");
          } catch (regErr) {
            console.error("Failed to create pending registration", regErr);
          }
        }
        
        setRegistration(reg);
        if (reg) {
          const mt5 = await fetchMT5Account(reg.id);
          setMt5Account(mt5);

        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const phase = registration?.status === "funded" ? "Funded" : registration?.status === "phase2" ? "Phase 2" : "Phase 1";
  const rules = phase === "Funded" ? tradingRules.funded : phase === "Phase 2" ? tradingRules.phase2 : tradingRules.phase1;
  const capital = registration?.plan_capital ?? 0;
  const isPaid = registration?.payment_status === "paid";
  const hasMT5 = mt5Account?.status === "created";

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <BrandLogo size="sm" linkTo="/" />
            <div className="flex items-center gap-4">
              {isPaid && (
                <div className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full">
                  <span className="text-sm font-medium text-primary">{phase}</span>
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={signOut}>Déconnexion</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Bienvenue, <span className="text-gradient-gold">{registration?.full_name ?? user?.email}</span>
          </h1>
          <p className="text-muted-foreground">
            {isPaid ? `Capital: $${capital.toLocaleString()} • ${registration?.account_type}` : "En attente de validation du paiement"}
          </p>
        </div>

        {/* Registration Status */}
        <div className="glass-card p-6 mb-6">
          <h3 className="font-display font-semibold mb-4">Mon Inscription</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Plan</div>
              <div className="font-medium">${capital.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Type</div>
              <div className="font-medium">{registration?.account_type ?? "-"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Statut paiement</div>
              <div className={`font-medium ${isPaid ? "text-success" : "text-accent"}`}>
                {isPaid ? "✅ Validé" : "⏳ En attente"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Date</div>
              <div className="font-medium">{registration ? new Date(registration.created_at).toLocaleDateString("fr-FR") : "-"}</div>
            </div>
          </div>
        </div>

        {/* MT5 Credentials */}
        <div className="glass-card p-6 mb-6">
          <h3 className="font-display font-semibold mb-4">Mon Compte MT5</h3>
          {hasMT5 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Login</div>
                <div className="font-mono font-medium">{mt5Account.mt5_login}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Mot de passe</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">{showPassword ? mt5Account.mt5_password : "••••••••"}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Serveur</div>
                <div className="font-mono font-medium">{mt5Account.mt5_server}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Statut</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-success font-medium">Actif</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              {isPaid ? "Vos identifiants MT5 seront disponibles prochainement." : "Disponible après validation du paiement."}
            </p>
          )}
        </div>


        {/* Profit/Drawdown (only for paid + MT5 active) */}
        {isPaid && hasMT5 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />Objectif de Profit
                </h3>
                <span className="text-sm text-muted-foreground">
                  0% / {phase === "Funded" ? tradingRules.funded.withdrawalTarget : phase === "Phase 2" ? tradingRules.phase2.profitTarget : tradingRules.phase1.profitTarget}%
                </span>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: "0%" }} />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Les données de trading seront synchronisées avec MT5</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />Limite de Drawdown
                </h3>
                <span className="text-sm text-muted-foreground">
                  0% / {phase === "Funded" ? tradingRules.funded.maxDrawdown : phase === "Phase 2" ? tradingRules.phase2.maxDrawdown : tradingRules.phase1.maxDrawdown}%
                </span>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: "0%" }} />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Marge de sécurité complète</p>
            </div>
          </div>
        )}

        {!registration && (
          <div className="glass-card p-8 text-center">
            <h3 className="font-display text-xl font-bold mb-2">Aucune inscription trouvée</h3>
            <p className="text-muted-foreground mb-4">Commencez votre challenge en vous inscrivant</p>
            <Button variant="hero" asChild><Link to="/register">S'inscrire</Link></Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
