const { randomBytes } = require('crypto');

// Retrieve command line arguments
const args = process.argv.slice(2); // Skip first two elements (node executable and script path)
const operation = args[0]; // First argument is the operation

// Function to perform operations
function performOperation(operation, operands) {
    switch (operation) {
        case 'add':
            return operands.reduce((a, b) => a + b, 0);
        case 'sub':
            return operands.slice(1).reduce((a, b) => a - b, operands[0]);
        case 'mult':
            return operands.reduce((a, b) => a * b, 1);
        case 'divide':
            return operands.slice(1).reduce((a, b) => a / b, operands[0]);
        case 'sin':
            return Math.sin(operands[0]);
        case 'cos':
            return Math.cos(operands[0]);
        case 'tan':
            return Math.tan(operands[0]);
        case 'random':
            const length = parseInt(operands[0]);
            if (isNaN(length)) {
                console.log("Provide length for random number generation.");
                return;
            }
            return generateRandomNumber(length);
        default:
            console.log("Invalid operation");
            return;
    }
}

// Function to generate random number of specified length
function generateRandomNumber(length) {
    const byteLength = Math.ceil(length / 2); // Each byte produces 2 hex characters
    const randomBytes = crypto.randomBytes(byteLength);
    const randomNumber = randomBytes.toString('hex').slice(0, length);
    return randomNumber;
}

// Main logic
if (!operation || args.length < 2) {
    console.log("Usage: node index.js <operation> [operands]");
    console.log("Operations: add, sub, mult, divide, sin, cos, tan, random");
} else {
    const operands = args.slice(1).map(parseFloat);
    const result = performOperation(operation, operands);
    if (result !== undefined) {
        console.log("Result:", result);
    }
}
