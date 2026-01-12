import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Shield, FileText, Lock, MapPin, Phone, MessageSquare, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { OwnerBadge } from "@/components/OwnerBadge";

export default function Consent() {
  const [, setLocation] = useLocation();
  const [consents, setConsents] = useState({
    location: false,
    emergency: false,
    data: false,
    contacts: false,
  });

  const allConsented = Object.values(consents).every(Boolean);

  const handleContinue = () => {
    setLocation("/permissions");
  };

  const consentItems = [
    {
      key: "location" as const,
      icon: MapPin,
      title: "Location Sharing",
      description: "Allow SafeRide to access and share your GPS location with emergency services during an accident. Your location is only shared during emergencies and is not stored or sold.",
    },
    {
      key: "emergency" as const,
      icon: Phone,
      title: "Emergency Communications",
      description: "Permit automatic calls and SMS to police stations, hospitals, and ambulance services when an accident is detected and confirmed.",
    },
    {
      key: "data" as const,
      icon: Lock,
      title: "Sensor Data Processing",
      description: "Allow processing of accelerometer and impact sensor data from connected devices to detect potential accidents. Data is processed locally and not stored.",
    },
    {
      key: "contacts" as const,
      icon: Users,
      title: "Emergency Contacts",
      description: "Access your contacts to allow you to designate emergency contacts who will be notified during an incident.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      <OwnerBadge />
      
      <div className="flex-1 flex flex-col p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-3">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Privacy & Consent
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Please review and accept the following to continue
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {consentItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  consents[item.key] 
                    ? "bg-primary/5 border-primary/30" 
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <Checkbox
                    id={item.key}
                    checked={consents[item.key]}
                    onCheckedChange={(checked) => 
                      setConsents(prev => ({ ...prev, [item.key]: checked as boolean }))
                    }
                    className="mt-1"
                    data-testid={`checkbox-consent-${item.key}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-4 h-4 text-primary" />
                      <label htmlFor={item.key} className="font-medium text-foreground cursor-pointer">
                        {item.title}
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-safe flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Your Privacy Matters</p>
                <p>
                  SafeRide is committed to protecting your privacy. Your data is encrypted end-to-end and is only used for emergency response purposes. You can revoke these permissions at any time in settings.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full"
            disabled={!allConsented}
            data-testid="button-continue-consent"
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            By continuing, you acknowledge that you have read and understood our{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
