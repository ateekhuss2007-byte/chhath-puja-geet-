import { useEffect, useRef } from 'react';

// Floating diya/particle effect using canvas
export function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    const particles = [];
    const PARTICLE_COUNT = 38;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Diya glow particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.3 + 0.08,
        drift: (Math.random() - 0.5) * 0.4,
        flicker: Math.random() * Math.PI * 2,
        flickerSpeed: Math.random() * 0.04 + 0.01,
        // orange/gold/amber colors
        hue: Math.random() > 0.5 ? `rgba(244,185,66,` : `rgba(232,135,30,`,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.flicker += p.flickerSpeed;
        const flicker = Math.sin(p.flicker) * 0.3 + 0.7;
        const a = p.alpha * flicker;

        // Outer glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
        grd.addColorStop(0, p.hue + (a * 0.9) + ')');
        grd.addColorStop(0.5, p.hue + (a * 0.3) + ')');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue + (a * 1.0) + ')';
        ctx.fill();

        // Float upward slowly
        p.y -= p.speed;
        p.x += p.drift;

        // Wrap around
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
