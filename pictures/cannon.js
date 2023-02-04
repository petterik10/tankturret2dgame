export class Cannon {
  constructor(image, ctx, canvasWidth, canvasHeight) {
    this.image = image;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 100;
    this.height = 100;
    this.x = this.canvasWidth / 2 - this.width + this.width / 2;
    this.y = this.canvasHeight - this.height;
  }

  draw() {
    //this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    /*  this.ctx.drawImage(
      this.image,
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      1,
      -Math.PI / 2
    ); */

    /*  this.ctx.save();
    this.ctx.translate(
      this.x  + this.canvasWidth + this.canvasWidth / 2 - this.x,
      this.y + this.canvasHeight
    );
    this.ctx.rotate((0 * Math.PI) / this.canvasHeight);
    this.ctx.translate(
      -this.x  - this.canvasWidth,
      -this.y  - this.canvasHeight
    ); */
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    //this.ctx.restore();
  }

  movePlayer(input) {
    if (
      input.includes("ArrowRight") &&
      this.x < this.canvasWidth - this.width
    ) {
      this.x += 5;
    } else if (input.includes("ArrowLeft") && this.x > 0) {
      this.x -= 5;
    }
  }

  update(input) {
    this.movePlayer(input);
  }
}
