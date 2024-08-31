import { Fire } from "../animation/particle";

export class Enemy {
  constructor(game, canvasWidth, canvasHeight, ctx) {
    this.game = game;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = ctx;
    this.frames = [];
    this.frameCount = 10;
    this.frameWidth = 456;
    this.frameHeight = 410;
    this.scale = 0.2;
    this.width = this.frameWidth * this.scale;
    this.height = this.frameHeight * this.scale;
    this.x = this.canvasWidth - this.width;
    this.speed = this.randomSpeed();
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.frame = 0;
    this.gameframe = 0;
    this.markedForDeletion = false;
    this.collisionDetected = false;
    this.angle = 0;
    this.amplitude = this.randomAmplitude();
    this.frequency = this.randomFrequency();
    this.y = this.initialYPosition();

    this.loadFrames();
  }

  randomSpeed() {
    return Math.random() * 3 + 1;
  }

  randomAmplitude() {
    if (Math.random() < 0.2) {
      return 0;
    }
    return Math.random() * 80 + 20;
  }

  randomFrequency() {
    return Math.random() * 0.09 + 0.01;
  }

  initialYPosition() {
    if (this.amplitude === 0) {
      return Math.random() * (this.canvasHeight - this.height);
    }
    return Math.random() * (this.canvasHeight / 5);
  }

  loadFrames() {
    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image();
      img.src = `./pictures/skeleton-fly${i}.png`;
      this.frames.push(img);
    }
  }

  initializePosition() {
    this.x = this.canvasWidth - this.width;
    this.y = this.initialYPosition();
  }

  draw() {
    if (this.frames[this.frame]) {
      this.ctx.drawImage(
        this.frames[this.frame],
        0,
        0,
        this.frameWidth,
        this.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  update(deltaTime) {
    if (this.isOffscreen()) {
      this.remove();
      this.game.enemies.push(this.createReplacement());
      return;
    }

    if (this.collisionDetected) {
      this.markedForDeletion = true;
      this.game.particles.push(new Fire(this.game, this.x, this.y));
      this.frame = 0;
      this.remove();
      const newEnemyCount = Math.floor(Math.random() * 1) + 0.4;
      for (let i = 0; i < newEnemyCount; i++) {
        this.game.enemies.push(this.createReplacement());
      }
      this.game.updateScore();
      return;
    }

    this.move(deltaTime);
    this.animate(deltaTime);
  }

  isOffscreen() {
    return this.x < 0 - this.width;
  }

  isAboveGround() {
    return this.y < this.canvasHeight - this.height;
  }

  remove() {
    this.markedForDeletion = true;
  }

  createReplacement() {
    return new Enemy(this.game, this.canvasWidth, this.canvasHeight, this.ctx);
  }

  move(deltaTime) {
    this.x -= this.speed * deltaTime * 0.1;
    this.angle += this.frequency;
    if (this.amplitude > 0) {
      this.y = this.canvasHeight / 4 + this.amplitude * Math.sin(this.angle);
    }
  }

  animate(deltaTime) {
    this.gameframe += deltaTime;
    if (this.gameframe >= this.flapSpeed * 10) {
      this.frame >= this.frameCount - 1 ? (this.frame = 0) : this.frame++;
      this.gameframe = 0;
    }
  }
}
