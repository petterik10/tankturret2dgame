export class Circle {
  constructor(game, ctx, canvasWidth, canvasHeight, x, y, angle) {
    this.game = game;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.clicked = false;
    this.markedForDeletion = false;

    this.frames = [];
    for (let i = 1; i <= 2; i++) {
      const img = new Image();
      img.src = `./pictures/tank_bulletFly${i}.png`;
      this.frames.push(img);
    }

    this.frameIndex = 0;
    this.frameCount = 0;
    this.angle = angle; 
  }

  draw() {
    const currentFrame = this.frames[this.frameIndex];

    this.ctx.save();

    this.ctx.translate(this.x, this.y);

    this.ctx.rotate(this.angle);

    this.ctx.drawImage(
      currentFrame,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    this.ctx.restore();
  }

  update() {
    if (this.clicked) {
      this.x += 3.3 * Math.cos(this.angle);
      this.y += 3.3 * Math.sin(this.angle);
    }

    if (
      this.clicked &&
      (this.y < 0 || this.x < 0 || this.x > this.canvasWidth)
    ) {
      this.markedForDeletion = true;
    }

    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
    }
  }

  releaseCircle(x, y, angle) {
    this.clicked = true;
    this.game.circles.push(
      new Circle(
        this.game,
        this.ctx,
        this.canvasWidth,
        this.canvasHeight,
        x,
        y,
        angle
      )
    );
  }

  moveCircle(key, tankTurretX, tankTurretY, tankTurretAngle) {
    if (key === "ArrowRight" && !this.clicked) {
      if (this.x < this.canvasWidth - this.width / 2) this.x += 5;
    } else if (key === "ArrowLeft" && !this.clicked) {
      if (this.x > 0 + this.width / 2) this.x -= 5;
    } else if ((key === "ArrowUp" || key === "ArrowDown") && !this.clicked) {
      this.x = tankTurretX;
      this.y = tankTurretY;
      this.angle = tankTurretAngle;
    }
  }
}
