// DS-03: Reusable GlassCard component
// Apply to: platform cards, partner cards, portfolio cards, stat counters, investor form

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6',
        hover && 'glass-hover cursor-pointer',
        glow && 'ring-1 ring-amber-400/20',
        className
      )}
    >
      {children}
    </div>
  );
}
