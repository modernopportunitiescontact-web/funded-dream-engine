import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  linkTo?: string;
}

const BrandLogo = ({ size = "md", showText = true, linkTo = "/" }: BrandLogoProps) => {
  const sizeClasses = {
    sm: { img: "h-8", text: "text-lg" },
    md: { img: "h-10", text: "text-xl" },
    lg: { img: "h-12", text: "text-2xl" },
  };

  const content = (
    <div className="flex items-center gap-2">
      <img src={logoImage} alt="The BEST Propfirm" className={`${sizeClasses[size].img} w-auto`} />
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
