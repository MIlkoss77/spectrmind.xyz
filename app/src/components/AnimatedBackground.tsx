"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  brightness: number;
}

const CONFIG = {
  pupilEase: 0.1,
  particleCount: 60,
  blinkInterval: 5000,
  eyeColor: "#A3E635",
  bgColor: "#0A0A0F",
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const stateRef = useRef({
    currentPupilX: 0,
    currentPupilY: 0,
    pupilScale: 1,
    targetPupilScale: 1,
    isBlinking: false,
    blinkStartTime: 0,
    particles: [] as Particle[],
  });
  const rafRef = useRef<number>(0);
  const blinkIntervalRef = useRef<ReturnType<typeof setInterval>>();

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push({
        angle: (Math.PI * 2 * i) / CONFIG.particleCount,
        radius: 50 + Math.random() * 60,
        speed: 0.005 + Math.random() * 0.01,
        size: 1 + Math.random() * 2,
        brightness: 0.3 + Math.random() * 0.7,
      });
    }
    stateRef.current.particles = particles;
  }, []);

  const drawEye = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      px: number,
      py: number,
      scale: number,
      w: number,
      h: number
    ) => {
      const state = stateRef.current;
      ctx.save();

      // Calculate blink factor
      let blinkFactor = 1;
      if (state.isBlinking) {
        const progress = (Date.now() - state.blinkStartTime) / 300;
        if (progress < 0.5) {
          blinkFactor = 1 - Math.sin(progress * Math.PI);
        } else if (progress < 1) {
          blinkFactor = Math.sin((progress - 0.5) * Math.PI);
        } else {
          state.isBlinking = false;
          blinkFactor = 1;
        }
      }

      if (blinkFactor <= 0.01) {
        ctx.restore();
        return;
      }

      // Eye gradient background
      const eyeGradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
      eyeGradient.addColorStop(0, "rgba(42, 10, 31, 0.8)");
      eyeGradient.addColorStop(0.5, "rgba(10, 10, 15, 0.9)");
      eyeGradient.addColorStop(1, "rgba(10, 10, 15, 1)");

      ctx.fillStyle = eyeGradient;
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.4, h * 0.35 * blinkFactor, 0, 0, Math.PI * 2);
      ctx.fill();

      // Outer glow
      ctx.shadowColor = CONFIG.eyeColor;
      ctx.shadowBlur = 20;
      ctx.strokeStyle = "rgba(163, 230, 53, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.4, h * 0.35 * blinkFactor, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw iris and pupil only if eye is open enough
      if (blinkFactor > 0.3) {
        // Iris gradient
        const irisGradient = ctx.createRadialGradient(
          x + px,
          y + py,
          0,
          x + px,
          y + py,
          40 * scale
        );
        irisGradient.addColorStop(0, "#A3E635");
        irisGradient.addColorStop(0.5, "#4ADE80");
        irisGradient.addColorStop(1, "transparent");

        ctx.fillStyle = irisGradient;
        ctx.beginPath();
        ctx.arc(x + px, y + py, 40 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Pupil
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(x + px, y + py, 18 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(x + px - 8, y + py - 8, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scan lines during blink
      if (state.isBlinking) {
        ctx.fillStyle = "rgba(163, 230, 53, 0.1)";
        const lineCount = Math.floor(10 * blinkFactor);
        for (let i = 0; i < lineCount; i++) {
          const lineY =
            y -
            h * 0.35 * blinkFactor +
            (i * (h * 0.7 * blinkFactor)) / lineCount;
          ctx.fillRect(x - w * 0.4, lineY, w * 0.8, 1);
        }
      }

      ctx.restore();
    },
    []
  );

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      const particles = stateRef.current.particles;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;
        const px = x + Math.cos(p.angle) * p.radius;
        const py = y + Math.sin(p.angle) * p.radius;

        // Draw particle
        ctx.fillStyle = `rgba(163, 230, 53, ${p.brightness * 0.6})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw faint trail line to pupil center
        ctx.strokeStyle = "rgba(163, 230, 53, 0.1)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const state = stateRef.current;
      state.currentPupilX = window.innerWidth / 2;
      state.currentPupilY = window.innerHeight / 2;
    };

    handleResize();
    initParticles();

    // Set initial mouse position to center
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      stateRef.current.targetPupilScale = 1.5;
    };

    const handleMouseUp = () => {
      stateRef.current.targetPupilScale = 1;
    };

    const draw = () => {
      const state = stateRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = CONFIG.bgColor;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Smooth pupil follow
      state.currentPupilX +=
        (mouseRef.current.x - state.currentPupilX) * CONFIG.pupilEase;
      state.currentPupilY +=
        (mouseRef.current.y - state.currentPupilY) * CONFIG.pupilEase;

      // Smooth scale
      state.pupilScale +=
        (state.targetPupilScale - state.pupilScale) * 0.1;

      // Clamp pupil distance
      const dx = state.currentPupilX - cx;
      const dy = state.currentPupilY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 100;

      let pupilX = dx;
      let pupilY = dy;
      if (dist > maxDist) {
        const ratio = maxDist / dist;
        pupilX = dx * ratio;
        pupilY = dy * ratio;
      }

      // Draw eye
      drawEye(ctx, cx, cy, pupilX, pupilY, state.pupilScale, width, height);

      // Draw particles
      drawParticles(ctx, cx + pupilX, cy + pupilY);

      rafRef.current = requestAnimationFrame(draw);
    };

    // Blink interval
    const startBlinkInterval = () => {
      blinkIntervalRef.current = setInterval(() => {
        stateRef.current.isBlinking = true;
        stateRef.current.blinkStartTime = Date.now();
      }, CONFIG.blinkInterval + Math.random() * 3000);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    rafRef.current = requestAnimationFrame(draw);
    startBlinkInterval();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafRef.current);
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
      }
    };
  }, [initParticles, drawEye, drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.2 }}
    />
  );
}
