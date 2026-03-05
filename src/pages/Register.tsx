import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, Lock, ArrowLeft, Copy, Check } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { pricingTiers } from "@/lib/pricing-data";
import { useAuth } from "@/hooks/useAuth";
import { createRegistration } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const USDT_TRC20_ADDRESS = "TX9RsjbnpyMNVxWgRuYwNdoekwzrt13U3v";
const USDT_BEP20_ADDRESS = "0xfdddc862cb908824a326da08ee29c7c6c632b501";

const countries = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola",
  "Antigua-et-Barbuda", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche",
  "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin",
  "Bhoutan", "Biélorussie", "Birmanie (Myanmar)", "Bolivie", "Bosnie-Herzégovine", "Botswana",
  "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada",
  "Cap-Vert", "Centrafrique", "Chili", "Chine", "Chypre", "Colombie", "Comores",
  "Congo (Brazzaville)", "Congo (RDC)", "Corée du Nord", "Corée du Sud", "Costa Rica",
  "Côte d'Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti", "Dominique",
  "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie",
  "Eswatini", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie",
  "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée équatoriale",
  "Guinée-Bissau", "Guyana", "Haïti", "Honduras", "Hongrie", "Inde", "Indonésie", "Irak",
  "Iran", "Irlande", "Islande", "Israël", "Italie", "Jamaïque", "Japon", "Jordanie",
  "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït", "Laos", "Lesotho", "Lettonie",
  "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie", "Luxembourg", "Macédoine du Nord",
  "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Maurice",
  "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro",
  "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège",
  "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", "Palaos", "Palestine",
  "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines",
  "Pologne", "Portugal", "Qatar", "République dominicaine", "République tchèque", "Roumanie",
  "Royaume-Uni", "Russie", "Rwanda", "Saint-Kitts-et-Nevis", "Saint-Vincent-et-les-Grenadines",
  "Sainte-Lucie", "Salomon", "Salvador", "Samoa", "São Tomé-et-Príncipe", "Sénégal", "Serbie",
  "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan",
  "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie", "Tadjikistan",
  "Tanzanie", "Tchad", "Thaïlande", "Timor oriental", "Togo", "Tonga", "Trinité-et-Tobago",
  "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine", "Uruguay", "Vanuatu",
  "Vatican", "Venezuela", "Viêt Nam", "Yémen", "Zambie", "Zimbabwe", "Autre"
];

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", country: "", accountType: "",
    capital: "", password: "", confirmPassword: "", acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"form" | "payment" | "done">("form");
  const [copied, setCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<"trc20" | "bep20">("trc20");

  const activeAddress = selectedNetwork === "trc20" ? USDT_TRC20_ADDRESS : USDT_BEP20_ADDRESS;

  useEffect(() => {
    const capitalParam = searchParams.get("capital");
    if (capitalParam) setFormData(prev => ({ ...prev, capital: capitalParam }));
  }, [searchParams]);

  const selectedTier = pricingTiers.find(t => t.capital.toString() === formData.capital);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Les mots de passe ne correspondent pas", variant: "destructive" });
      return;
    }
    if (formData.password.length < 6) {
      toast({ title: "Le mot de passe doit avoir au moins 6 caractères", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      // 1. Sign up user
      const { error: authError } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
      });
      if (authError) throw authError;

      toast({ title: "Compte créé ! Vérifiez votre email pour confirmer." });
      setStep("payment");
    } catch (err: any) {
      toast({ title: "Erreur d'inscription", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentConfirm = async () => {
    if (!user) {
      toast({ title: "Veuillez d'abord confirmer votre email et vous connecter", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const tier = pricingTiers.find(t => t.capital.toString() === formData.capital);
      await createRegistration({
        user_id: user.id,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        account_type: formData.accountType,
        capital_tier: formData.capital,
        plan_capital: tier?.capital ?? 0,
        fee_expected: tier?.fee ?? 0,
      });
      toast({ title: "Inscription enregistrée !", description: "Votre paiement sera vérifié sous 24h." });
      setStep("done");
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(activeAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />Retour à l'accueil
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-center justify-center mb-6">
            <BrandLogo size="lg" linkTo="/" />
          </div>

          {step === "done" ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h1 className="font-display text-2xl font-bold">Inscription réussie !</h1>
              <p className="text-muted-foreground text-sm">Votre paiement sera vérifié et vos identifiants MT5 vous seront communiqués sous 24h.</p>
              <Button variant="hero" onClick={() => navigate("/login")} className="w-full">Se connecter</Button>
            </div>
          ) : step === "form" ? (
            <>
              <div className="text-center mb-6">
                <h1 className="font-display text-2xl font-bold mb-2">Inscription</h1>
                <p className="text-muted-foreground text-sm">Créez votre compte et commencez votre challenge</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Choisissez votre capital</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {pricingTiers.map((tier) => (
                      <button key={tier.capital} type="button"
                        onClick={() => setFormData({ ...formData, capital: tier.capital.toString() })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          formData.capital === tier.capital.toString()
                            ? "border-primary bg-primary/10" : "border-border bg-secondary/30 hover:border-primary/50"
                        }`}>
                        <div className="font-display font-bold text-gradient-gold">{tier.capitalFormatted}</div>
                        <div className="text-xs text-muted-foreground">{tier.feeFormatted}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {[
                  { id: "fullName", label: "Nom complet", type: "text", placeholder: "Jean Dupont", icon: User },
                  { id: "email", label: "Email", type: "email", placeholder: "votre@email.com", icon: Mail },
                  { id: "phone", label: "Téléphone", type: "tel", placeholder: "+33 6 12 34 56 78", icon: Phone },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <div className="relative">
                      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id={field.id} type={field.type} placeholder={field.placeholder}
                        value={(formData as any)[field.id]}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        className="pl-10 bg-secondary/50 border-border" required />
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <Label>Pays</Label>
                  <Select value={formData.country} onValueChange={(v) => setFormData({ ...formData, country: v })}>
                    <SelectTrigger className="bg-secondary/50 border-border"><SelectValue placeholder="Sélectionnez" /></SelectTrigger>
                    <SelectContent>{countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Type de compte</Label>
                  <Select value={formData.accountType} onValueChange={(v) => setFormData({ ...formData, accountType: v })}>
                    <SelectTrigger className="bg-secondary/50 border-border"><SelectValue placeholder="Choisissez" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="synthetic">Synthetic (Indices)</SelectItem>
                      <SelectItem value="financial">Financial (Forex)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {[
                  { id: "password", label: "Mot de passe", placeholder: "••••••••" },
                  { id: "confirmPassword", label: "Confirmer", placeholder: "••••••••" },
                ].map((f) => (
                  <div key={f.id} className="space-y-2">
                    <Label htmlFor={f.id}>{f.label}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id={f.id} type="password" placeholder={f.placeholder}
                        value={(formData as any)[f.id]}
                        onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                        className="pl-10 bg-secondary/50 border-border" required />
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-2 pt-2">
                  <Checkbox id="terms" checked={formData.acceptTerms}
                    onCheckedChange={(c) => setFormData({ ...formData, acceptTerms: c as boolean })} />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    J'accepte les <Link to="/terms" className="text-primary hover:underline">Terms</Link>,{" "}
                    <Link to="/risk-disclosure" className="text-primary hover:underline">Risk Disclosure</Link> et la{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full mt-6"
                  disabled={!formData.acceptTerms || !formData.capital || isLoading}>
                  {isLoading ? "Création du compte..." : "Continuer vers le paiement"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="font-display text-2xl font-bold mb-2">Paiement</h1>
                <p className="text-muted-foreground text-sm">Effectuez le paiement en USDT via Binance</p>
              </div>

              {selectedTier && (
                <div className="glass-card p-4 mb-6 border-primary/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Capital</div>
                      <div className="font-display font-bold text-gradient-gold text-xl">{selectedTier.capitalFormatted}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">À payer</div>
                      <div className="font-display font-bold text-foreground text-xl">{selectedTier.feeFormatted}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex gap-2">
                  {(["trc20", "bep20"] as const).map((net) => (
                    <button key={net} type="button" onClick={() => setSelectedNetwork(net)}
                      className={`flex-1 p-3 rounded-xl border text-center text-sm font-medium transition-all ${
                        selectedNetwork === net ? "border-primary bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50"
                      }`}>USDT {net.toUpperCase()}</button>
                  ))}
                </div>

                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-2">Adresse USDT ({selectedNetwork.toUpperCase()}) — Binance</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-background p-2 rounded break-all">{activeAddress}</code>
                    <Button variant="ghost" size="sm" onClick={copyAddress} className="flex-shrink-0">
                      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
                  <h3 className="font-semibold text-sm mb-2">Instructions :</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>1. Envoyez exactement <span className="text-foreground font-medium">{selectedTier?.feeFormatted} USDT</span></li>
                    <li>2. Réseau <span className="text-foreground font-medium">{selectedNetwork.toUpperCase()}</span> uniquement</li>
                    <li>3. Activation sous 24h après vérification</li>
                    <li>4. Identifiants MT5 envoyés après validation</li>
                  </ul>
                </div>

                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl">
                  <p className="text-xs text-destructive">⚠️ Les frais de challenge ne sont pas remboursables.</p>
                </div>

                <Button variant="hero" size="lg" className="w-full" onClick={handlePaymentConfirm} disabled={isLoading}>
                  {isLoading ? "Traitement..." : "J'ai effectué le paiement"}
                </Button>
                <Button variant="ghost" size="lg" className="w-full" onClick={() => setStep("form")}>Retour au formulaire</Button>
              </div>
            </>
          )}

          <p className="text-center mt-6 text-muted-foreground text-sm">
            Déjà un compte ? <Link to="/login" className="text-primary hover:underline font-medium">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
