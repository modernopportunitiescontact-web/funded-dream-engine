import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/api";

interface Registration {
  id: string;
  full_name: string | null;
  email: string | null;
  paid_at: string | null;
  amount_paid: number | null;
  payment_method: string | null;
  payment_txid: string | null;
  payment_address_used: string | null;
  payment_status: string;
  plan_capital: number | null;
}

interface Props {
  registrations: Registration[];
}

const PaiementsTab = ({ registrations }: Props) => {
  const paid = registrations.filter((r) => r.payment_status === "paid");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Paiements confirmés ({paid.length})</h3>
        <Button variant="outline" size="sm" onClick={() => exportToCSV(paid as any, "paiements")}>
          <Download className="w-4 h-4 mr-1" />CSV
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Trader</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Montant</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Méthode</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">TXID</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Adresse</th>
              <th className="text-left py-3 px-3 text-muted-foreground font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {paid.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="py-3 px-3">
                  <div className="font-medium">{r.full_name ?? "-"}</div>
                  <div className="text-xs text-muted-foreground">{r.email}</div>
                </td>
                <td className="py-3 px-3 font-medium text-success">${r.amount_paid ?? 0}</td>
                <td className="py-3 px-3">{r.payment_method ?? "-"}</td>
                <td className="py-3 px-3 font-mono text-xs max-w-[120px] truncate">{r.payment_txid ?? "-"}</td>
                <td className="py-3 px-3 font-mono text-xs max-w-[120px] truncate">{r.payment_address_used ?? "-"}</td>
                <td className="py-3 px-3 text-muted-foreground">{r.paid_at ? new Date(r.paid_at).toLocaleDateString("fr-FR") : "-"}</td>
              </tr>
            ))}
            {paid.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">Aucun paiement confirmé</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaiementsTab;
