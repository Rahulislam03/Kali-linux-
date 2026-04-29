// GitHub JSON URL
const JSON_URL = "https://raw.githubusercontent.com/Rahulislam03/Kali-linux-/main/services.json";

export async function initTerminal() {
    const historyDiv = document.getElementById('history');
    const buttonGrid = document.getElementById('button-grid');

    try {
        const response = await fetch(JSON_URL);
        const services = await response.json();
        buttonGrid.innerHTML = ""; // Clear loader

        services.forEach(service => {
            const btn = document.createElement('button');
            btn.className = 'service-btn';
            btn.innerText = service.name;
            btn.onclick = () => {
                printOutput(`[CMD] Executing: ${service.name.toUpperCase()}`);
                if (service.url) {
                    window.open(service.url, '_blank');
                } else {
                    service.output.split('\n').forEach((line, i) => {
                        setTimeout(() => printOutput(line), i * 300);
                    });
                }
            };
            buttonGrid.appendChild(btn);
        });
        printOutput("[OK] Remote modules synchronized successfully.");
    } catch (err) {
        printOutput("[ERROR] Failed to fetch services.");
    }
}

function printOutput(text) {
    const div = document.createElement('div');
    div.className = "output";
    div.innerText = "> " + text;
    document.getElementById('history').appendChild(div);
    const term = document.getElementById('terminal');
    term.scrollTop = term.scrollHeight;
}
  
