interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
}

interface ParticleSystemConfig {
  connectionThreshold?: number;
  particlesNumber?: number;
  particlesSpeed?: number;
}

exports.createParticlesBackDrop = function particleSystem({
  connectionThreshold,
  particlesNumber,
  particlesSpeed,
}: ParticleSystemConfig, callBack: () => void) {
  let particles: Particle[] = [];

  // Create canvas and context
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  applyStyling();

  document.body.appendChild(canvas);
  const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

  if (!context) {
    throw new Error('Failed to get canvas context');
  }

  function applyStyling() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = "100%";
    canvas.style.background = "rgb(46, 253, 219)";
    canvas.style.backgroundImage = `radial-gradient(
    circle,
    rgb(12, 77, 78),
    rgb(6, 65, 70),
    rgb(5, 53, 61),
    rgb(5, 41, 51),
    rgb(6, 30, 40)
    )`;
    
    if (window.matchMedia('(max-width: 992px)').matches) {
      canvas.style.width = "unset";
    }
  }

  // Generates particles with random properties
  function createParticles(): void {
    let i = 0
    while (i < particlesNumber) {
      const x: number = Math.random() * canvas.width;
      const y: number = Math.random() * canvas.height;
      const radius: number = Math.random() * 3 + 1;
      const dx: number = Math.random() * particlesSpeed - particlesSpeed / 2;
      const dy: number = Math.random() * particlesSpeed - particlesSpeed / 2;
      particles.push({ x, y, radius, dx, dy });
      i++
    }
  }

  // Draws particles on the canvas and connects them if they are close enough
  function drawParticles(): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      context.fillStyle = "#2EFDDB";
      context.globalAlpha = 0.5;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.x = (particle.x + canvas.width) % canvas.width;
      particle.y = (particle.y + canvas.height) % canvas.height;

      connectParticles(particle);
    });
  }

  // Connects particles that are within the connection threshold
  function connectParticles(particle: Particle): void {
    particles.forEach(otherParticle => {
      if (particle !== otherParticle) {
        const dx: number = particle.x - otherParticle.x;
        const dy: number = particle.y - otherParticle.y;
        const distance: number = Math.sqrt(dx * dx + dy * dy);
        if (distance < connectionThreshold) {
          context.strokeStyle = `rgba(255, 255, 255, ${1 - distance / connectionThreshold})`;
          context.lineWidth = 1.5;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(otherParticle.x, otherParticle.y);
          context.stroke();
        }
      }
    });
  }

  // Animates the drawing of particles
  function animate(): void {
    requestAnimationFrame(animate);
    drawParticles();
  }

  // Initialize the particle system
  function init(): void {
    createParticles();
    animate();
    console.log('Particle system active');
    callBack()
  }

  // Bind event listeners
  window.addEventListener('load', init);
}  