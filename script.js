const display = document.getElementById('display');

function appendValue(val) {
    display.value += val;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        if (display.value) {
            // Replaces the basic display percent symbol context logic mapping safely
            let expression = display.value.replace(/%/g, '/100');
            display.value = eval(expression);
        }
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1300);
    }
}

// Global active keyboard event mapping trackers
const keyMap = {
    'Enter': '=', '=': '=', 'Backspace': '⌫', 'Escape': 'C',
    '+': '+', '-': '-', '*': '*', '/': '/', '.': '.', '%': '%'
};

document.addEventListener('keydown', function(event) {
    const key = event.key;
    let buttonLabel = keyMap[key] || ((key >= '0' && key <= '9') ? key : null);

    if (buttonLabel) {
        event.preventDefault();
        if ((key >= '0' && key <= '9') || key === '.') appendValue(key);
        else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') appendValue(key);
        else if (key === 'Enter' || key === '=') calculate();
        else if (key === 'Backspace') deleteLast();
        else if (key === 'Escape') clearDisplay();

        // Trigger tactical highlight action pulse
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.innerText === buttonLabel) {
                btn.style.transform = 'scale(0.94)';
                setTimeout(() => btn.style.transform = '', 90);
            }
        });
    }
});