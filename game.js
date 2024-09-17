const crypto = require('crypto');
const readline = require('readline');
const HelpPrinter = require('./HelpPrinter');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const moves = process.argv.slice(2);

function validateMoves(moves) {
    if (moves.length < 3 || moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
        console.error('Error: The number of moves must be an odd number ≥ 3, and all moves must be unique.');
        console.error('Usage: node game.js <move1> <move2> ... <moveN>');
        console.error('where N is an odd number ≥ 3, and all moves are unique.');
        console.error('Example: node game.js Rock Paper Scissors Lizard Spock');
        process.exit(1);
    }
}

function generateKey() {
    return crypto.randomBytes(32).toString('hex'); // 256 bits key
}

function generateHMAC(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

function determineWinner(move1, move2, moves) {
    const index1 = moves.indexOf(move1);
    const index2 = moves.indexOf(move2);
    const n = moves.length;
    const winThreshold = Math.floor(n / 2);
    return (index1 + winThreshold) % n > index2 && (index2 + winThreshold) % n > index1;
}

function printMoves() {
    console.log('Available moves:');
    moves.forEach((move, index) => {
        console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - exit');
    console.log('hlp - help');
}

function handleUserMove() {
    const key = generateKey();
    const computerMove = moves[Math.floor(Math.random() * moves.length)];
    const hmac = generateHMAC(key, computerMove);

    console.log(`HMAC: ${hmac}`);
    printMoves();

    rl.question('Enter your move: ', (userInput) => {
        if (userInput === 'hlp') {
            HelpPrinter.printHelp(moves);
            handleUserMove(); // Wait for user move after showing help
            return;
        }

        if (userInput === '0') {
            console.log('Exiting the game.');
            rl.close(); // Close the readline interface and exit the program
            return;
        }

        const userMoveIndex = parseInt(userInput, 10) - 1;
        if (isNaN(userMoveIndex) || userMoveIndex < 0 || userMoveIndex >= moves.length) {
            console.log('Invalid option. Please try again.');
            handleUserMove(); // Wait for user move after invalid input
            return;
        }

        const userMove = moves[userMoveIndex];
        const result = determineWinner(userMove, computerMove, moves);

        console.log(`Your move: ${userMove}`);
        console.log(`Computer move: ${computerMove}`);
        if (userMove === computerMove) {
            console.log('Draw!');
        } else if (result) {
            console.log('You win!');
        } else {
            console.log('You lose!');
        }
        console.log(`HMAC key: ${key}`);
        console.log('========================================');
        handleUserMove(); // Wait for user move after showing result
    });
}

function main() {
    validateMoves(moves);
    handleUserMove(); // Start the game loop
}

main();
