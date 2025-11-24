// Main Entry Point
import { initPomodoro } from './pomodoro.js';
import { initTerminal } from './terminal.js';

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initStars();
    initPomodoro();
    initTerminal();
    initSnakeModal();
});

/* --- Clock & Greeting --- */
function initClock() {
    const clockEl = document.getElementById('clock');
    const dateEl = document.getElementById('date');
    const greetingEl = document.getElementById('greeting');

    function updateTime() {
        const now = new Date();
        
        // Time
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockEl.textContent = `${hours}:${minutes}`;

        // Date
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);

        // Greeting
        const hour = now.getHours();
        let greeting = 'Welcome back';
        if (hour < 12) greeting = 'Good Morning';
        else if (hour < 18) greeting = 'Good Afternoon';
        else greeting = 'Good Evening';
        
        greetingEl.textContent = `${greeting}, Alana`;
    }

    updateTime();
    setInterval(updateTime, 1000); // Update every second
}

/* --- Star Background --- */
function initStars() {
    const container = document.getElementById('starsContainer');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3 + 1; // 1px to 4px
        
        // Random animation properties
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.7 + 0.3;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--delay', `${delay}s`);
        star.style.setProperty('--opacity', opacity);

        container.appendChild(star);
    }
}

/* --- Snake Modal --- */
function initSnakeModal() {
    const modal = document.getElementById('snakeModal');
    const btn = document.getElementById('openSnakeBtn');
    const close = document.querySelector('.close-modal');
    const frame = document.getElementById('snakeFrame');

    // Path to the existing snake game
    // Assuming it's hosted or accessible relative to this file
    // For local dev, we might need to adjust this path
    const snakeGamePath = '../matrix-owl/snake.html'; 

    btn.addEventListener('click', () => {
        frame.src = snakeGamePath;
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('visible'), 10);
    });

    close.addEventListener('click', () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
            frame.src = ''; // Stop game
        }, 300);
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            close.click();
        }
    });
}
