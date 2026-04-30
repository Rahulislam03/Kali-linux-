const TOOLS_URL = "https://raw.githubusercontent.com/Rahulislam03/Kali-linux-/main/services.json";

export async function loadTools() {
    const grid = document.getElementById('tool-grid');
    try {
        const response = await fetch(TOOLS_URL);
        const tools = await response.json();
        grid.innerHTML = "";

        tools.forEach(tool => {
            const card = document.createElement('a');
            card.href = tool.url;
            card.target = "_blank";
            card.className = "tool-card";
            
            card.innerHTML = `
                <img src="${tool.icon}" class="tool-icon" alt="${tool.name}">
                <span style="font-size: 10px; color: blue; text-transform: uppercase;">${tool.category}</span>
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        console.error("Failed to load tools");
    }
    }
