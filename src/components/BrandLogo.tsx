import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  linkTo?: string;
}

const BrandLogo = ({ size = "md", showText = true, linkTo = "/" }: BrandLogoProps) => {
  const sizeClasses = {
    sm: { icon: "w-8 h-8", iconInner: "w-5 h-5", text: "text-lg" },
    md: { icon: "w-10 h-10", iconInner: "w-6 h-6", text: "text-xl" },
    lg: { icon: "w-12 h-12", iconInner: "w-7 h-7", text: "text-2xl" },
  };

  const content = (
    <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size].icon} rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center`}>
        <TrendingUp className={`${sizeClasses[size].iconInner} text-primary-foreground`} />
      </div>
      {showText && (
        <span className={`font-display font-bold ${sizeClasses[size].text}`}>
          The <span className="text-gradient-gold uppercase tracking-wide">BEST</span>{" "}
          <span className="text-foreground">Propfirm</span>
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }

  return content;
};

export default BrandLogo;
