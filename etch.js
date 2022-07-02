// lay out the grid based on some user input
// each item of grid should have mousemove
// color is selectable

(() => {
    function createGrid(gridSize) {
        const etch = document.getElementById('etch');
        // Could also just add/remove the delta.
        etch.replaceChildren();
        etch.style = `
            grid-template-columns: repeat(${gridSize}, auto);
            grid-template-rows: repeat(${gridSize}, auto);
        `;
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            etch.appendChild(cell);
        }
    }

    document.getElementById('etch').addEventListener('mousemove', event => {
        const mode = document.querySelector('input[name="mode"]:checked').value;
        switch (mode) {
            case 'rainbow':
                const rgb = [
                    parseInt(Math.random() * 255),
                    parseInt(Math.random() * 255),
                    parseInt(Math.random() * 255),
                ];
                event.target.style = `background-color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
                break;
            case 'gradient':
                const bgColor = event.target.style['background-color'];
                const gradientPrefix = 'rgba(0, 0, 0, ';
                const maxGradient = 'rgb(0, 0, 0)';
                if (bgColor.startsWith(gradientPrefix)) {
                    const [_, rawOpacity] = bgColor.match(/rgba\(0, 0, 0, ([0-9.]*)\)/);
                    const opacity = parseFloat(rawOpacity);
                    if (opacity < 1) {
                        event.target.style = `background-color: rgba(0, 0, 0, ${opacity + 0.1})`;
                    }
                } else {
                    if (bgColor !== maxGradient) {
                        event.target.style = 'background-color: rgba(0, 0, 0, 0.1)';
                    }
                }
                break;
        }
    });

    document.querySelector('input[type="number"]').addEventListener('change', event => {
        createGrid(event.target.value);
    });

    createGrid(document.querySelector('input[type="number"]').value);
})();
