// Main Entry Point
import { initPomodoro } from './pomodoro.js';
import { initTerminal } from './terminal.js';
import { initConstellations } from './constellations.js';
import { initWeather } from './weather.js';
import { initPlayer } from './player.js';
import { initCrypto } from './crypto.js';
import { initQuickLinks } from './quicklinks.js';
import { initKeyboardShortcuts } from './keyboard.js';
import { settings } from './settings.js';

// Global instances
window.noctuaSettings = settings;
window.noctuaQuickLinks = null;
window.noctuaKeyboard = null;

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initConstellations();
    initPomodoro();
    initWeather();
    initCrypto();
    initPlayer();
    initTerminal();
    initSnakeModal();

    // Initialize new features
    window.noctuaQuickLinks = initQuickLinks();
    window.noctuaKeyboard = initKeyboardShortcuts();
    initSettingsUI();

    // Listen for custom events
    document.addEventListener('toggleEditMode', () => {
        const editMode = window.noctuaQuickLinks.toggleEditMode();
        const container = document.querySelector('.links-grid');
        if (container) {
            window.noctuaQuickLinks.render(container);
        }

        // Update button text
        const btn = document.getElementById('editLinksBtn');
        if (btn) {
            btn.textContent = editMode ? 'Done' : 'Edit Links';
        }
    });

    document.addEventListener('openSettings', () => {
        document.getElementById('settingsModal')?.classList.remove('hidden');
    });
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


/* --- Snake Modal --- */
function initSnakeModal() {
    const modal = document.getElementById('snakeModal');
    const btn = document.getElementById('openSnakeBtn');
    const close = document.querySelector('.close-modal');
    const frame = document.getElementById('snakeFrame');

    // Path to the Snake game (now included in the repository)
    const snakeGamePath = 'snake.html';

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

/* --- Settings UI --- */
function initSettingsUI() {
    // Settings modal will be added to HTML
    const settingsModal = document.getElementById('settingsModal');
    if (!settingsModal) return;

    const closeBtn = settingsModal.querySelector('.close-modal');
    const exportBtn = document.getElementById('exportSettings');
    const importBtn = document.getElementById('importSettings');
    const resetBtn = document.getElementById('resetSettings');

    closeBtn?.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
    });

    exportBtn?.addEventListener('click', () => {
        settings.export();
    });

    importBtn?.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                settings.import(file, (success, error) => {
                    if (success) {
                        alert('Settings imported successfully! Reloading...');
                        location.reload();
                    } else {
                        alert('Error importing settings: ' + error);
                    }
                });
            }
        };
        input.click();
    });

    resetBtn?.addEventListener('click', () => {
        if (confirm('Reset all settings to default? This cannot be undone.')) {
            settings.reset();
            alert('Settings reset! Reloading...');
            location.reload();
        }
    });
}
