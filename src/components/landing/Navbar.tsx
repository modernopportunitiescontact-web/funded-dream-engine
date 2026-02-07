import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, TrendingUp } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              The Best <span className="text-gradient-gold">Propfirm</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Fonctionnalités
            </a>
            <a href="#phases" className="text-muted-foreground hover:text-foreground transition-colors">
              Phases
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Tarifs
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link to="/register">
              <Button variant="hero">Commencer</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Fonctionnalités
              </a>
              <a href="#phases" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Phases
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Tarifs
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                FAQ
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Link to="/login">
                  <Button variant="ghost" className="w-full">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero" className="w-full">Commencer</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
