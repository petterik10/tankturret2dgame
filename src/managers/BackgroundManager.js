class Layer {
  constructor(image, speedModifier) {
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1667;
    this.height = 500;
    this.x = 0;
    this.y = 0;
    this.speed = 2 * this.speedModifier;
  }

  update(deltaTime) {
    this.x -= this.speed * deltaTime * 0.3;
    if (this.x <= -this.width) this.x = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class BackgroundManager {
  constructor(ctx) {
    this.ctx = ctx;
    this.layers = [];
  }

  init() {
    this.layers = [
      new Layer(document.getElementById("layer2"), 0.4),
      new Layer(document.getElementById("layer4"), 0.8),
    ];
  }

  update(deltaTime) {
    this.layers.forEach((layer) => layer.update(deltaTime));
  }

  render() {
    this.layers.forEach((layer) => layer.draw(this.ctx));
  }
}
