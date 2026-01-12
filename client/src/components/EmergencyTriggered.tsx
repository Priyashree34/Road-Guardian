import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Loader2, CheckCircle2, AlertTriangle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyTriggeredProps {
  onCancel: () => void;
}

export function EmergencyTriggered({ onCancel }: EmergencyTriggeredProps) {
  const [steps, setSteps] = useState([
    { id: "location", label: "Sharing GPS Location", icon: MapPin, status: "loading" },
    { id: "police", label: "Alerting Nearby Police", icon: Phone, status: "pending" },
    { id: "ambulance", label: "Contacting Ambulance Services", icon: AlertTriangle, status: "pending" },
    { id: "sms", label: "Sending SMS to Emergency Contacts", icon: MessageSquare, status: "pending" },
  ]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setSteps(s => s.map((step, i) => i === 0 ? { ...step, status: "done" } : i === 1 ? { ...step, status: "loading" } : step)), 1500),
      setTimeout(() => setSteps(s => s.map((step, i) => i === 1 ? { ...step, status: "done" } : i === 2 ? { ...step, status: "loading" } : step)), 3000),
      setTimeout(() => setSteps(s => s.map((step, i) => i === 2 ? { ...step, status: "done" } : i === 3 ? { ...step, status: "loading" } : step)), 4500),
      setTimeout(() => setSteps(s => s.map((step, i) => i === 3 ? { ...step, status: "done" } : step)), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const allDone = steps.every(s => s.status === "done");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-emergency/20 to-background"
      data-testid="emergency-triggered-screen"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-24 h-24 mb-6 rounded-full bg-emergency/20 flex items-center justify-center glow-emergency"
      >
        <Navigation className="w-12 h-12 text-emergency" />
      </motion.div>

      <h1 className="font-display text-3xl font-bold text-foreground mb-2 text-center">
        Emergency Response Active
      </h1>
      <p className="text-muted-foreground text-center mb-8 max-w-sm">
        Help is on the way. Stay calm and remain in a safe location if possible.
      </p>

      <div className="w-full max-w-sm space-y-3 mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-xl border ${
              step.status === "done" 
                ? "bg-safe/10 border-safe/30" 
                : step.status === "loading"
                ? "bg-warning/10 border-warning/30"
                : "bg-muted/50 border-border"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step.status === "done" 
                ? "bg-safe text-safe-foreground" 
                : step.status === "loading"
                ? "bg-warning text-warning-foreground"
                : "bg-muted text-muted-foreground"
            }`}>
              {step.status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : step.status === "done" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <span className={`flex-1 font-medium ${
              step.status === "done" ? "text-safe" : 
              step.status === "loading" ? "text-warning" : 
              "text-muted-foreground"
            }`}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-sm p-4 rounded-xl bg-card border border-border mb-6">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="font-medium">Your Location</span>
        </div>
        <div className="h-32 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
          <div className="text-center">
            <p className="font-mono text-xs">28.6139° N, 77.2090° E</p>
            <p className="text-xs mt-1">Connaught Place, New Delhi</p>
          </div>
        </div>
      </div>

      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Button
            onClick={onCancel}
            variant="outline"
            size="lg"
            className="w-full"
            data-testid="button-back-to-dashboard"
          >
            Back to Dashboard
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
