/**
 * Initializes and runs the particle system with the given configuration.
 * @param {Object} config Configuration options for the particle system.
 */
function particleSystem({
    connectionThreshold = 170,
    particlesNumber = 50,
    particlesSpeed = 1
} = {}) {
    let particles = [];

    // Create canvas and context
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.className = 'canvas-background';
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');

    // Generates particles with random properties
    function createParticles() {
        for (let i = 0; i < particlesNumber; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 3 + 1;
            const dx = Math.random() * particlesSpeed - particlesSpeed / 2;
            const dy = Math.random() * particlesSpeed - particlesSpeed / 2;
            particles.push({ x, y, radius, dx, dy });
        }
    }

    // Draws particles on the canvas and connects them if they are close enough
    function drawParticles() {
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
    function connectParticles(particle) {
        particles.forEach(otherParticle => {
            if (particle !== otherParticle) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
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
    function animate() {
        requestAnimationFrame(animate);
        drawParticles();
    }

    // Initialize the particle system
    function init() {
        createParticles();
        animate();
        console.log('Particle system active');
    }

    // Bind event listeners
    window.addEventListener('load', init);
}

particleSystem();
