"use strict";
exports.__esModule = true;
exports.createParticlesBackDrop = void 0;
function createParticlesBackDrop(_a, callBack) {
    var _b = _a.connectionThreshold, connectionThreshold = _b === void 0 ? 170 : _b, _c = _a.particlesNumber, particlesNumber = _c === void 0 ? 50 : _c, _d = _a.particlesSpeed, particlesSpeed = _d === void 0 ? 1 : _d;
    var particles = [];
    // Create canvas and context
    var canvas = document.createElement('canvas');
    applyStyling();
    document.body.appendChild(canvas);
    var context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Failed to get canvas context');
    }
    function applyStyling() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = "100%";
        canvas.style.background = "rgb(46, 253, 219)";
        canvas.style.backgroundImage = "radial-gradient(\n    circle,\n    rgb(12, 77, 78),\n    rgb(6, 65, 70),\n    rgb(5, 53, 61),\n    rgb(5, 41, 51),\n    rgb(6, 30, 40)\n    )";
        if (window.matchMedia('(max-width: 992px)').matches) {
            canvas.style.width = "unset";
        }
    }
    // Generates particles with random properties
    function createParticles() {
        var i = 0;
        while (i < particlesNumber) {
            var x = Math.random() * canvas.width;
            var y = Math.random() * canvas.height;
            var radius = Math.random() * 3 + 1;
            var dx = Math.random() * particlesSpeed - particlesSpeed / 2;
            var dy = Math.random() * particlesSpeed - particlesSpeed / 2;
            particles.push({ x: x, y: y, radius: radius, dx: dx, dy: dy });
            i++;
        }
    }
    // Draws particles on the canvas and connects them if they are close enough
    function drawParticles() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (particle) {
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
        particles.forEach(function (otherParticle) {
            if (particle !== otherParticle) {
                var dx = particle.x - otherParticle.x;
                var dy = particle.y - otherParticle.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionThreshold) {
                    context.strokeStyle = "rgba(255, 255, 255, ".concat(1 - distance / connectionThreshold, ")");
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
        callBack();
    }
    // Bind event listeners
    window.addEventListener('load', init);
}
exports.createParticlesBackDrop = createParticlesBackDrop;
