export class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.offscreenEnemiesCount = 0;
    this.maxOffscreenEnemies = 10;
    this.gameOver = false;
  }

  incrementOffscreenEnemies() {
    this.offscreenEnemiesCount++;
    if (this.offscreenEnemiesCount >= this.maxOffscreenEnemies) {
      this.gameOver = true;
    }
  }

  isGameOver() {
    return this.gameOver;
  }
}
