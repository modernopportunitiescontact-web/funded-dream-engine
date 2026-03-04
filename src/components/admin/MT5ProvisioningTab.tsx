import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Server } from "lucide-react";
import { saveMT5Account } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  id: string;
  full_name: string | null;
  email: string | null;
  plan_capital: number | null;
  payment_status: string;
  account_type: string;
}

interface MT5Account {
  id: string;
  registration_id: string;
  mt5_login: string | null;
  mt5_password: string | null;
  mt5_server: string | null;
  status: string;
}

interface Props {
  registrations: Registration[];
  mt5Accounts: MT5Account[];
  onRefresh: () => void;
}

const MT5ProvisioningTab = ({ registrations, mt5Accounts, onRefresh }: Props) => {
  const { toast } = useToast();
  const [forms, setForms] = useState<Record<string, { login: string; password: string; server: string }>>({});

  const paidRegs = registrations.filter((r) => r.payment_status === "paid");
  const mt5Map = Object.fromEntries(mt5Accounts.map((m) => [m.registration_id, m]));

  const pendingProvision = paidRegs.filter((r) => {
    const mt5 = mt5Map[r.id];
    return !mt5 || mt5.status === "pending";
  });

  const provisioned = paidRegs.filter((r) => {
    const mt5 = mt5Map[r.id];
    return mt5 && mt5.status === "created";
  });

  const getForm = (id: string) => forms[id] ?? { login: "", password: "", server: "" };
  const setForm = (id: string, field: string, value: string) => {
    setForms((prev) => ({ ...prev, [id]: { ...getForm(id), [field]: value } }));
  };

  const handleSave = async (regId: string) => {
    const f = getForm(regId);
    if (!f.login || !f.password || !f.server) {
      toast({ title: "Remplissez tous les champs MT5", variant: "destructive" });
      return;
    }
    try {
      await saveMT5Account(regId, f.login, f.password, f.server);
      toast({ title: "Compte MT5 créé !" });
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Server className="w-5 h-5 text-accent" />
          En attente de provisionnement ({pendingProvision.length})
        </h3>
        {pendingProvision.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4">Aucun compte à provisionner</p>
        ) : (
          <div className="space-y-3">
            {pendingProvision.map((r) => (
              <div key={r.id} className="glass-card p-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                  <div className="flex-shrink-0">
                    <div className="font-medium">{r.full_name}</div>
                    <div className="text-xs text-muted-foreground">{r.email} • {r.account_type} • ${r.plan_capital?.toLocaleString()}</div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Input placeholder="MT5 Login" value={getForm(r.id).login} onChange={(e) => setForm(r.id, "login", e.target.value)} className="bg-secondary/50" />
                    <Input placeholder="MT5 Password" type="password" value={getForm(r.id).password} onChange={(e) => setForm(r.id, "password", e.target.value)} className="bg-secondary/50" />
                    <Input placeholder="MT5 Server" value={getForm(r.id).server} onChange={(e) => setForm(r.id, "server", e.target.value)} className="bg-secondary/50" />
                  </div>
                  <Button size="sm" onClick={() => handleSave(r.id)}>
                    <CheckCircle className="w-4 h-4 mr-1" />Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-3">Comptes provisionnés ({provisioned.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Trader</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Login</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Server</th>
                <th className="text-left py-3 px-3 text-muted-foreground font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {provisioned.map((r) => {
                const mt5 = mt5Map[r.id];
                return (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-3 font-medium">{r.full_name}</td>
                    <td className="py-3 px-3 font-mono">{mt5?.mt5_login}</td>
                    <td className="py-3 px-3 font-mono">{mt5?.mt5_server}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success">Créé</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MT5ProvisioningTab;
