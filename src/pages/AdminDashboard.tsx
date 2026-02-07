import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MoreVertical,
  Eye,
  XCircle,
  ArrowUpRight,
  Wallet
} from "lucide-react";

// Mock data for admin dashboard
const mockStats = {
  totalTraders: 156,
  activeTraders: 89,
  pendingPayments: 12,
  totalRevenue: 4992,
  withdrawalRequests: 5,
};

const mockTraders = [
  { 
    id: 1, 
    name: "Jean Dupont", 
    email: "jean@email.com", 
    phase: "Phase 1", 
    profit: 1.5, 
    drawdown: 0.3, 
    status: "active",
    paymentStatus: "validated",
    accountType: "Synthetic"
  },
  { 
    id: 2, 
    name: "Marie Martin", 
    email: "marie@email.com", 
    phase: "Phase 2", 
    profit: 5.2, 
    drawdown: 1.8, 
    status: "active",
    paymentStatus: "validated",
    accountType: "Financial"
  },
  { 
    id: 3, 
    name: "Pierre Bernard", 
    email: "pierre@email.com", 
    phase: "Funded", 
    profit: 8.5, 
    drawdown: 2.1, 
    status: "active",
    paymentStatus: "validated",
    accountType: "Synthetic"
  },
  { 
    id: 4, 
    name: "Sophie Leroy", 
    email: "sophie@email.com", 
    phase: "Phase 1", 
    profit: -0.5, 
    drawdown: 0.9, 
    status: "warning",
    paymentStatus: "validated",
    accountType: "Financial"
  },
  { 
    id: 5, 
    name: "Lucas Moreau", 
    email: "lucas@email.com", 
    phase: "Phase 1", 
    profit: 0, 
    drawdown: 0, 
    status: "pending",
    paymentStatus: "pending",
    accountType: "Synthetic"
  },
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [traders] = useState(mockTraders);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success">Actif</span>;
      case "warning":
        return <span className="px-2 py-1 rounded text-xs font-medium bg-accent/20 text-accent">Attention</span>;
      case "pending":
        return <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">En attente</span>;
      case "failed":
        return <span className="px-2 py-1 rounded text-xs font-medium bg-destructive/20 text-destructive">Échoué</span>;
      default:
        return null;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "validated":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-accent" />;
      default:
        return null;
    }
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

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {mockStats.withdrawalRequests} Retraits
              </Button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">A</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-display font-bold">{mockStats.totalTraders}</div>
            <div className="text-sm text-muted-foreground">Traders Total</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
            </div>
            <div className="text-2xl font-display font-bold">{mockStats.activeTraders}</div>
            <div className="text-sm text-muted-foreground">Traders Actifs</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-display font-bold">{mockStats.pendingPayments}</div>
            <div className="text-sm text-muted-foreground">Paiements en attente</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-2xl font-display font-bold">${mockStats.totalRevenue}</div>
            <div className="text-sm text-muted-foreground">Revenus Total</div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="text-2xl font-display font-bold">{mockStats.withdrawalRequests}</div>
            <div className="text-sm text-muted-foreground">Demandes de retrait</div>
          </div>
        </div>

        {/* Traders Table */}
        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h2 className="font-display text-xl font-bold">Gestion des Traders</h2>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un trader..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary/50"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Trader</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phase</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Profit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Drawdown</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Paiement</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Statut</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {traders.map((trader) => (
                  <tr key={trader.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{trader.name}</div>
                        <div className="text-sm text-muted-foreground">{trader.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{trader.accountType}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                        {trader.phase}
                      </span>
                    </td>
                    <td className={`py-3 px-4 font-medium ${
                      trader.profit >= 0 ? "text-success" : "text-destructive"
                    }`}>
                      {trader.profit >= 0 ? "+" : ""}{trader.profit}%
                    </td>
                    <td className={`py-3 px-4 font-medium ${
                      trader.drawdown > 0.8 ? "text-destructive" : "text-foreground"
                    }`}>
                      {trader.drawdown}%
                    </td>
                    <td className="py-3 px-4">
                      {getPaymentBadge(trader.paymentStatus)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(trader.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {trader.paymentStatus === "pending" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
