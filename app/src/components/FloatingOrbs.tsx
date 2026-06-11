"use client";

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Orb 1 - Top left, cyan glow */}
      <div
        className="absolute animate-drift-1"
        style={{
          top: "10%",
          left: "10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />
      {/* Orb 2 - Bottom right, blue glow */}
      <div
        className="absolute animate-drift-2"
        style={{
          bottom: "10%",
          right: "10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0, 128, 255, 0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />
      {/* Orb 3 - Center, mixed */}
      <div
        className="absolute animate-drift-3"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.04) 0%, rgba(0, 128, 255, 0.03) 50%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}
