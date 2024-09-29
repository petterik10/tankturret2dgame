export class ScoreManager {
  constructor() {
    this.score = 0;
  }

  incrementScore() {
    this.score += 1;
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.score = 0;
  }
}
