import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Users, Check, Loader2, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OwnerBadge } from "@/components/OwnerBadge";

interface Permission {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  status: "pending" | "requesting" | "granted" | "denied";
}

export default function Permissions() {
  const [, setLocation] = useLocation();
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "location",
      icon: MapPin,
      title: "Location Access",
      description: "Required to share your GPS coordinates with emergency services",
      status: "pending",
    },
    {
      id: "phone",
      icon: Phone,
      title: "Phone Calls",
      description: "Required to make emergency calls to police and hospitals",
      status: "pending",
    },
    {
      id: "sms",
      icon: MessageSquare,
      title: "SMS Messages",
      description: "Required to send emergency alerts and location info",
      status: "pending",
    },
    {
      id: "contacts",
      icon: Users,
      title: "Contacts Access",
      description: "Optional - to set up emergency contacts from your phone",
      status: "pending",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(-1);

  const requestPermission = async (index: number) => {
    setCurrentIndex(index);
    setPermissions(prev => 
      prev.map((p, i) => i === index ? { ...p, status: "requesting" } : p)
    );

    await new Promise(resolve => setTimeout(resolve, 1500));

    setPermissions(prev => 
      prev.map((p, i) => i === index ? { ...p, status: "granted" } : p)
    );

    if (index < permissions.length - 1) {
      setTimeout(() => requestPermission(index + 1), 500);
    }
  };

  const allGranted = permissions.every(p => p.status === "granted");
  const hasStarted = currentIndex >= 0;

  const handleStart = () => {
    requestPermission(0);
  };

  const handleContinue = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      <OwnerBadge />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              App Permissions
            </h1>
            <p className="text-muted-foreground mt-2">
              SafeRide needs these permissions to keep you safe
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {permissions.map((permission, index) => (
              <motion.div
                key={permission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border flex items-center gap-4 ${
                  permission.status === "granted"
                    ? "bg-safe/10 border-safe/30"
                    : permission.status === "requesting"
                    ? "bg-primary/10 border-primary/30"
                    : "bg-card border-border"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  permission.status === "granted"
                    ? "bg-safe text-safe-foreground"
                    : permission.status === "requesting"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {permission.status === "requesting" ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : permission.status === "granted" ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <permission.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{permission.title}</h3>
                  <p className="text-sm text-muted-foreground">{permission.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {!hasStarted ? (
            <Button
              onClick={handleStart}
              size="lg"
              className="w-full"
              data-testid="button-grant-permissions"
            >
              Grant Permissions
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : allGranted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-4 p-4 rounded-xl bg-safe/10 border border-safe/30">
                <Check className="w-8 h-8 text-safe mx-auto mb-2" />
                <p className="font-medium text-safe">All permissions granted!</p>
                <p className="text-sm text-muted-foreground">SafeRide is ready to protect you</p>
              </div>
              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full bg-safe hover:bg-safe/90 text-safe-foreground"
                data-testid="button-go-to-dashboard"
              >
                Go to Dashboard
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
              Requesting permissions...
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
