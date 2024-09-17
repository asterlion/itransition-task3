// MoveGenerator.js
class MoveGenerator {
    constructor(moves) {
        this.moves = moves;
        this.totalMoves = moves.length;
    }

    getMove(index) {
        return this.moves[index];
    }

    getRandomMove() {
        return this.moves[Math.floor(Math.random() * this.totalMoves)];
    }

    getHalfMoves() {
        return this.totalMoves / 2;
    }

    isValidMove(index) {
        return index >= 1 && index <= this.totalMoves;
    }
}

module.exports = MoveGenerator;
