// Settings management for Noctua Command Center
import { Storage } from './storage.js';

const SETTINGS_KEY = 'noctua-settings';

// Default settings
const DEFAULT_SETTINGS = {
    quickLinks: [
        { name: 'GitHub', url: 'https://github.com', icon: '⌘' },
        { name: 'Localhost', url: 'http://localhost:3000', icon: '◉' },
        { name: 'YouTube', url: 'https://youtube.com', icon: '▶' },
        { name: 'AI Chat', url: 'https://chatgpt.com', icon: '◆' }
    ],
    widgets: {
        'links-panel': { visible: true, order: 1 },
        'time-panel': { visible: true, order: 2 },
        'pomodoro-panel': { visible: true, order: 3 },
        'weather-panel': { visible: true, order: 4 },
        'crypto-panel': { visible: true, order: 5 },
        'terminal-panel': { visible: true, order: 6 },
        'player-panel': { visible: true, order: 7 },
        'snake-panel': { visible: true, order: 8 }
    },
    pomodoro: {
        workDuration: 25,
        shortBreak: 5,
        longBreak: 15,
        sessionsUntilLongBreak: 4,
        autoStart: false,
        soundEnabled: false
    },
    weather: {
        location: 'auto',
        units: 'celsius',
        refreshInterval: 600000 // 10 minutes
    },
    crypto: {
        currencies: ['bitcoin', 'ethereum'],
        refreshInterval: 60000 // 1 minute
    },
    theme: {
        accentColor: '#00f3ff'
    }
};

export class Settings {
    constructor() {
        this.settings = this.load();
    }

    // Load settings from localStorage
    load() {
        const saved = Storage.get(SETTINGS_KEY);
        if (saved) {
            // Merge with defaults to ensure all keys exist
            return this.mergeWithDefaults(saved);
        }
        return { ...DEFAULT_SETTINGS };
    }

    // Merge saved settings with defaults
    mergeWithDefaults(saved) {
        const merged = { ...DEFAULT_SETTINGS };
        Object.keys(saved).forEach(key => {
            if (typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
                merged[key] = { ...DEFAULT_SETTINGS[key], ...saved[key] };
            } else {
                merged[key] = saved[key];
            }
        });
        return merged;
    }

    // Save settings to localStorage
    save() {
        return Storage.set(SETTINGS_KEY, this.settings);
    }

    // Get a setting value
    get(path) {
        const keys = path.split('.');
        let value = this.settings;
        for (const key of keys) {
            value = value?.[key];
        }
        return value;
    }

    // Set a setting value
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let obj = this.settings;

        for (const key of keys) {
            if (!obj[key]) obj[key] = {};
            obj = obj[key];
        }

        obj[lastKey] = value;
        this.save();
    }

    // Reset to defaults
    reset() {
        this.settings = { ...DEFAULT_SETTINGS };
        this.save();
    }

    // Export settings
    export() {
        const dataStr = JSON.stringify(this.settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `noctua-settings-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import settings
    import(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                this.settings = this.mergeWithDefaults(imported);
                this.save();
                callback(true, null);
            } catch (error) {
                callback(false, 'Invalid settings file');
            }
        };
        reader.readAsText(file);
    }
}

// Create global settings instance
export const settings = new Settings();
