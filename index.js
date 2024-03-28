var connectionThreshold = 170;
var particlesNumber = 50;
var particlesSpeed = 1;
function createBackGround() {
    var particles = [];
    var canvas = document.createElement('canvas');
    document.body.append(canvas);
    if (!canvas || typeof window === "undefined")
        return;
    var ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    // match canvas size to match css dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "rgb(46, 253, 219)";
    canvas.style.backgroundImage = "radial-gradient(\n        circle,\n        rgb(12, 77, 78),\n        rgb(6, 65, 70),\n        rgb(5, 53, 61),\n        rgb(5, 41, 51),\n        rgb(6, 30, 40)\n    )";
    for (var i = 0; i < particlesNumber; i++) {
        createParticle(canvas, particles, particlesSpeed);
    }
    var mediaQ = window.matchMedia('(max-width: 992px)');
    if (mediaQ.matches) {
        canvas.style.width = 'unset';
    }
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        drawParticles(particles, canvas);
    }
    animate();
};
/**
 * @name createParticle
 * @param canvas
 * @param particles
 * @param particlesSpeed
 * @param creates one single particle
 */
function createParticle(canvas, particles, particlesSpeed) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var radius = Math.random() * 3 + 1;
    var dx = Math.random() * particlesSpeed - particlesSpeed / 2;
    var dy = Math.random() * particlesSpeed - particlesSpeed / 2;
    particles.push({ x: x, y: y, radius: radius, dx: dx, dy: dy });
}
/**
 * @name drawParticles
 * @param particles
 * @param canvas
 * @returns
 */
// function to draw particles and connect them when they are close
function drawParticles(particles, canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#2EFDDB";
    context.globalAlpha = 0.5;
    particles.forEach(function (particle) {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        particle.x += particle.dx;
        particle.y += particle.dy;
        // Make particles wrap around the canvas edges
        if (particle.x > canvas.width) {
            particle.x = 0;
        }
        if (particle.x < 0) {
            particle.x = canvas.width;
        }
        if (particle.y > canvas.height) {
            particle.y = 0;
        }
        if (particle.y < 0) {
            particle.y = canvas.height;
        }
        // a string gets created here that gets connected between particles
        particles.forEach(function (otherParticle) {
            if (particle !== otherParticle) {
                var distanceX = particle.x - otherParticle.x;
                var distanceY = particle.y - otherParticle.y;
                var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                if (distance < connectionThreshold) {
                    var alpha = 1 * (1 - distance / connectionThreshold);
                    context.beginPath();
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(otherParticle.x, otherParticle.y);
                    context.strokeStyle = "rgba(255, 255, 255, ".concat(alpha, ")");
                    context.lineWidth = 1.5;
                    context.stroke();
                }
            }
        });
    });
}
createBackGround()