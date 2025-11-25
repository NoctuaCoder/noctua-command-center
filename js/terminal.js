export function initTerminal() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');

    const commands = {
        help: "Available commands: help, clear, date, echo [text], whoami, projects, snake, about, theme, weather, time, ls, cat, neofetch",
        whoami: "User: Alana | Role: Creative Developer | Status: Building the future",
        date: () => new Date().toString(),
        time: () => new Date().toLocaleTimeString(),
        clear: () => {
            output.innerHTML = '';
            return '';
        },
        projects: "Active Projects: Noctua Command Center, Matrix Owl, Stellar Dots",
        snake: "Launching Snake Game...",
        echo: (args) => args.join(' '),
        about: "Noctua Command Center v1.0 - A celestial productivity dashboard\nMade by NoctuaCoder",
        theme: "Current theme: Celestial Dark\nColors: Cyan (#00f3ff), Purple (#bd00ff), Blue (#0066ff)",
        weather: "Check the Weather widget for current weather!",
        ls: "index.html  css/  js/  README.md  snake.html  favicon.png",
        cat: (args) => {
            if (args[0] === 'README.md') return "# Noctua Command Center\nA stunning celestial-themed productivity dashboard";
            return `cat: ${args[0] || 'file'}: No such file or directory`;
        },
        neofetch: `
╭───────────────────────────────────╮
│   Noctua Command Center       │
│   ───────────────────────       │
│   OS: Noctua OS v1.0             │
│   Shell: NoctuaShell             │
│   Theme: Celestial Dark          │
│   Uptime: ${Math.floor(performance.now() / 1000)}s              │
│   User: Alana                    │
╰───────────────────────────────────╯`
    };

    function printLine(text, type = 'output') {
        if (!text) return;
        const line = document.createElement('div');
        line.className = 'line';
        line.textContent = text;
        if (type === 'command') {
            line.style.color = 'var(--text-muted)';
            line.textContent = `➜ ${text}`;
        }
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    function processCommand(cmdString) {
        const parts = cmdString.trim().split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        printLine(cmdString, 'command');

        if (cmd in commands) {
            const response = commands[cmd];
            if (typeof response === 'function') {
                const result = response(args);
                printLine(result);
            } else {
                printLine(response);
            }

            // Special trigger for snake
            if (cmd === 'snake') {
                document.getElementById('openSnakeBtn').click();
            }
        } else if (cmd !== '') {
            printLine(`Command not found: ${cmd}`);
        }
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(input.value);
            input.value = '';
        }
    });

    // Focus input when clicking on terminal
    document.querySelector('.terminal-panel').addEventListener('click', () => {
        input.focus();
    });
}
