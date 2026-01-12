import { Shield } from "lucide-react";

export function OwnerBadge() {
  return (
    <div 
      className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg pointer-events-none select-none"
      data-testid="owner-badge"
    >
      <Shield className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-semibold tracking-wide text-foreground/80">pdey</span>
    </div>
  );
}
