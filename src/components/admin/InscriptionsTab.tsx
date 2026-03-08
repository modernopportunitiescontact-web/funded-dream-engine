import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, CheckCircle, Clock, XCircle, Archive, Trash2, AlertTriangle } from "lucide-react";
import { updateRegistrationPayment, exportToCSV, archiveRegistration, deleteRegistrationPermanently } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  id: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  plan_capital: number | null;
  fee_expected: number | null;
  payment_status: string;
  amount_paid: number | null;
  paid_at: string | null;
  payment_method: string | null;
  payment_txid: string | null;
  account_type: string;
  capital_tier: string;
  country: string | null;
}

interface Props {
  registrations: Registration[];
  onRefresh: () => void;
}

const InscriptionsTab = ({ registrations, onRefresh }: Props) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all");
  const { toast } = useToast();

  const filtered = registrations.filter((r: any) => {
    // Exclude archived
    if (r.archived_at) return false;
    const matchSearch =
      !search ||
      (r.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (r.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (r.phone ?? "").includes(search);
    const matchFilter =
      filter === "all" ||
      (filter === "paid" && r.payment_status === "paid") ||
      (filter === "pending" && r.payment_status === "pending");
    return matchSearch && matchFilter;
  });

  const handleArchive = async (reg: Registration) => {
    try {
      await archiveRegistration(reg.id);
      toast({ title: "Compte archivé", description: `${reg.full_name} a été archivé` });
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleDeletePermanent = async (reg: Registration) => {
    try {
      await deleteRegistrationPermanently(reg.id);
      toast({ title: "Compte supprimé", description: `${reg.full_name} a été supprimé définitivement` });
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleValidatePayment = async (reg: Registration) => {
    try {
      await updateRegistrationPayment(reg.id, {
        payment_status: "paid",
        paid_at: new Date().toISOString(),
        amount_paid: reg.fee_expected ?? 0,
      });
      toast({ title: "Paiement validé", description: `${reg.full_name} marqué comme payé` });
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const statusBadge = (s: string) => {
    if (s === "paid") return <span className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success flex items-center gap-1"><CheckCircle className="w-3 h-3" />Payé</span>;
    if (s === "pending") return <span className="px-2 py-1 rounded text-xs font-medium bg-accent/20 text-accent flex items-center gap-1"><Clock className="w-3 h-3" />En attente</span>;
    return <span className="px-2 py-1 rounded text-xs font-medium bg-destructive/20 text-destructive flex items-center gap-1"><XCircle className="w-3 h-3" />{s}</span>;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary/50" />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "paid"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f === "all" ? "Tous" : f === "paid" ? "Payés" : "En attente"}
            </Button>
          ))}
          <Button variant="outline" size="sm" onClick={() => exportToCSV(filtered as any, "inscriptions")}>
            <Download className="w-4 h-4 mr-1" />CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Date</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Nom</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Email</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Tél</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Capital</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Fee</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Statut</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="py-3 px-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString("fr-FR")}</td>
                <td className="py-3 px-3 font-medium">{r.full_name ?? "-"}</td>
                <td className="py-3 px-3">{r.email ?? "-"}</td>
                <td className="py-3 px-3">{r.phone ?? "-"}</td>
                <td className="py-3 px-3 font-medium">{r.plan_capital ? `$${r.plan_capital.toLocaleString()}` : r.capital_tier}</td>
                <td className="py-3 px-3">{r.fee_expected ? `$${r.fee_expected}` : "-"}</td>
                <td className="py-3 px-3">{statusBadge(r.payment_status)}</td>
                <td className="py-3 px-3">
                  {r.payment_status === "pending" && (
                    <Button size="sm" variant="outline" className="text-success hover:text-success" onClick={() => handleValidatePayment(r)}>
                      <CheckCircle className="w-4 h-4 mr-1" />Valider
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">Aucune inscription trouvée</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InscriptionsTab;
