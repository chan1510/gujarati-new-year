
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let rockets = [];
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Name greeting
const nameInput = document.getElementById("name");
const greeting = document.getElementById("greeting");

nameInput.addEventListener("input", function () {
    const name = nameInput.value.trim();

    greeting.innerText = name
        ? "સાલ મુબારક, " + name + "! 🪔✨"
        : "Wishing you a beautiful new beginning! 💛";
});

// Fireworks button
document.getElementById("celebrateBtn").addEventListener("click", celebrate);

function celebrate() {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            rockets.push({
                x: Math.random() * canvas.width,
                y: canvas.height,
                targetY: canvas.height * (0.12 + Math.random() * 0.35),
                speed: 5 + Math.random() * 2,
                color: ["#ffd700", "#ff5e5e", "#48e5ff",
                    "#ff8c42", "#ff66cc"][i % 5]
            });
        }, i * 400);
    }
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 85; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: color,
            size: Math.random() * 2.5 + 1
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rocket animation
    rockets.forEach((rocket, index) => {
        rocket.y -= rocket.speed;

        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = rocket.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = rocket.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (rocket.y <= rocket.targetY) {
            createExplosion(rocket.x, rocket.y, rocket.color);
            rockets.splice(index, 1);
        }
    });

    // Firework particles
    particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.alpha -= 0.012;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

animate();
