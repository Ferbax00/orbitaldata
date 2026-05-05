document.addEventListener('DOMContentLoaded', () => {
    const ring1 = document.querySelector('.ring-1');
    const ring2 = document.querySelector('.ring-2');
    const ring3 = document.querySelector('.ring-3');
    const nodes = document.querySelectorAll('.node');

    if (!ring1 || !ring2 || !ring3) return;

    const reduceMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
        let last = performance.now();
        let rotation = 0;
        let speed = 0.008;
        let targetSpeed = 0.008;
        let nextSpeedChangeAt = last + 1200 + Math.random() * 1800;

        function rotate(now) {
            const dt = now - last;
            last = now;

            if (now >= nextSpeedChangeAt) {
                // Cambia objetivo de velocidad en rangos suaves y naturales.
                targetSpeed = 0.004 + Math.random() * 0.009;
                nextSpeedChangeAt = now + 1200 + Math.random() * 2200;
            }

            // Interpolación para que la variación se sienta orgánica.
            speed += (targetSpeed - speed) * 0.03;
            rotation += dt * speed;

            ring1.style.transform = `rotate(${rotation}deg)`;
            ring2.style.transform = `rotate(${-rotation * 0.7}deg)`;
            ring3.style.transform = `rotate(${rotation * 1.3}deg)`;

            requestAnimationFrame(rotate);
        }

        requestAnimationFrame(rotate);

        let pulse = 0;
        setInterval(() => {
            pulse = (pulse + 0.05) % (Math.PI * 2);
            nodes.forEach((node, index) => {
                const scale = 0.9 + Math.sin(pulse + index) * 0.08;
                node.style.transform = `scale(${scale})`;
            });
        }, 80);
    }
});
