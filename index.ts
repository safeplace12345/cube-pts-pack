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
  
  export function particleSystem({
    connectionThreshold = 170,
    particlesNumber = 50,
    particlesSpeed = 1,
  }: ParticleSystemConfig = {}) {
    let particles: Particle[] = [];
  
    // Create canvas and context
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.className = 'canvas-background';
    document.body.appendChild(canvas);
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
  
    if (!context) {
      throw new Error('Failed to get canvas context');
    }
  
    // Generates particles with random properties
    function createParticles(): void {
      for (let i = 0; i < particlesNumber; i++) {
        const x: number = Math.random() * canvas.width;
        const y: number = Math.random() * canvas.height;
        const radius: number = Math.random() * 3 + 1;
        const dx: number = Math.random() * particlesSpeed - particlesSpeed / 2;
        const dy: number = Math.random() * particlesSpeed - particlesSpeed / 2;
        particles.push({ x, y, radius, dx, dy });
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
    }
  
    // Bind event listeners
    window.addEventListener('load', init);
  }  