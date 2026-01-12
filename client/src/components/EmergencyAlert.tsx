import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Phone, MessageSquare, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyAlertProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  timeoutSeconds?: number;
}

export function EmergencyAlert({ isOpen, onConfirm, onCancel, timeoutSeconds = 10 }: EmergencyAlertProps) {
  const [countdown, setCountdown] = useState(timeoutSeconds);
  const [isAutoTriggering, setIsAutoTriggering] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(timeoutSeconds);
      setIsAutoTriggering(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsAutoTriggering(true);
          clearInterval(timer);
          setTimeout(() => onConfirm(), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeoutSeconds, onConfirm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          data-testid="emergency-alert-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-md p-6 rounded-2xl border-2 ${
              isAutoTriggering 
                ? "border-emergency bg-emergency/20 glow-emergency" 
                : "border-emergency/50 bg-card"
            } shadow-2xl`}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  repeatDelay: 0.5 
                }}
                className="w-20 h-20 mb-4 rounded-full bg-emergency/20 flex items-center justify-center"
              >
                <AlertTriangle className="w-10 h-10 text-emergency" />
              </motion.div>

              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Accident Detected!
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Do you need emergency assistance? If no response, help will be called automatically.
              </p>

              <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: timeoutSeconds, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-warning to-emergency"
                />
              </div>

              <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-emergency/10 border border-emergency/30">
                <span className="text-4xl font-display font-bold text-emergency">
                  {countdown}
                </span>
                <span className="text-sm text-muted-foreground">
                  seconds until<br/>auto-alert
                </span>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <Button
                  onClick={onConfirm}
                  size="lg"
                  className="w-full h-14 text-lg font-semibold bg-emergency hover:bg-emergency/90 text-emergency-foreground pulse-emergency"
                  data-testid="button-confirm-emergency"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Yes, I Need Help
                </Button>

                <Button
                  onClick={onCancel}
                  size="lg"
                  variant="outline"
                  className="w-full h-14 text-lg font-semibold border-2 border-safe text-safe hover:bg-safe hover:text-safe-foreground"
                  data-testid="button-cancel-emergency"
                >
                  <X className="w-5 h-5 mr-2" />
                  No, I'm Okay
                </Button>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> GPS Location
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Emergency Call
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> SMS Alert
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
