const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
let particlesArray;
const PARTICLE_DENSITY_DIVISOR = 28000;
const MAX_PARTICLE_SPEED = 0.14;
const MAX_PARTICLE_SIZE = 1.3;
const LINK_DISTANCE_FACTOR = 10;
const LINK_ALPHA_FACTOR = 42000;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * (MAX_PARTICLE_SPEED * 2)) - MAX_PARTICLE_SPEED;
        this.directionY = (Math.random() * (MAX_PARTICLE_SPEED * 2)) - MAX_PARTICLE_SPEED;
        this.size = Math.random() * MAX_PARTICLE_SIZE;
        this.color = '#00f3ff';
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / PARTICLE_DENSITY_DIVISOR;
    for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
    connect();
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width / LINK_DISTANCE_FACTOR) * (canvas.height / LINK_DISTANCE_FACTOR)) {
                const alpha = Math.max(0, 0.3 - (distance / LINK_ALPHA_FACTOR));
                ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth; canvas.height = innerHeight; init();
});

init();
animate();
