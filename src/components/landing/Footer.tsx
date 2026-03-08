import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <BrandLogo size="md" linkTo="/" />
            </div>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              Nous finançons le talent. Prouvez vos compétences de trading et accédez 
              à un capital allant jusqu'à 500,000$ sans risque personnel.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@the_best_propfirm.com" className="hover:text-foreground transition-colors">contact@the_best_propfirm.com</a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:the_best_propfirm@the_best_propfirm.com" className="hover:text-foreground transition-colors">the_best_propfirm@the_best_propfirm.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#phases" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/rules" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Rules & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/risk-disclosure" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Risk Disclosure
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/aml-kyc" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  AML & KYC Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Trading Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 The BEST Propfirm. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Propulsé par MetaTrader 5</span>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Avertissement sur les risques :</strong> Le trading sur les marchés financiers 
            comporte des risques significatifs de perte. Les performances passées ne garantissent pas les 
            résultats futurs. Tous les comptes fournis sont des comptes démo destinés à l'évaluation des compétences. 
            Les frais de challenge ne sont pas remboursables. Tradez de manière responsable.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
