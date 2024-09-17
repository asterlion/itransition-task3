// GameRules.js
class GameRules {
    constructor(moves) {
        this.moves = moves;
        this.totalMoves = moves.length;
    }

    getResult(userMove, computerMove) {
        const userIndex = this.moves.indexOf(userMove);
        const computerIndex = this.moves.indexOf(computerMove);
        const half = this.totalMoves / 2;

        if (userMove === computerMove) return 'Draw';
        if ((userIndex + half) % this.totalMoves === computerIndex) return 'Win';
        return 'Lose';
    }
}

module.exports = GameRules;
