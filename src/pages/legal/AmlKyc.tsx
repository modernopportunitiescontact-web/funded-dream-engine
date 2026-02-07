import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const AmlKyc = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BrandLogo size="sm" />
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10 text-primary" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
            AML & KYC Policy
          </h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              The BEST Propfirm is committed to preventing money laundering and terrorist financing. This Anti-Money Laundering (AML) and Know Your Customer (KYC) policy outlines our procedures for verifying the identity of our users and detecting suspicious activities.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">2. Know Your Customer (KYC)</h2>
            <p className="text-muted-foreground leading-relaxed">
              During registration, all users must provide accurate personal information including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Full legal name</li>
              <li>Valid email address</li>
              <li>Phone number</li>
              <li>Country of residence</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For withdrawal requests, additional verification may be required:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Government-issued photo ID (passport, national ID, driver's license)</li>
              <li>Proof of address (utility bill, bank statement dated within 3 months)</li>
              <li>Selfie holding the ID document</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">3. Anti-Money Laundering (AML)</h2>
            <p className="text-muted-foreground leading-relaxed">
              The BEST Propfirm implements the following AML measures:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Transaction monitoring for unusual patterns</li>
              <li>Source of funds verification for large withdrawals</li>
              <li>Screening against international sanctions lists</li>
              <li>Documentation of all financial transactions</li>
              <li>Regular staff training on AML procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">4. Prohibited Activities</h2>
            <p className="text-muted-foreground leading-relaxed">
              The following are strictly prohibited:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Using false or stolen identities</li>
              <li>Money laundering or terrorist financing</li>
              <li>Using funds from illegal sources</li>
              <li>Creating multiple accounts</li>
              <li>Account sharing or selling</li>
              <li>Circumventing verification procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">5. Account Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              To prevent fraud and ensure fair use:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Each individual may only have one active account</li>
              <li>Duplicate accounts will be terminated without refund</li>
              <li>Account verification is required before first withdrawal</li>
              <li>Unverified accounts may be subject to restrictions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">6. Suspicious Activity Reporting</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Freeze accounts pending investigation</li>
              <li>Request additional documentation at any time</li>
              <li>Report suspicious activities to relevant authorities</li>
              <li>Terminate accounts that fail verification</li>
              <li>Refuse service to high-risk individuals or regions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">7. Cryptocurrency Payments</h2>
            <p className="text-muted-foreground leading-relaxed">
              For cryptocurrency transactions, we:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Track wallet addresses associated with each user</li>
              <li>Monitor for transactions from sanctioned or high-risk addresses</li>
              <li>May request proof of wallet ownership for withdrawals</li>
              <li>Reserve the right to reject payments from suspicious sources</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">8. Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              All KYC documents and personal information are:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Stored securely with encryption</li>
              <li>Accessible only to authorized compliance staff</li>
              <li>Retained in accordance with legal requirements</li>
              <li>Protected under our Privacy Policy</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">9. Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using The BEST Propfirm, you agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Complete verification procedures when requested</li>
              <li>Notify us of any changes to your personal information</li>
              <li>Cooperate with any compliance investigations</li>
            </ul>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Last updated: February 2024
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AmlKyc;
