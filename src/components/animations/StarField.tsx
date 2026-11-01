import React, { useEffect, useRef } from 'react';

interface StarFieldProps {
  density?: number;
  speed?: number;
  className?: string;
}

export const StarField: React.FC<StarFieldProps> = ({ 
  density = 65, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate stars
    const starCount = Math.floor((width * height) / 12000) * (density / 50);
    const stars = Array.from({ length: Math.min(starCount, 120) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.3 ? '#F5EBDD' : '#C6A56B' // Ivory or Champagne Gold
    }));

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      dx: number;
      dy: number;
      opacity: number;
    }
    let shootingStar: ShootingStar | null = null;
    let nextShootingStarTime = Date.now() + Math.random() * 6000 + 4000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render static / twinkling stars
      stars.forEach(star => {
        if (!prefersReducedMotion) {
          star.alpha += star.twinkleSpeed * star.direction;
          if (star.alpha > 0.95) {
            star.alpha = 0.95;
            star.direction = -1;
          } else if (star.alpha < 0.2) {
            star.alpha = 0.2;
            star.direction = 1;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();

        // Subtle glow for larger stars
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.alpha * 0.25;
          ctx.fill();
        }
      });

      // Render shooting star occasionally
      if (!prefersReducedMotion) {
        const now = Date.now();
        if (!shootingStar && now > nextShootingStarTime) {
          shootingStar = {
            x: Math.random() * (width * 0.7),
            y: Math.random() * (height * 0.4),
            length: Math.random() * 80 + 50,
            speed: Math.random() * 6 + 5,
            dx: 1.2,
            dy: 0.8,
            opacity: 1
          };
        }

        if (shootingStar) {
          ctx.beginPath();
          const tailX = shootingStar.x - shootingStar.dx * shootingStar.length;
          const tailY = shootingStar.y - shootingStar.dy * shootingStar.length;
          const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          grad.addColorStop(0, 'rgba(198, 165, 107, 0)');
          grad.addColorStop(1, `rgba(245, 235, 221, ${shootingStar.opacity})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.stroke();

          shootingStar.x += shootingStar.dx * shootingStar.speed;
          shootingStar.y += shootingStar.dy * shootingStar.speed;
          shootingStar.opacity -= 0.015;

          if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
            shootingStar = null;
            nextShootingStarTime = Date.now() + Math.random() * 8000 + 5000;
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
