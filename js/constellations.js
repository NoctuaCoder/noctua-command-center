export function initConstellations() {
    // Generate 50+ 4-pointed stars
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-4p';

        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Random size
        const size = 10 + Math.random() * 20;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Random animation delay
        star.style.animationDelay = Math.random() * 5 + 's';

        // Random animation duration
        const twinkleDuration = 2 + Math.random() * 3;
        const floatDuration = 4 + Math.random() * 4;
        star.style.animation = `twinkle ${twinkleDuration}s ease-in-out infinite, floatStar ${floatDuration}s ease-in-out infinite`;

        starsContainer.appendChild(star);
    }

    // Custom Cursor Logic
    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add magnetic effect to glass panels
    const panels = document.querySelectorAll('.glass-panel');

    panels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            panel.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(0, 255, 255, 0.08), rgba(255,255,255,0.03))`;
        });

        panel.addEventListener('mouseleave', () => {
            panel.style.background = 'var(--card-bg)';
        });
    });
}
