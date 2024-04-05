interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
}

export function createParticlesBackDrop(
  connectionThreshold: number,
  particlesNumber: number,
  particlesSpeed: number,
  canvasClass: string
): () => void {
  const parentElement = document.body;

  let particles: Particle[] = [];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.height = "100%";
  canvas.style.background = "rgb(46, 253, 219)";
  canvas.style.backgroundImage = `radial-gradient(
  circle,
  rgb(12, 77, 78),
  rgb(6, 65, 70),
  rgb(5, 53, 61),
  rgb(5, 41, 51),
  rgb(6, 30, 40)
  )`;
  canvas.setAttribute("class", canvasClass);

  // Append canvas to the body
  parentElement.appendChild(canvas);

  // Ensure correct dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const createParticle = (): void => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3 + 1;
    const dx = Math.random() * particlesSpeed - particlesSpeed / 2;
    const dy = Math.random() * particlesSpeed - particlesSpeed / 2;
    particles.push({ x, y, radius, dx, dy });
  };

  const drawParticles = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#2EFDDB";
    ctx.globalAlpha = 0.5;
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();

      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x > canvas.width || particle.x < 0) {
        particle.dx *= -1;
      }
      if (particle.y > canvas.height || particle.y < 0) {
        particle.dy *= -1;
      }

      particles.forEach((otherParticle) => {
        if (particle !== otherParticle) {
          const distance = Math.hypot(
            particle.x - otherParticle.x,
            particle.y - otherParticle.y
          );
          if (distance < connectionThreshold) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              1 - distance / connectionThreshold
            })`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      });
    });
  };

  const animate = (): void => {
    requestAnimationFrame(animate);
    drawParticles();
  };

  for (let i = 0; i < particlesNumber; i++) {
    createParticle();
  }

  animate();

  return () => {
    particles = [];
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
}
