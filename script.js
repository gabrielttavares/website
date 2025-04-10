document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    const commands = {
        help: () => `Available commands:
- help: Show this help message
- about: About Gabriel Tavares
- clear: Clear the terminal
- projects: List my projects
- contact: How to reach me
- quote: Display "life is good afterall"`,

        about: () => `Gabriel Tavares (GTT)
A passionate developer who believes in creating meaningful experiences through code.`,

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
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    document.querySelector('.container').addEventListener('click', (e) => {
        if (e.target !== terminalInput) {
            terminalInput.focus();
        }
    });
}); 