const crypto = require('crypto');
const readline = require('readline');
const GameRules = require('./GameRules');
const HelpPrinter = require('./HelpPrinter');

function generateKey() {
  return crypto.randomBytes(32).toString('hex');
}

function generateHMAC(key, message) {
  return crypto.createHmac('sha256', key).update(message).digest('hex');
}

function printAvailableMoves(moves) {
  console.log('Available moves:');
  moves.forEach((move, index) => {
    console.log(`${index + 1} - ${move}`);
  });
  console.log('0 - exit');
  console.log('hlp - help');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length % 2 === 0 || args.length < 3) {
    console.log('Error: The number of moves must be an odd number ≥ 3.');
    console.log('Usage: node game.js <move1> <move2> ... <moveN>');
    return;
  }

  const moves = Array.from(new Set(args));
  if (moves.length !== args.length) {
    console.log('Error: All moves must be unique.');
    console.log('Usage: node game.js <move1> <move2> ... <moveN>');
    return;
  }

  let gameRules;
  try {
    gameRules = new GameRules(moves);
  } catch (error) {
    console.error(error.message);
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
  }

  while (true) {
    const key = generateKey();
    let computerMove = moves[Math.floor(Math.random() * moves.length)];
    let hmac = generateHMAC(key, computerMove);

    console.log(`HMAC: ${hmac}`);
    printAvailableMoves(moves);

    const userInput = await askQuestion('Enter your move: ');

    if (userInput === '0') {
      console.log('Exiting...');
      rl.close();
      break;
    } else if (userInput === 'hlp') {
      HelpPrinter.printHelp(moves);
      console.log('Make your move:');
    } else {
      const userMoveIndex = parseInt(userInput, 10) - 1;
      if (userMoveIndex >= 0 && userMoveIndex < moves.length) {
        const userMove = moves[userMoveIndex];
        const result = gameRules.getResult(userMove, computerMove);
        console.log(`Your move: ${userMove}`);
        console.log(`Computer move: ${computerMove}`);
        console.log(`Result: ${result}`);
        console.log(`HMAC key: ${key}`);
        console.log('='.repeat(80));
      } else {
        console.log('Invalid move. Please try again.');
      }
    }
  }
}

main();
