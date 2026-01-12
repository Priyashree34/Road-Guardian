import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Server, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OwnerBadge } from "@/components/OwnerBadge";

export default function Privacy() {
  const sections = [
    {
      icon: Lock,
      title: "Data Collection",
      content: "SafeRide collects location data, sensor readings from connected devices, and contact information solely for emergency response purposes. We collect your email and phone number for account management and emergency notifications."
    },
    {
      icon: Eye,
      title: "Data Usage",
      content: "Your data is used exclusively to: (1) Detect potential accidents through sensor analysis, (2) Share your location with emergency services when an accident is confirmed, (3) Contact emergency services and your designated contacts, (4) Improve our accident detection algorithms using anonymized data."
    },
    {
      icon: Server,
      title: "Data Storage",
      content: "Location data is processed in real-time and not stored after your trip ends. Accident reports are retained for 90 days for safety analysis. Your account information is stored securely with industry-standard encryption."
    },
    {
      icon: Shield,
      title: "Data Sharing",
      content: "We share your data only with: (1) Emergency services (police, hospitals, ambulances) during confirmed emergencies, (2) Your designated emergency contacts during incidents. We never sell your data to third parties."
    },
    {
      icon: Trash2,
      title: "Data Deletion",
      content: "You can request deletion of your account and all associated data at any time through the app settings or by contacting us. Account deletion is processed within 30 days, and all personal data is permanently removed."
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: "For privacy concerns or data requests, contact us at privacy@saferide.app. We respond to all inquiries within 48 hours."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      <OwnerBadge />
      
      <header className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/register">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-display text-xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8">
            <p className="text-muted-foreground">
              Last updated: January 2026
            </p>
            <p className="text-muted-foreground mt-4">
              SafeRide ("we", "our", or "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our accident detection and emergency response application.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-semibold text-lg">{section.title}</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-semibold mb-2">Your Rights</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Access your personal data</li>
              <li>• Correct inaccurate data</li>
              <li>• Delete your data</li>
              <li>• Export your data in a portable format</li>
              <li>• Withdraw consent at any time</li>
              <li>• Lodge a complaint with a supervisory authority</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
