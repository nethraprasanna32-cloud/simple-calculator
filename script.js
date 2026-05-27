// Get the display element
const display = document.getElementById('display');

// 1. Core Calculator Functions
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
            // Evaluates the math expression string safely from input
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}

// 2. Premium UI/UX Keyboard Interactions Map
const keyMap = {
    'Enter': '=',
    '=': '=',
    'Backspace': '⌫',
    'Escape': 'C',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '.': '.'
};

// Listen for global keyboard presses
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Check if the pressed key matches a number or an operator map item
    let buttonLabel = keyMap[key] || ((key >= '0' && key <= '9') ? key : null);

    if (buttonLabel) {
        event.preventDefault(); // Prevents browser defaults like page scrolling

        // Run the math logic based on the key pressed
        if ((key >= '0' && key <= '9') || key === '.') {
            appendValue(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            appendValue(key);
        } else if (key === 'Enter' || key === '=') {
            calculate();
        } else if (key === 'Backspace') {
            deleteLast();
        } else if (key === 'Escape') {
            clearDisplay();
        }

        // Animate the matching UI button to mimic a physical mouse click
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.innerText === buttonLabel) {
                btn.style.transform = 'scale(0.95) translateY(1px)';
                btn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                
                // Snap the button back to normal style after 100ms
                setTimeout(() => {
                    btn.style.transform = '';
                    btn.style.backgroundColor = '';
                }, 100);
            }
        });
    }
});