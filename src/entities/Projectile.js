import { Entity } from "./Entity";

export class Projectile extends Entity {
  constructor(game, x, y, angle) {
    super(game, x, y, 50, 50);
    this.angle = angle;
    this.speed = 3.3;
    this.radius = 20;
    this.clicked = false;
    this.frames = [];
    this.frameIndex = 0;
    this.frameCount = 0;
    this.loadFrames();
  }

  loadFrames() {
    for (let i = 1; i <= 2; i++) {
      const img = new Image();
      img.src = `./pictures/tank_bulletFly${i}.png`;
      this.frames.push(img);
    }
  }

  update() {
    if (this.clicked) {
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
    }

    if (
      this.clicked &&
      (this.y < 0 || this.x < 0 || this.x > this.game.width)
    ) {
      this.markedForDeletion = true;
    }

    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
    }
  }

  render(ctx) {
    const currentFrame = this.frames[this.frameIndex];

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      currentFrame,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  release() {
    this.clicked = true;
  }

  move(tankX, tankY, tankAngle) {
    if (!this.clicked) {
      this.x = tankX;
      this.y = tankY;
      this.angle = tankAngle;
    }
  }
}
