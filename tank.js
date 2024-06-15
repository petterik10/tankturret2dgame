export class Tank {
  constructor(
    trackImage,
    bodyImage,
    turretImage,
    ctx,
    canvasWidth,
    canvasHeight,
    game
  ) {
    this.trackImage = trackImage;
    this.bodyImage = bodyImage;
    this.turretImage = turretImage;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 80;
    this.height = 80;
    this.trackWidth = this.width;
    this.trackHeight = this.height / 2;
    this.x = 0;
    this.y = this.canvasHeight - this.height * 2;
    this.turretAngle = (-40 * Math.PI) / 180;
    this.turretLength = 40; 
    this.game = game;
    this.initialTurretAngle = (-40 * Math.PI) / 180; 
    this.direction = "right"; 
  }

  draw() {
    this.ctx.save();

    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    this.ctx.translate(-this.width / 2, -this.height / 2);

    // Draw the tank track
    this.ctx.drawImage(
      this.trackImage,
      0,
      this.trackHeight - 20,
      this.trackWidth,
      this.trackHeight
    );

    const bodyY = -40; 
    this.ctx.drawImage(this.bodyImage, 0, bodyY, this.width, this.height);

    const turretBaseX = this.width / 2; 
    const turretBaseY = bodyY + this.height / 2; 

    this.ctx.save();

    this.ctx.translate(turretBaseX, turretBaseY);

    this.ctx.rotate(this.turretAngle);

    this.ctx.drawImage(
      this.turretImage,
      0,
      -this.turretImage.height / 2,
      this.turretImage.width,
      this.turretImage.height
    );

    this.ctx.restore();

    this.ctx.restore();
  }

  resetPosition() {
    this.x = 0;
    this.y = this.canvasHeight - this.height * 2;
    this.turretAngle = this.initialTurretAngle;
    this.direction = "right"; 
  }

  getInitialTurretAngle() {
    return this.initialTurretAngle;
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

  getInitialPosition() {
    const bodyY = this.y - 40; 
    const turretBaseX = this.x + this.width / 2; 
    const turretBaseY = bodyY + this.height / 2; 
    const turretEndX =
      turretBaseX + this.turretLength * Math.cos(this.initialTurretAngle); 
    const turretEndY =
      turretBaseY + this.turretLength * Math.sin(this.initialTurretAngle); 

    return { x: turretEndX, y: turretEndY, angle: this.initialTurretAngle }; 
  }


  movePlayer(input) {
    if (input === "ArrowRight") {
      if (this.x < this.canvasWidth - this.width) {
        this.x += 5;
      }
    } else if (input === "ArrowLeft") {
      if (this.x > 0) {
        this.x -= 5;
      }
    }
  }

  moveTurret(input) {
    const turretRotationStep = (10 * Math.PI) / 180; 
    if (input === "ArrowUp") {
      this.turretAngle -= turretRotationStep; 
    } else if (input === "ArrowDown") {
      this.turretAngle += turretRotationStep; 
    }
  }

  update(inputKeys) {
    this.movePlayer(inputKeys);
    this.moveTurret(inputKeys);
  }
}
