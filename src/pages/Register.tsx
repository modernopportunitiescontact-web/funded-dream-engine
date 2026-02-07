import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { User, Mail, Phone, Lock, ArrowLeft, Copy, Check } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { pricingTiers, PricingTier } from "@/lib/pricing-data";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    accountType: "",
    capital: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"form" | "payment">("form");
  const [copied, setCopied] = useState(false);

  const USDT_ADDRESS = "TXxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Replace with actual USDT TRC20 address

  useEffect(() => {
    const capitalParam = searchParams.get("capital");
    if (capitalParam) {
      setFormData(prev => ({ ...prev, capital: capitalParam }));
    }
  }, [searchParams]);

  const selectedTier = pricingTiers.find(t => t.capital.toString() === formData.capital);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "form") {
      // Validate form and show payment step
      setStep("payment");
    } else {
      setIsLoading(true);
      // TODO: Implement registration logic with Supabase
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(USDT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const countries = [
    "France", "Belgique", "Suisse", "Canada", "Maroc", "Algérie", 
    "Tunisie", "Sénégal", "Côte d'Ivoire", "Cameroun", "Congo",
    "Gabon", "Mali", "Burkina Faso", "Niger", "Bénin", "Togo",
    "Madagascar", "Maurice", "Haïti", "Autre"
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
          <div className="flex items-center justify-center mb-6">
            <BrandLogo size="lg" linkTo="/" />
          </div>

          {step === "form" ? (
            <>
              {/* Title */}
              <div className="text-center mb-6">
                <h1 className="font-display text-2xl font-bold mb-2">Inscription</h1>
                <p className="text-muted-foreground text-sm">
                  Créez votre compte et commencez votre challenge
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Capital Selection */}
                <div className="space-y-2">
                  <Label>Choisissez votre capital</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {pricingTiers.map((tier) => (
                      <button
                        key={tier.capital}
                        type="button"
                        onClick={() => setFormData({ ...formData, capital: tier.capital.toString() })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          formData.capital === tier.capital.toString()
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary/30 hover:border-primary/50"
                        }`}
                      >
                        <div className="font-display font-bold text-gradient-gold">
                          {tier.capitalFormatted}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tier.feeFormatted}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

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
                      Terms & Conditions
                    </Link>,{" "}
                    <Link to="/risk-disclosure" className="text-primary hover:underline">
                      Risk Disclosure
                    </Link>{" "}
                    et la{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full mt-6"
                  disabled={!formData.acceptTerms || !formData.capital}
                >
                  Continuer vers le paiement
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Payment Step */}
              <div className="text-center mb-6">
                <h1 className="font-display text-2xl font-bold mb-2">Paiement</h1>
                <p className="text-muted-foreground text-sm">
                  Effectuez le paiement en USDT (TRC20)
                </p>
              </div>

              {/* Selected Plan Summary */}
              {selectedTier && (
                <div className="glass-card p-4 mb-6 border-primary/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Capital sélectionné</div>
                      <div className="font-display font-bold text-gradient-gold text-xl">
                        {selectedTier.capitalFormatted}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">À payer</div>
                      <div className="font-display font-bold text-foreground text-xl">
                        {selectedTier.feeFormatted}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* USDT Address */}
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-2">
                    Adresse USDT (TRC20)
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-background p-2 rounded break-all">
                      {USDT_ADDRESS}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyAddress}
                      className="flex-shrink-0"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
                  <h3 className="font-semibold text-sm mb-2">Instructions :</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>1. Envoyez exactement <span className="text-foreground font-medium">{selectedTier?.feeFormatted} USDT</span> à l'adresse ci-dessus</li>
                    <li>2. Utilisez uniquement le réseau <span className="text-foreground font-medium">TRC20</span></li>
                    <li>3. Votre compte sera activé sous 24h après vérification</li>
                    <li>4. Vos identifiants MT5 seront envoyés par email</li>
                  </ul>
                </div>

                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl">
                  <p className="text-xs text-destructive">
                    ⚠️ Les frais de challenge ne sont pas remboursables. Assurez-vous de bien comprendre les règles avant de payer.
                  </p>
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Traitement..." : "J'ai effectué le paiement"}
                </Button>

                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full"
                  onClick={() => setStep("form")}
                >
                  Retour au formulaire
                </Button>
              </div>
            </>
          )}

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