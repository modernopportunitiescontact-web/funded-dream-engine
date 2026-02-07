import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, User, Mail, Phone, MapPin, Lock, ArrowLeft } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    accountType: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement registration logic with Supabase
    setTimeout(() => setIsLoading(false), 1000);
  };

  const countries = [
    "France", "Belgique", "Suisse", "Canada", "Maroc", "Algérie", 
    "Tunisie", "Sénégal", "Côte d'Ivoire", "Cameroun", "Autre"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Register Card */}
        <div className="glass-card p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">
              The Best <span className="text-gradient-gold">Propfirm</span>
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl font-bold mb-2">Inscription</h1>
            <p className="text-muted-foreground text-sm">
              Créez votre compte et commencez votre évaluation
            </p>
          </div>

          {/* Price Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-sm text-primary font-medium">
                Frais d'inscription : <span className="font-bold">32 USD</span>
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Pays</Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountType">Type de compte</Label>
              <Select 
                value={formData.accountType} 
                onValueChange={(value) => setFormData({ ...formData, accountType: value })}
              >
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Choisissez le type de compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="synthetic">Synthetic (Indices Synthétiques)</SelectItem>
                  <SelectItem value="financial">Financial (Forex)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, acceptTerms: checked as boolean })
                }
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                J'accepte les{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  conditions générales
                </Link>{" "}
                et la{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full mt-6"
              disabled={isLoading || !formData.acceptTerms}
            >
              {isLoading ? "Inscription..." : "S'inscrire (32 USD)"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-muted-foreground text-sm">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
