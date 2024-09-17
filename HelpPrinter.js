class HelpPrinter {
    static printHelp(moves) {
        const n = moves.length;
        const cellWidth = Math.max(...moves.map(move => move.length)) + 2; // Determine the maximum width needed for cells
        const headerWidth = Math.max('v PC/User >'.length, ...moves.map(move => move.length)) + 2;
        const totalWidth = headerWidth * (n + 1) + 1; // Total width of the table including borders

        const separator = '-'.repeat(totalWidth) + '-';
        
        const headers = ['v PC/User >', ...moves];
        const table = [];

        // Create header row
        const headerRow = headers.map(header => header.padEnd(headerWidth)).join('|');
        table.push(separator);
        table.push(`| ${headerRow} |`);
        table.push(separator);

        // Create rows for each move
        moves.forEach((move, rowIndex) => {
            const row = [move];
            moves.forEach((_, colIndex) => {
                if (rowIndex === colIndex) {
                    row.push('Draw'.padEnd(headerWidth));
                } else if ((rowIndex + Math.floor(n / 2)) % n === colIndex) {
                    row.push('Win'.padEnd(headerWidth));
                } else {
                    row.push('Lose'.padEnd(headerWidth));
                }
            });
            const rowString = row.map(cell => cell.padEnd(headerWidth)).join('|');
            table.push(`| ${rowString} |`);
            table.push(separator);
        });

        console.log(table.join('\n'));
    }
}

module.exports = HelpPrinter;
