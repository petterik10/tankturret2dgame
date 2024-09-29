import { Entity } from "./Entity";

export class Tank extends Entity {
  constructor(game, x, y) {
    super(game, x, y, 80, 80);
    this.trackImage = document.getElementById("tanktrack");
    this.bodyImage = document.getElementById("tankbody");
    this.turretImage = document.getElementById("tankturret");
    this.turretAngle = (-40 * Math.PI) / 180;
    this.turretLength = 40;
    this.initialTurretAngle = (-40 * Math.PI) / 180;
    this.speed = 5;
    this.rotationSpeed = (10 * Math.PI) / 180;
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  }

  moveRight() {
    if (this.x < this.game.width - this.width) {
      this.x += this.speed;
    }
  }

  rotateTurretUp() {
    this.turretAngle -= this.rotationSpeed;
  }

  rotateTurretDown() {
    this.turretAngle += this.rotationSpeed;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.translate(-this.width / 2, -this.height / 2);

    ctx.drawImage(
      this.trackImage,
      0,
      this.height / 2 - 20,
      this.width,
      this.height / 2
    );

    const bodyY = -40;
    ctx.drawImage(this.bodyImage, 0, bodyY, this.width, this.height);

    const turretBaseX = this.width / 2;
    const turretBaseY = bodyY + this.height / 2;

    ctx.save();
    ctx.translate(turretBaseX, turretBaseY);
    ctx.rotate(this.turretAngle);
    ctx.drawImage(
      this.turretImage,
      0,
      -this.turretImage.height / 2,
      this.turretImage.width,
      this.turretImage.height
    );
    ctx.restore();

    ctx.restore();
  }

  getTurretPosition() {
    const bodyY = this.y - 40;
    const turretBaseX = this.x + this.width / 2;
    const turretBaseY = bodyY + this.height / 2;
    const turretEndX =
      turretBaseX + this.turretLength * Math.cos(this.turretAngle);
    const turretEndY =
      turretBaseY + this.turretLength * Math.sin(this.turretAngle);

    return { x: turretEndX, y: turretEndY, angle: this.turretAngle };
  }

  resetPosition() {
    this.x = 0;
    this.y = this.game.height - this.height * 2;
    this.turretAngle = this.initialTurretAngle;
  }
}
