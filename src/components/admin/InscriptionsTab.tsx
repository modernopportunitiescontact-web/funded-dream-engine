import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, CheckCircle, Clock, XCircle, Archive, Trash2, AlertTriangle, Gift, Plus } from "lucide-react";
import { updateRegistrationPayment, exportToCSV, archiveRegistration, deleteRegistrationPermanently, createGiftRegistration, fetchRegistrationsByUserId, updateRegistrationStatus } from "@/lib/api";
import { pricingTiers } from "@/lib/pricing-data";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  user_id: string;
  notes: string | null;
  status: string;
}

interface Props {
  registrations: Registration[];
  onRefresh: () => void;
}

const InscriptionsTab = ({ registrations, onRefresh }: Props) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all");
  const { toast } = useToast();

  // Gift account dialog state
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftLoading, setGiftLoading] = useState(false);
  const [giftSourceRegId, setGiftSourceRegId] = useState("");
  const [giftCapitalTier, setGiftCapitalTier] = useState("");
  const [giftAccountType, setGiftAccountType] = useState("");
  const [giftNotes, setGiftNotes] = useState("");

  const filtered = registrations.filter((r: any) => {
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

  // Get unique traders for gift source selection (active, paid)
  const paidTraders = registrations.filter((r: any) => !r.archived_at && r.payment_status === "paid");

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

  const handleCreateGift = async () => {
    if (!giftSourceRegId || !giftCapitalTier || !giftAccountType) {
      toast({ title: "Remplissez tous les champs", variant: "destructive" });
      return;
    }

    const sourceReg = registrations.find((r) => r.id === giftSourceRegId);
    if (!sourceReg) {
      toast({ title: "Trader source introuvable", variant: "destructive" });
      return;
    }

    const tier = pricingTiers.find((t) => t.capitalFormatted === giftCapitalTier);
    if (!tier) {
      toast({ title: "Tier invalide", variant: "destructive" });
      return;
    }

    setGiftLoading(true);
    try {
      await createGiftRegistration({
        user_id: sourceReg.user_id,
        full_name: sourceReg.full_name ?? "",
        email: sourceReg.email ?? "",
        phone: sourceReg.phone ?? "",
        country: sourceReg.country ?? "",
        account_type: giftAccountType,
        capital_tier: giftCapitalTier,
        plan_capital: tier.capital,
        fee_expected: 0,
        notes: giftNotes || "Compte cadeau",
      });
      toast({ title: "Compte cadeau créé !", description: `Nouveau compte pour ${sourceReg.full_name}` });
      setGiftOpen(false);
      setGiftSourceRegId("");
      setGiftCapitalTier("");
      setGiftAccountType("");
      setGiftNotes("");
      onRefresh();
    } catch (err) {
      console.error(err);
      toast({ title: "Erreur lors de la création", variant: "destructive" });
    } finally {
      setGiftLoading(false);
    }
  };

  const handleChangeStatus = async (reg: Registration, newStatus: string) => {
    try {
      await updateRegistrationStatus(reg.id, newStatus);
      toast({ title: "Phase mise à jour", description: `${reg.full_name} → ${newStatus}` });
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const phaseStatuses = ["pending", "phase1", "phase2", "funded", "disqualified"] as const;

  const phaseBadgeColor = (s: string) => {
    if (s === "funded") return "bg-success/20 text-success";
    if (s === "phase2") return "bg-primary/20 text-primary";
    if (s === "phase1") return "bg-accent/20 text-accent";
    if (s === "disqualified") return "bg-destructive/20 text-destructive";
    return "bg-muted text-muted-foreground";
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
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "paid"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
              {f === "all" ? "Tous" : f === "paid" ? "Payés" : "En attente"}
            </Button>
          ))}
          <Button variant="outline" size="sm" onClick={() => exportToCSV(filtered as any, "inscriptions")}>
            <Download className="w-4 h-4 mr-1" />CSV
          </Button>

          {/* Gift Account Button */}
          <Dialog open={giftOpen} onOpenChange={setGiftOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-primary border-primary/30">
                <Gift className="w-4 h-4 mr-1" />Compte Cadeau
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Créer un Compte Cadeau
                </DialogTitle>
                <DialogDescription>
                  Créer un compte supplémentaire pour un trader existant (récompense Phase 1/2 réussie). Les informations personnelles seront reprises automatiquement.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Trader bénéficiaire</Label>
                  <Select value={giftSourceRegId} onValueChange={setGiftSourceRegId}>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Sélectionner un trader..." />
                    </SelectTrigger>
                    <SelectContent>
                      {paidTraders.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.full_name} — {r.email} ({r.account_type} ${r.plan_capital?.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Type de compte</Label>
                  <Select value={giftAccountType} onValueChange={setGiftAccountType}>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Synthetic / Financial" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Synthetic">Synthetic</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Capital</Label>
                  <Select value={giftCapitalTier} onValueChange={setGiftCapitalTier}>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Choisir le capital..." />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingTiers.map((t) => (
                        <SelectItem key={t.capitalFormatted} value={t.capitalFormatted}>
                          {t.capitalFormatted}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Notes (optionnel)</Label>
                  <Input
                    value={giftNotes}
                    onChange={(e) => setGiftNotes(e.target.value)}
                    placeholder="Ex: Récompense Phase 2 réussie"
                    className="bg-secondary/50"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setGiftOpen(false)}>Annuler</Button>
                <Button onClick={handleCreateGift} disabled={giftLoading}>
                  {giftLoading ? "Création..." : "Créer le compte"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Paiement</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Phase</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Type</th>
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
                <td className="py-3 px-3">{r.fee_expected ? `$${r.fee_expected}` : r.payment_method === "cadeau" ? <span className="text-xs text-primary">🎁 Cadeau</span> : "-"}</td>
                <td className="py-3 px-3">{statusBadge(r.payment_status)}</td>
                <td className="py-3 px-3">
                  <Select value={r.status} onValueChange={(val) => handleChangeStatus(r, val)}>
                    <SelectTrigger className={`h-7 w-32 text-xs font-medium border-0 ${phaseBadgeColor(r.status)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {phaseStatuses.map((s) => (
                        <SelectItem key={s} value={s}>{s === "pending" ? "En attente" : s === "phase1" ? "Phase 1" : s === "phase2" ? "Phase 2" : s === "funded" ? "Funded" : "Disqualifié"}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-3">
                  {r.notes?.includes("cadeau") || r.payment_method === "cadeau" ? (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">🎁 Gift</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">{r.account_type}</span>
                  )}
                </td>
                <td className="py-3 px-3">
                  <div className="flex gap-1">
                    {r.payment_status === "pending" && (
                      <Button size="sm" variant="outline" className="text-success hover:text-success" onClick={() => handleValidatePayment(r)}>
                        <CheckCircle className="w-4 h-4 mr-1" />Valider
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" title="Archiver" onClick={() => handleArchive(r)}>
                      <Archive className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost" title="Supprimer définitivement">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                            Suppression définitive
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Supprimer définitivement <strong>{r.full_name}</strong> et toutes ses données associées ? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => handleDeletePermanent(r)}>
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={10} className="py-8 text-center text-muted-foreground">Aucune inscription trouvée</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InscriptionsTab;
