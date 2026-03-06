import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link2, Pause, Play, Square, Settings2, Check } from "lucide-react";
import { createCopyLink, updateCopyLinkStatus, updateMasterMultiplier } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  id: string;
  full_name: string | null;
  email: string | null;
}

interface MT5Account {
  id: string;
  registration_id: string;
  mt5_login: string | null;
  status: string;
  multiplier?: number;
}

interface CopyLink {
  id: string;
  master_registration_id: string;
  slave_registration_id: string;
  status: string;
  created_at: string;
}

interface Props {
  registrations: Registration[];
  mt5Accounts: MT5Account[];
  copyLinks: CopyLink[];
  onRefresh: () => void;
}

const CopyTradingTab = ({ registrations, mt5Accounts, copyLinks, onRefresh }: Props) => {
  const { toast } = useToast();
  const [masterId, setMasterId] = useState("");
  const [slaveId, setSlaveId] = useState("");
  const [editingMultiplier, setEditingMultiplier] = useState<string | null>(null);
  const [multiplierValue, setMultiplierValue] = useState("");

  const mt5Map = Object.fromEntries(mt5Accounts.filter(m => m.status === "created").map(m => [m.registration_id, m]));
  const eligibleRegs = registrations.filter(r => mt5Map[r.id]);
  const regMap = Object.fromEntries(registrations.map(r => [r.id, r]));

  // Get unique masters from copy links
  const masterIds = [...new Set(copyLinks.map(l => l.master_registration_id))];

  const handleCreate = async () => {
    if (!masterId || !slaveId || masterId === slaveId) {
      toast({ title: "Sélectionnez un master et un slave différents", variant: "destructive" });
      return;
    }
    try {
      await createCopyLink(masterId, slaveId);
      toast({ title: "Lien copy trading créé !" });
      setMasterId("");
      setSlaveId("");
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleStatus = async (id: string, status: string) => {
    try {
      await updateCopyLinkStatus(id, status);
      toast({ title: `Statut mis à jour: ${status}` });
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleSaveMultiplier = async (mt5Account: MT5Account) => {
    const val = parseFloat(multiplierValue);
    if (isNaN(val) || val <= 0) {
      toast({ title: "Le multiplicateur doit être supérieur à 0", variant: "destructive" });
      return;
    }
    try {
      await updateMasterMultiplier(mt5Account.id, val);
      toast({ title: `Multiplicateur mis à jour: ×${val}` });
      setEditingMultiplier(null);
      setMultiplierValue("");
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Master Multipliers */}
      {masterIds.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" />
            Multiplicateurs par Master
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {masterIds.map(mid => {
              const reg = regMap[mid];
              const mt5 = mt5Map[mid];
              if (!mt5) return null;
              const currentMult = (mt5 as any).multiplier ?? 1;
              const isEditing = editingMultiplier === mid;

              return (
                <div key={mid} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{reg?.full_name ?? "?"}</div>
                    <div className="text-xs text-muted-foreground">{mt5.mt5_login}</div>
                  </div>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        step="0.1"
                        min="0.01"
                        value={multiplierValue}
                        onChange={e => setMultiplierValue(e.target.value)}
                        className="w-20 h-8 text-sm bg-background"
                        autoFocus
                      />
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-success" onClick={() => handleSaveMultiplier(mt5)}>
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs font-mono"
                      onClick={() => {
                        setEditingMultiplier(mid);
                        setMultiplierValue(String(currentMult));
                      }}
                    >
                      ×{currentMult}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create new link */}
      <div className="glass-card p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-primary" />
          Créer un lien Copy Trading
        </h3>
        <div className="flex flex-col md:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-1 block">Master</label>
            <Select value={masterId} onValueChange={setMasterId}>
              <SelectTrigger className="bg-secondary/50"><SelectValue placeholder="Choisir master" /></SelectTrigger>
              <SelectContent>
                {eligibleRegs.map(r => {
                  const mt5 = mt5Map[r.id];
                  const mult = (mt5 as any)?.multiplier ?? 1;
                  return (
                    <SelectItem key={r.id} value={r.id}>
                      {r.full_name} ({mt5?.mt5_login}) — ×{mult}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-1 block">Slave</label>
            <Select value={slaveId} onValueChange={setSlaveId}>
              <SelectTrigger className="bg-secondary/50"><SelectValue placeholder="Choisir slave" /></SelectTrigger>
              <SelectContent>
                {eligibleRegs.filter(r => r.id !== masterId).map(r => (
                  <SelectItem key={r.id} value={r.id}>{r.full_name} ({mt5Map[r.id]?.mt5_login})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreate}><Link2 className="w-4 h-4 mr-1" />Créer</Button>
        </div>
      </div>

      {/* Existing links */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Master</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Multiplicateur</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Slave</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Statut</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Date</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {copyLinks.map((link) => {
              const master = regMap[link.master_registration_id];
              const slave = regMap[link.slave_registration_id];
              const masterMt5 = mt5Map[link.master_registration_id];
              const mult = (masterMt5 as any)?.multiplier ?? 1;
              return (
                <tr key={link.id} className="border-b border-border/50 hover:bg-secondary/30">
                  <td className="py-3 px-3 font-medium">{master?.full_name ?? "?"}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono font-semibold">×{mult}</span>
                  </td>
                  <td className="py-3 px-3 font-medium">{slave?.full_name ?? "?"}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      link.status === "active" ? "bg-success/20 text-success" :
                      link.status === "paused" ? "bg-accent/20 text-accent" :
                      "bg-destructive/20 text-destructive"
                    }`}>{link.status}</span>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{new Date(link.created_at).toLocaleDateString("fr-FR")}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      {link.status !== "active" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-success" onClick={() => handleStatus(link.id, "active")}><Play className="w-4 h-4" /></Button>
                      )}
                      {link.status === "active" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-accent" onClick={() => handleStatus(link.id, "paused")}><Pause className="w-4 h-4" /></Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleStatus(link.id, "stopped")}><Square className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {copyLinks.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">Aucun lien copy trading</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CopyTradingTab;
