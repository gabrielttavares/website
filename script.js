document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const inputText = document.querySelector('.input-text');

    let inputHistory = [];
    let historyIndex = -1;
    let currentInput = '';

    // Update input text and cursor position
    terminalInput.addEventListener('input', () => {
        inputText.textContent = terminalInput.value;
    });

    // Handle arrow keys and special keys
    terminalInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (historyIndex === -1) {
                    currentInput = terminalInput.value;
                }
                if (historyIndex < inputHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = inputHistory[inputHistory.length - 1 - historyIndex];
                    inputText.textContent = terminalInput.value;
                    // Move cursor to end of input
                    setTimeout(() => {
                        terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                    }, 0);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = inputHistory[inputHistory.length - 1 - historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    terminalInput.value = currentInput;
                }
                inputText.textContent = terminalInput.value;
                // Move cursor to end of input
                setTimeout(() => {
                    terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                }, 0);
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                // Let default behavior handle cursor movement
                break;
        }
    });

    const commands = {
        help: () => `Available commands:
- help: Show this help message
- about: About Gabriel Tavares
- clear: Clear the terminal
- projects: List my projects
- contact: How to reach me
- quote: Display "life is good afterall"`,

        about: () => `I'm a Software Developer who works professionally on building user-friendly web and mobile solutions, focusing on scalable and robust full-stack applications.`,

        clear: () => {
            terminalOutput.textContent = '';
            return '';
        },

        projects: () => `My Projects:
1. Terminal Portfolio - An interactive way to showcase my work
2. [More projects coming soon...]`,

        contact: () => `Get in touch:
Email: contact@gabrielttavares
GitHub: GabrielTTavares`,

        quote: () => `"life is good afterall" - GTT`,
    };

    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            if (command) {
                inputHistory.push(command);
            }
            historyIndex = -1;
            currentInput = '';

            const commandLine = `<span class="prompt">contact@gabrielttavares:$</span> ${command}\n`;
            terminalOutput.innerHTML += commandLine;

            let commandOutputText = '';
            if (command in commands) {
                commandOutputText = commands[command]();
                if (command !== 'clear') {
                    terminalOutput.innerHTML += `<div class="command-output">${commandOutputText}</div>\n`;
                }
            } else if (command !== '') {
                commandOutputText = `Command not found: ${command}. Type 'help' for available commands.`;
                terminalOutput.innerHTML += `<div class="error-output">${commandOutputText}</div>\n`;
            }

            terminalInput.value = '';
            inputText.textContent = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    document.querySelector('.container').addEventListener('click', (e) => {
        if (e.target !== terminalInput) {
            terminalInput.focus();
        }
    });
}); 