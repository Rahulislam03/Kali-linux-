const JSON_URL = "https://raw.githubusercontent.com/Rahulislam03/Kali-linux-/main/services.json";

export async function initTerminal() {
    const grid = document.getElementById('tool-grid');
    try {
        const res = await fetch(JSON_URL);
        const data = await res.json();
        grid.innerHTML = "";
        data.forEach(item => {
            const b = document.createElement('button');
            b.className = "btn";
            b.innerText = item.name;
            b.onclick = () => runTool(item);
            grid.appendChild(b);
        });
        print("SYSTEM_ONLINE: All modules loaded.");
    } catch (e) { print("ERROR: Failed to sync with repository."); }
}

function print(txt) {
    const d = document.createElement('div');
    d.className = "line";
    d.innerText = "> " + txt;
    document.getElementById('history').appendChild(d);
}

function runTool(tool) {
    print(`Executing: ${tool.name}...`);
    if(tool.url) window.open(tool.url, '_blank');
}
