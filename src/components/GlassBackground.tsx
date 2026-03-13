// DS-02: Animated background gradient blobs component
// Replaces static hero background with a "living" premium feel
export function GlassBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#080c14]" />

      {/* Animated gradient blobs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px]
                   rounded-full opacity-20 blur-[120px]
                   bg-gradient-to-br from-amber-600 to-yellow-400"
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px]
                   rounded-full opacity-[0.15] blur-[100px]
                   bg-gradient-to-br from-blue-800 to-indigo-600"
        style={{ animationDelay: '6s' }}
      />
      <div
        className="absolute top-[40%] left-[50%] w-[400px] h-[400px]
                   rounded-full opacity-10 blur-[80px]
                   bg-gradient-to-br from-amber-400 to-orange-600"
        style={{ animationDelay: '12s' }}
      />
    </div>
  );
}
