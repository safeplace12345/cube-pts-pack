"use client";
import React, { useRef, useEffect } from "react";
import "./Background.scss";

let particles: {
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
}[] = [];

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const connectionThreshold = 170;
    const particlesNumber = 50;
    const particlesSpeed = 1;

    useEffect(() => {
        const canvas = canvasRef.current!;
        if (!canvas || typeof window === "undefined") return;

        const ctx = canvas.getContext("2d")!;
        if (!ctx) return;

        // match canvas size to match css dimensions
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Function to create a particle
        function createParticle() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 3 + 1;
            const dx = Math.random() * particlesSpeed - particlesSpeed / 2;
            const dy = Math.random() * particlesSpeed - particlesSpeed / 2;
            particles.push({ x, y, radius, dx, dy });
        }

        // function to draw particles and connect them when they are close
        function drawParticles() {
            const context = ctx!;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "#2EFDDB";
            context.globalAlpha = 0.5;
            particles.forEach((particle) => {
                context.beginPath();
                context.arc(
                    particle.x,
                    particle.y,
                    particle.radius,
                    0,
                    Math.PI * 2
                );
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
                particles.forEach((otherParticle) => {
                    if (particle !== otherParticle) {
                        const distanceX = particle.x - otherParticle.x;
                        const distanceY = particle.y - otherParticle.y;
                        const distance = Math.sqrt(
                            distanceX * distanceX + distanceY * distanceY
                        );
                        if (distance < connectionThreshold) {
                            const alpha =
                                1 * (1 - distance / connectionThreshold);
                            context.beginPath();
                            context.moveTo(particle.x, particle.y);
                            context.lineTo(otherParticle.x, otherParticle.y);
                            context.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                            context.lineWidth = 1.5;
                            context.stroke();
                        }
                    }
                });
            });
        }

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            drawParticles();
        }

        // Init particles
        for (let i = 0; i < particlesNumber; i++) {
            createParticle();
        }

        animate();

        return () => {
            particles = [];
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className='canvas-background pointer-events-initial fixed left-0 top-0 h-full bg-cover bg-center'
        />
    );
};

export default Background;
