export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.scorePosition = { x: 20, y: 40 };
  }

  renderUI(gameState, scoreManager) {
    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(
      `Score: ${scoreManager.getScore()}`,
      this.scorePosition.x,
      this.scorePosition.y
    );
    this.ctx.restore();
  }

  renderGameOver(gameState) {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = "red";
    this.ctx.font = "30px Monospace";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      "Game Over",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 40
    );
    this.ctx.font = "20px Monospace";
    this.ctx.fillText(
      "Too many enemies have passed the defence line",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 10
    );
    this.ctx.fillText(
      "Press Space to restart",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 + 20
    );
    this.ctx.restore();
  }
}
