import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw, Trash2, AlertTriangle } from "lucide-react";
import { unarchiveRegistration, deleteRegistrationPermanently } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
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

interface Registration {
  id: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  plan_capital: number | null;
  fee_expected: number | null;
  payment_status: string;
  account_type: string;
  capital_tier: string;
  archived_at?: string | null;
}

interface Props {
  registrations: Registration[];
  onRefresh: () => void;
}

const ArchivesTab = ({ registrations, onRefresh }: Props) => {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const archived = registrations
    .filter((r: any) => r.archived_at)
    .filter(
      (r) =>
        !search ||
        (r.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (r.email ?? "").toLowerCase().includes(search.toLowerCase())
    );

  const handleRestore = async (reg: Registration) => {
    try {
      await unarchiveRegistration(reg.id);
      toast({ title: "Compte restauré", description: `${reg.full_name} est de nouveau actif` });
      onRefresh();
    } catch {
      toast({ title: "Erreur", variant: "destructive" });
    }
  };

  const handleDelete = async (reg: Registration) => {
    try {
      await deleteRegistrationPermanently(reg.id);
      toast({ title: "Compte supprimé définitivement", description: `${reg.full_name} a été supprimé` });
      onRefresh();
    } catch {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les archives..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary/50"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {archived.length} compte{archived.length !== 1 ? "s" : ""} archivé{archived.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Date archivage</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Nom</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Email</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Capital</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Type</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {archived.map((r: any) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="py-3 px-3 text-muted-foreground">
                  {r.archived_at ? new Date(r.archived_at).toLocaleDateString("fr-FR") : "-"}
                </td>
                <td className="py-3 px-3 font-medium">{r.full_name ?? "-"}</td>
                <td className="py-3 px-3">{r.email ?? "-"}</td>
                <td className="py-3 px-3 font-medium">
                  {r.plan_capital ? `$${r.plan_capital.toLocaleString()}` : r.capital_tier}
                </td>
                <td className="py-3 px-3">{r.account_type}</td>
                <td className="py-3 px-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleRestore(r)}>
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Restaurer
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                            Suppression définitive
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer définitivement le compte de{" "}
                            <strong>{r.full_name}</strong> ? Cette action est irréversible et supprimera
                            toutes les données associées (MT5, liens, etc.).
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDelete(r)}
                          >
                            Supprimer définitivement
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {archived.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  Aucun compte archivé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchivesTab;
