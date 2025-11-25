// Keyboard shortcuts for Noctua Command Center

export class KeyboardShortcuts {
    constructor() {
        this.shortcuts = {
            'ctrl+k': { action: 'commandPalette', description: 'Open command palette' },
            'ctrl+l': { action: 'focusLinks', description: 'Focus quick links' },
            'ctrl+t': { action: 'focusTerminal', description: 'Focus terminal' },
            'ctrl+p': { action: 'togglePomodoro', description: 'Toggle Pomodoro timer' },
            'ctrl+s': { action: 'openSettings', description: 'Open settings' },
            'ctrl+e': { action: 'toggleEditMode', description: 'Toggle edit mode' },
            'ctrl+/': { action: 'showHelp', description: 'Show keyboard shortcuts' },
            'escape': { action: 'closeModals', description: 'Close modals' }
        };

        this.commandPaletteVisible = false;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        const key = this.getKeyCombo(e);
        const shortcut = this.shortcuts[key];

        if (shortcut) {
            e.preventDefault();
            this.executeAction(shortcut.action);
        }
    }

    getKeyCombo(e) {
        const parts = [];
        if (e.ctrlKey) parts.push('ctrl');
        if (e.altKey) parts.push('alt');
        if (e.shiftKey) parts.push('shift');

        const key = e.key.toLowerCase();
        if (key !== 'control' && key !== 'alt' && key !== 'shift') {
            parts.push(key);
        }

        return parts.join('+');
    }

    executeAction(action) {
        switch (action) {
            case 'commandPalette':
                this.toggleCommandPalette();
                break;
            case 'focusLinks':
                document.querySelector('.link-card')?.focus();
                break;
            case 'focusTerminal':
                document.getElementById('terminalInput')?.focus();
                break;
            case 'togglePomodoro':
                document.getElementById('startTimer')?.click();
                break;
            case 'openSettings':
                this.openSettings();
                break;
            case 'toggleEditMode':
                this.toggleEditMode();
                break;
            case 'showHelp':
                this.showHelp();
                break;
            case 'closeModals':
                this.closeAllModals();
                break;
        }
    }

    toggleCommandPalette() {
        let palette = document.getElementById('commandPalette');

        if (!palette) {
            palette = this.createCommandPalette();
            document.body.appendChild(palette);
        }

        this.commandPaletteVisible = !this.commandPaletteVisible;
        palette.classList.toggle('hidden', !this.commandPaletteVisible);

        if (this.commandPaletteVisible) {
            palette.querySelector('input')?.focus();
        }
    }

    createCommandPalette() {
        const palette = document.createElement('div');
        palette.id = 'commandPalette';
        palette.className = 'command-palette hidden';
        palette.innerHTML = `
            <div class="palette-content glass-panel">
                <input type="text" placeholder="Type a command..." class="palette-input">
                <div class="palette-results">
                    <div class="palette-item" data-action="openSettings">
                        <span class="palette-icon">⚙</span>
                        <span class="palette-label">Settings</span>
                        <span class="palette-shortcut">Ctrl+S</span>
                    </div>
                    <div class="palette-item" data-action="toggleEditMode">
                        <span class="palette-icon">✎</span>
                        <span class="palette-label">Edit Quick Links</span>
                        <span class="palette-shortcut">Ctrl+E</span>
                    </div>
                    <div class="palette-item" data-action="showHelp">
                        <span class="palette-icon">?</span>
                        <span class="palette-label">Keyboard Shortcuts</span>
                        <span class="palette-shortcut">Ctrl+/</span>
                    </div>
                    <div class="palette-item" data-action="focusTerminal">
                        <span class="palette-icon">▶</span>
                        <span class="palette-label">Focus Terminal</span>
                        <span class="palette-shortcut">Ctrl+T</span>
                    </div>
                </div>
            </div>
        `;

        // Add click handlers
        palette.addEventListener('click', (e) => {
            const item = e.target.closest('.palette-item');
            if (item) {
                const action = item.dataset.action;
                this.executeAction(action);
                this.toggleCommandPalette();
            }
        });

        // Close on background click
        palette.addEventListener('click', (e) => {
            if (e.target === palette) {
                this.toggleCommandPalette();
            }
        });

        return palette;
    }

    showHelp() {
        const help = document.createElement('div');
        help.className = 'modal';
        help.innerHTML = `
            <div class="modal-content glass-panel" style="max-width: 600px;">
                <span class="close-modal">×</span>
                <h2>Keyboard Shortcuts</h2>
                <div class="shortcuts-list">
                    ${Object.entries(this.shortcuts).map(([key, { description }]) => `
                        <div class="shortcut-item">
                            <kbd>${key.replace(/\+/g, ' + ').toUpperCase()}</kbd>
                            <span>${description}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(help);

        help.querySelector('.close-modal').onclick = () => help.remove();
        help.onclick = (e) => {
            if (e.target === help) help.remove();
        };
    }

    openSettings() {
        // Trigger settings modal (will be implemented in settings UI)
        const event = new CustomEvent('openSettings');
        document.dispatchEvent(event);
    }

    toggleEditMode() {
        const event = new CustomEvent('toggleEditMode');
        document.dispatchEvent(event);
    }

    closeAllModals() {
        document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
            modal.classList.add('hidden');
        });
        if (this.commandPaletteVisible) {
            this.toggleCommandPalette();
        }
    }
}

// Initialize keyboard shortcuts
export function initKeyboardShortcuts() {
    return new KeyboardShortcuts();
}
