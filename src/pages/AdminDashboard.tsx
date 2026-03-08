import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Clock, ArrowUpRight, Wallet, RefreshCw, Eye, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRegistrations, fetchAllMT5Accounts, fetchAllCopyLinks } from "@/lib/api";
import InscriptionsTab from "@/components/admin/InscriptionsTab";
import PaiementsTab from "@/components/admin/PaiementsTab";
import MT5ProvisioningTab from "@/components/admin/MT5ProvisioningTab";
import CopyTradingTab from "@/components/admin/CopyTradingTab";
import ArchivesTab from "@/components/admin/ArchivesTab";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [mt5Accounts, setMt5Accounts] = useState<any[]>([]);
  const [copyLinks, setCopyLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [regs, mt5s, links] = await Promise.all([
        fetchAllRegistrations(),
        fetchAllMT5Accounts(),
        fetchAllCopyLinks(),
      ]);
      setRegistrations(regs);
      setMt5Accounts(mt5s);
      setCopyLinks(links);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Realtime subscriptions
  useEffect(() => {
    const channel = supabase
      .channel("admin-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "registrations" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "mt5_accounts" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "copy_links" }, () => loadData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [loadData]);

  const activeRegs = registrations.filter((r: any) => !r.archived_at);
  const archivedCount = registrations.filter((r: any) => r.archived_at).length;

  const stats = {
    total: activeRegs.length,
    paid: activeRegs.filter((r) => r.payment_status === "paid").length,
    pending: activeRegs.filter((r) => r.payment_status === "pending").length,
    revenue: activeRegs.filter((r) => r.payment_status === "paid").reduce((s, r) => s + (r.amount_paid ?? r.fee_expected ?? 0), 0),
    mt5Pending: activeRegs.filter((r) => {
      if (r.payment_status !== "paid") return false;
      const mt5 = mt5Accounts.find((m: any) => m.registration_id === r.id);
      return !mt5 || mt5.status === "pending";
    }).length,
    archived: archivedCount,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg hidden md:block">
                Admin <span className="text-gradient-gold">Dashboard</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Vue Trader
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Rafraîchir
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Traders", value: stats.total, color: "primary" },
            { icon: DollarSign, label: "Payés", value: stats.paid, color: "success" },
            { icon: Clock, label: "En attente", value: stats.pending, color: "accent" },
            { icon: Wallet, label: "Revenus", value: `$${stats.revenue.toLocaleString()}`, color: "accent" },
            { icon: ArrowUpRight, label: "MT5 à provisionner", value: stats.mt5Pending, color: "destructive" },
          ].map((s, i) => (
            <div key={i} className="glass-card p-4 md:p-6">
              <div className={`w-10 h-10 rounded-xl bg-${s.color}/10 flex items-center justify-center mb-2`}>
                <s.icon className={`w-5 h-5 text-${s.color}`} />
              </div>
              <div className="text-2xl font-display font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="glass-card p-6">
          <Tabs defaultValue="inscriptions">
            <TabsList className="mb-6 bg-secondary/50">
              <TabsTrigger value="inscriptions">Inscriptions</TabsTrigger>
              <TabsTrigger value="paiements">Paiements</TabsTrigger>
              <TabsTrigger value="mt5">MT5 Provisioning</TabsTrigger>
              <TabsTrigger value="copy">Copy Trading</TabsTrigger>
            </TabsList>

            <TabsContent value="inscriptions">
              <InscriptionsTab registrations={registrations} onRefresh={loadData} />
            </TabsContent>
            <TabsContent value="paiements">
              <PaiementsTab registrations={registrations} />
            </TabsContent>
            <TabsContent value="mt5">
              <MT5ProvisioningTab registrations={registrations} mt5Accounts={mt5Accounts} onRefresh={loadData} />
            </TabsContent>
            <TabsContent value="copy">
              <CopyTradingTab registrations={registrations} mt5Accounts={mt5Accounts} copyLinks={copyLinks} onRefresh={loadData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
