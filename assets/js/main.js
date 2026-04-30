const SERVICES_URL = "https://raw.githubusercontent.com/Rahulislam03/Kali-linux-/main/services.json";

export async function initTerminal() {
    const grid = document.getElementById('tool-grid');
    if (!grid) return;

    try {
        const response = await fetch(SERVICES_URL);
        const tools = await response.json();
        grid.innerHTML = ""; 

        tools.forEach(tool => {
            const btn = document.createElement('button');
            btn.className = "btn";
            btn.innerText = tool.name;
            btn.onclick = () => {
                const history = document.getElementById('history');
                const div = document.createElement('div');
                div.className = "line";
                div.innerText = `> Running ${tool.name}...`;
                history.appendChild(div);
                
                if(tool.url) window.open(tool.url, '_blank');
            };
            grid.appendChild(btn);
        });
    } catch (err) {
        console.error("Tool sync failed");
    }
}
