class Layer {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 1667;
    this.height = 500;
    this.gameSpeed = 2;
  }
}

export class Image extends Layer {
  constructor(context, speedModifier, image) {
    super();
    this.context = context;
    this.speedModifier = speedModifier;
    this.image = image;
    this.speed = this.speedModifier * this.gameSpeed;
  }

  update(deltaTime) {
    if (this.x <= -this.width) {
      this.x = 0;
    } else {
      this.x -= this.speed * deltaTime * 0.3;
    }
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
