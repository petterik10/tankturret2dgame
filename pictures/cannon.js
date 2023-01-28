export class Cannon {
  constructor(image, ctx, canvasWidth, canvasHeight) {
    this.image = image;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = this.canvasWidth / 2 - 50;
    this.y = this.canvasHeight - 100;
    this.width = 100;
    this.height = 100;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
