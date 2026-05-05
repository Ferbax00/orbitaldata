(function () {
    const canvas = document.getElementById('networkCanvas');
    const ctx = canvas && canvas.getContext('2d');
    if (!canvas || !ctx) return;

    let particlesArray;
    const PARTICLE_DENSITY_DIVISOR = 24000;
    const MAX_PARTICLE_SPEED = 0.14;
    const MAX_PARTICLE_SIZE = 1.3;
    const LINK_DISTANCE_FACTOR = 10;
    const LINK_ALPHA_FACTOR = 42000;
    const COLORS = ['#34e8d4', '#ffb020'];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.directionX = Math.random() * (MAX_PARTICLE_SPEED * 2) - MAX_PARTICLE_SPEED;
            this.directionY = Math.random() * (MAX_PARTICLE_SPEED * 2) - MAX_PARTICLE_SPEED;
            this.size = Math.random() * MAX_PARTICLE_SIZE;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
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
        const numberOfParticles = (canvas.height * canvas.width) / PARTICLE_DENSITY_DIVISOR;
        for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const distance =
                    (particlesArray[a].x - particlesArray[b].x) ** 2 +
                    (particlesArray[a].y - particlesArray[b].y) ** 2;
                const threshold = (canvas.width / LINK_DISTANCE_FACTOR) * (canvas.height / LINK_DISTANCE_FACTOR);
                if (distance < threshold) {
                    const alpha = Math.max(0, 0.38 - distance / LINK_ALPHA_FACTOR);
                    ctx.strokeStyle = `rgba(52, 232, 212, ${alpha})`;
                    ctx.lineWidth = 0.85;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
        connect();
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    init();
    animate();
})();
