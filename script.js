// Initialize the display with '0.'    => show zero on screen
window.onload = function() {
    document.getElementById('display').value = '0';
};


// Global variable to track if last character was an operator + false means => was not an operator
let lastIsOperator = false;

// Function to append character to the display    => when you arite charater this function works
function appendCharacter(character) {
    const display = document.getElementById('display');    
    const currentValue = display.value;

    // If display shows "0", replace it unless character is "."
    if (currentValue === '0' && character !== '.' && !isOperator(character)) {
        display.value = character;
        lastIsOperator = false;
        return;
    }

    // Handle decimal point
    if (character === '.') {
        const parts = currentValue.split(/[\+\-\*\/]/); // Split on operators
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
            return; // Don't allow multiple decimals in the current number => end their
        }
        display.value += '.';
        lastIsOperator = false;
        return;
    }

    // Prevent consecutive operators
    if (isOperator(character)) {
        if (lastIsOperator) {
            return;
        }
        lastIsOperator = true;
    } 
    else {
        lastIsOperator = false;
    }

    display.value += character;
}

// Helper: Check if character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// Clear the display
function clearDisplay() {
    document.getElementById('display').value = '0';
    lastIsOperator = false;
}

// Delete last character
function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);

    if (display.value === '') {
        display.value = '0';
    }

    // Update lastIsOperator status
    const lastChar = display.value.slice(-1);
    lastIsOperator = isOperator(lastChar);
}

// Calculate the result
function calculateResult() {
    const display = document.getElementById('display');
    try {
        let result = eval(display.value);

        // Format result: show up to 6 decimal places if needed
        display.value = Number(result.toFixed(6)).toString();
        lastIsOperator = false;
    } catch (error) {
        display.value = 'Error';
    }
}
