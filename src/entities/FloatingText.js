export class FloatingText {
  constructor(game, x, y, text, color = "white") {
    this.game = game;
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.lifespan = 30;
    this.fontSize = 20;
    this.opacity = 1;
  }

  update() {
    this.y -= 1;
    this.lifespan--;
    this.opacity = this.lifespan / 30;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.font = `${this.fontSize}px Arial`;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}
