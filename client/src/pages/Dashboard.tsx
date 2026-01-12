import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, MapPin, Phone, MessageSquare, Settings, Bell, 
  Activity, Wifi, WifiOff, Battery, AlertTriangle, ChevronRight,
  Users, History, Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { OwnerBadge } from "@/components/OwnerBadge";
import { EmergencyAlert } from "@/components/EmergencyAlert";
import { EmergencyTriggered } from "@/components/EmergencyTriggered";

export default function Dashboard() {
  const [isProtectionActive, setIsProtectionActive] = useState(true);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [showEmergencyTriggered, setShowEmergencyTriggered] = useState(false);
  const [sensorConnected, setSensorConnected] = useState(true);

  const handleEmergencyConfirm = () => {
    setShowEmergencyAlert(false);
    setShowEmergencyTriggered(true);
  };

  const handleEmergencyCancel = () => {
    setShowEmergencyAlert(false);
  };

  const handleBackToDashboard = () => {
    setShowEmergencyTriggered(false);
  };

  const simulateAccident = () => {
    setShowEmergencyAlert(true);
  };

  if (showEmergencyTriggered) {
    return <EmergencyTriggered onCancel={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      <OwnerBadge />
      
      <EmergencyAlert
        isOpen={showEmergencyAlert}
        onConfirm={handleEmergencyConfirm}
        onCancel={handleEmergencyCancel}
        timeoutSeconds={10}
      />

      <header className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emergency flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg">SafeRide</h1>
              <p className="text-xs text-muted-foreground">Protection Active</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" data-testid="button-settings">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4 overflow-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border-2 ${
            isProtectionActive 
              ? "bg-safe/10 border-safe/30 glow-safe" 
              : "bg-muted border-border"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={isProtectionActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  isProtectionActive ? "bg-safe" : "bg-muted-foreground"
                }`}
              >
                <Shield className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h2 className="font-display text-xl font-bold">
                  {isProtectionActive ? "Protected" : "Protection Off"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isProtectionActive 
                    ? "Accident detection is active" 
                    : "Turn on for safety monitoring"
                  }
                </p>
              </div>
            </div>
            <Switch
              checked={isProtectionActive}
              onCheckedChange={setIsProtectionActive}
              data-testid="switch-protection"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-background/50 text-center">
              <MapPin className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">GPS</p>
              <p className="text-xs font-medium text-safe">Active</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 text-center">
              <Activity className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Sensors</p>
              <p className="text-xs font-medium text-safe">Connected</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 text-center">
              <Battery className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Battery</p>
              <p className="text-xs font-medium">87%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-xl border flex items-center gap-4 ${
            sensorConnected 
              ? "bg-card border-border" 
              : "bg-warning/10 border-warning/30"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            sensorConnected ? "bg-safe/10" : "bg-warning/20"
          }`}>
            {sensorConnected ? (
              <Wifi className="w-6 h-6 text-safe" />
            ) : (
              <WifiOff className="w-6 h-6 text-warning" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">
              {sensorConnected ? "Sensor Connected" : "Sensor Disconnected"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {sensorConnected 
                ? "Vehicle impact sensor is online" 
                : "Check your device connection"
              }
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSensorConnected(!sensorConnected)}
            data-testid="button-sensor-toggle"
          >
            {sensorConnected ? "Details" : "Reconnect"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <button className="p-4 rounded-xl bg-card border border-border text-left hover:bg-accent transition-colors" data-testid="button-emergency-contacts">
            <Users className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-medium">Emergency Contacts</h3>
            <p className="text-xs text-muted-foreground">3 contacts set</p>
          </button>
          <button className="p-4 rounded-xl bg-card border border-border text-left hover:bg-accent transition-colors" data-testid="button-trip-history">
            <History className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-medium">Trip History</h3>
            <p className="text-xs text-muted-foreground">View past trips</p>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Connected Vehicles</h3>
            <Button variant="ghost" size="sm" data-testid="button-add-vehicle">
              + Add
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Car className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm">Honda Activa 6G</p>
                <p className="text-xs text-muted-foreground">Scooter • Last synced: 2 min ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-safe" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-xl bg-primary/10 border border-primary/30"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-sm">Test Emergency Response</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Simulate an accident detection to see how the emergency workflow works.
              </p>
              <Button
                size="sm"
                variant="destructive"
                onClick={simulateAccident}
                className="bg-emergency hover:bg-emergency/90"
                data-testid="button-simulate-accident"
              >
                Simulate Accident
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-2">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center p-2 text-primary" data-testid="nav-home">
            <Shield className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-map">
            <MapPin className="w-5 h-5" />
            <span className="text-xs mt-1">Map</span>
          </button>
          <button className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-contacts">
            <Phone className="w-5 h-5" />
            <span className="text-xs mt-1">SOS</span>
          </button>
          <button className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-settings">
            <Settings className="w-5 h-5" />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
