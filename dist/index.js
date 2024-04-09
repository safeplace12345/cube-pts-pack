export function createParticlesBackDrop(config, canvasClass, callBack) {
    const parentElement = document.body;
    let particles = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return () => { };
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
    const createParticle = () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 3 + 1;
        const dx = Math.random() * config.particlesSpeed - config.particlesSpeed / 2;
        const dy = Math.random() * config.particlesSpeed - config.particlesSpeed / 2;
        particles.push({ x, y, radius, dx, dy });
    };
    const drawParticles = () => {
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
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < config.connectionThreshold) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / config.connectionThreshold})`;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                }
            });
        });
    };
    const animate = () => {
        requestAnimationFrame(animate);
        drawParticles();
    };
    for (let i = 0; i < config.particlesNumber; i++) {
        createParticle();
    }
    animate();
    console.log("Particle system active");
    callBack();
    return () => {
        particles = [];
        if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    };
}
