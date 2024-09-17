class HelpPrinter {
  static printHelp(moves) {
    const numMoves = moves.length;
    const half = Math.floor(numMoves / 2);

    console.log('-'.repeat(80));
    process.stdout.write('| v PC/User >  ');
    moves.forEach(move => process.stdout.write(`|${move.padEnd(12)} `));
    console.log('|');
    console.log('-'.repeat(80));

    for (let i = 0; i < numMoves; i++) {
      process.stdout.write(`| ${moves[i].padEnd(12)} `);

      for (let j = 0; j < numMoves; j++) {
        if (i === j) {
          process.stdout.write(`|${'Draw'.padEnd(12)} `);  
        } else {
          const distance = (j - i + numMoves) % numMoves;
          if (distance <= half) {
            process.stdout.write(`|${'Win'.padEnd(12)} `);  
          } else {
            process.stdout.write(`|${'Lose'.padEnd(12)} `); 
          }
        }
      }
      console.log('|');
      console.log('-'.repeat(80));
    }
  }
}

module.exports = HelpPrinter;
