class GameRules {
  constructor(moves) {
    if (moves.length % 2 === 0 || moves.length < 3) {
      throw new Error("The number of moves must be an odd number ≥ 3.");
    }
    this.moves = moves;
    this.half = Math.floor(moves.length / 2);
  }

  getResult(playerMove, computerMove) {
    const playerIndex = this.moves.indexOf(playerMove);
    const computerIndex = this.moves.indexOf(computerMove);

    if (playerIndex === -1 || computerIndex === -1) {
      throw new Error("Invalid move.");
    }

    if (playerIndex === computerIndex) {
      return "Draw";
    }

    const distance = (computerIndex - playerIndex + this.moves.length) % this.moves.length;

    if (distance <= this.half) {
      return "Lose";
    } else {
      return "Win";
    }
  }
}

module.exports = GameRules;
