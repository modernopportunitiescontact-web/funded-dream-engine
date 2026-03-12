import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Target, AlertTriangle, Eye, EyeOff, ChevronLeft, ChevronRight
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { tradingRules } from "@/lib/pricing-data";
import { useAuth } from "@/hooks/useAuth";
import { fetchMyRegistration, fetchMT5Account, createRegistration, fetchRegistrationsByUserId } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

const phaseLabel = (status: string) => {
  if (status === "funded") return "Funded";
  if (status === "phase2") return "Phase 2";
  if (status === "disqualified") return "Disqualifié";
  return "Phase 1";
};

const phaseBadgeClass = (status: string) => {
  if (status === "funded") return "bg-success/20 text-success border-success/30";
  if (status === "phase2") return "bg-primary/20 text-primary border-primary/30";
  if (status === "disqualified") return "bg-destructive/20 text-destructive border-destructive/30";
  return "bg-accent/20 text-accent border-accent/30";
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mt5Accounts, setMt5Accounts] = useState<Record<string, any>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      try {
        // Handle pending registration from signup flow
        const pendingReg = localStorage.getItem("pending_registration");
        let existingRegs = await fetchRegistrationsByUserId(user.id);

        if (existingRegs.length === 0 && pendingReg) {
          try {
            const pendingData = JSON.parse(pendingReg);
            await createRegistration({
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
            existingRegs = await fetchRegistrationsByUserId(user.id);
          } catch (regErr) {
            console.error("Failed to create pending registration", regErr);
          }
        }

        setRegistrations(existingRegs);

        // Load MT5 accounts for all registrations in parallel
        const mt5Map: Record<string, any> = {};
        await Promise.all(
          existingRegs.map(async (reg: any) => {
            try {
              const mt5 = await fetchMT5Account(reg.id);
              if (mt5) mt5Map[reg.id] = mt5;
            } catch {}
          })
        );
        setMt5Accounts(mt5Map);
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

  const registration = registrations[activeIndex] ?? null;
  const mt5Account = registration ? mt5Accounts[registration.id] : null;
  const phase = registration?.status ?? "pending";
  const rules = phase === "funded" ? tradingRules.funded : phase === "phase2" ? tradingRules.phase2 : tradingRules.phase1;
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
              {registration && isPaid && (
                <div className={`px-3 py-1.5 border rounded-full ${phaseBadgeClass(phase)}`}>
                  <span className="text-sm font-medium">{phaseLabel(phase)}</span>
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

        {/* Account Selector - only show if multiple accounts */}
        {registrations.length > 1 && (
          <div className="glass-card p-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-muted-foreground">Mes Comptes ({registrations.length})</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={activeIndex === 0} onClick={() => { setActiveIndex(activeIndex - 1); setShowPassword(false); }}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">{activeIndex + 1} / {registrations.length}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={activeIndex === registrations.length - 1} onClick={() => { setActiveIndex(activeIndex + 1); setShowPassword(false); }}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {registrations.map((reg: any, i: number) => (
                <button
                  key={reg.id}
                  onClick={() => { setActiveIndex(i); setShowPassword(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    i === activeIndex
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {reg.account_type} ${reg.plan_capital?.toLocaleString()} — {phaseLabel(reg.status)}
                  {reg.payment_method === "cadeau" && " 🎁"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Registration Status */}
        {registration && (
          <div className="glass-card p-6 mb-6">
            <h3 className="font-display font-semibold mb-4">Mon Inscription</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Plan</div>
                <div className="font-medium">${capital.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-medium">{registration.account_type}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Phase</div>
                <div className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${phaseBadgeClass(phase)}`}>
                  {phaseLabel(phase)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Paiement</div>
                <div className={`font-medium ${isPaid ? "text-success" : "text-accent"}`}>
                  {isPaid ? "✅ Validé" : "⏳ En attente"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Date</div>
                <div className="font-medium">{new Date(registration.created_at).toLocaleDateString("fr-FR")}</div>
              </div>
            </div>
          </div>
        )}

        {/* MT5 Credentials */}
        {registration && (
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
        )}

        {/* Profit/Drawdown */}
        {isPaid && hasMT5 && phase !== "disqualified" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />Objectif de Profit
                </h3>
                <span className="text-sm text-muted-foreground">
                  0% / {phase === "funded" ? (tradingRules.funded as any).withdrawalTarget : phase === "phase2" ? tradingRules.phase2.profitTarget : tradingRules.phase1.profitTarget}%
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
                  0% / {phase === "funded" ? tradingRules.funded.maxDrawdown : phase === "phase2" ? tradingRules.phase2.maxDrawdown : tradingRules.phase1.maxDrawdown}%
                </span>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-success rounded-full" style={{ width: "0%" }} />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Marge de sécurité complète</p>
            </div>
          </div>
        )}

        {/* Disqualified notice */}
        {phase === "disqualified" && (
          <div className="glass-card p-6 mb-6 border-destructive/30">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <div>
                <h3 className="font-display font-semibold text-destructive">Compte Disqualifié</h3>
                <p className="text-sm text-muted-foreground">Ce compte a été disqualifié. Contactez le support pour plus d'informations.</p>
              </div>
            </div>
          </div>
        )}

        {registrations.length === 0 && (
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
