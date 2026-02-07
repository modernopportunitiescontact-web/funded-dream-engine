import { Link } from "react-router-dom";
import { TrendingUp, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                The Best <span className="text-gradient-gold">Propfirm</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              Votre partenaire vers le trading professionnel. Prouvez vos compétences 
              et accédez à un compte financé pour trader sans risque personnel.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Mail className="w-4 h-4" />
              <span>support@thebestpropfirm.com</span>
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
                  Phases d'évaluation
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
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Politique de remboursement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 The Best Propfirm. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Propulsé par MetaTrader 5</span>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Avertissement sur les risques :</strong> Le trading sur les marchés financiers 
            comporte des risques significatifs. Les performances passées ne garantissent pas les 
            résultats futurs. Tradez de manière responsable.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
