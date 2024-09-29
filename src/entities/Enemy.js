import { Entity } from "./Entity";
import { FloatingText } from "./FloatingText";
import { Fire } from "./Particle";

export class Enemy extends Entity {
  constructor(game, type) {
    super(game, game.width, 0, 91.2, 82);
    this.frames = [];
    this.frameCount = 10;
    this.frameWidth = 456;
    this.frameHeight = 410;
    this.scale = 0.2;
    this.speed = Math.random() * 3 + 1;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.frame = 0;
    this.gameframe = 0;
    this.angle = 0;
    this.amplitude = this.randomAmplitude();
    this.frequency = Math.random() * 0.09 + 0.01;
    this.y = this.initialYPosition();
    this.type = type;
    this.setupType();
    this.loadFrames();
    this.hitTime = 0;
    this.hitDuration = 200;
    this.collisionCount = 0;
  }

  loadFrames() {
    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image();
      img.src = `./pictures/skeleton-fly${i}.png`;
      this.frames.push(img);
    }
  }

  randomAmplitude() {
    return Math.random() < 0.2 ? 0 : Math.random() * 80 + 20;
  }

  setupType() {
    switch (this.type) {
      case "weak":
        this.speed = Math.random() * 4 + 2;
        this.health = 1;
        this.color = "blue";
        break;
      case "medium":
        this.speed = Math.random() * 3 + 1;
        this.health = 2;
        this.color = "green";
        break;
      case "strong":
        this.speed = Math.random() * 2 + 0.5;
        this.health = 3;
        this.color = "red";
        break;
    }
  }

  initialYPosition() {
    return this.amplitude === 0
      ? Math.random() * (this.game.height - this.height)
      : Math.random() * (this.game.height / 5);
  }

  update(deltaTime) {
    this.x -= this.speed * deltaTime * 0.1;
    this.angle += this.frequency;
    if (this.amplitude > 0) {
      this.y = this.game.height / 4 + this.amplitude * Math.sin(this.angle);
    }

    this.gameframe += deltaTime;
    if (this.gameframe >= this.flapSpeed * 10) {
      this.frame = (this.frame + 1) % this.frameCount;
      this.gameframe = 0;
    }

    if (this.x < 0 - this.width) {
      this.markedForDeletion = true;
      this.game.gameState.incrementOffscreenEnemies();
    }
  }

  render(ctx) {
    if (this.frames[this.frame]) {
      ctx.save();

      ctx.filter = `hue-rotate(${this.getHueRotation()}deg)`;

      if (Date.now() - this.hitTime < this.hitDuration) {
        ctx.globalCompositeOperation = "lighter";
        ctx.filter += " brightness(150%)";
      }

      ctx.drawImage(
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
      ctx.restore();
    }
  }

  getHueRotation() {
    switch (this.color) {
      case "blue":
        return 180;
      case "green":
        return 90;
      case "red":
        return 0;
      default:
        return 0;
    }
  }

  onCollision() {
    this.collisionCount++;
    this.health--;
    this.hitTime = Date.now();
    if (this.health <= 0 && !this.markedForDeletion) {
      this.markedForDeletion = true;
      this.game.scoreManager.incrementScore();
      this.game.entityManager.addEntity(new Fire(this.game, this.x, this.y));

      const newEnemyCount = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < newEnemyCount; i++) {
        const enemyType = this.getRandomEnemyType();
        this.game.entityManager.addEntity(new Enemy(this.game, enemyType));
      }
    } else if (this.health > 0) {
      this.game.entityManager.addEntity(
        new FloatingText(
          this.game,
          this.x + this.width / 2,
          this.y,
          `Hit! ${this.health} HP left`
        )
      );
    }
  }

  getRandomEnemyType() {
    const randomType = Math.random();
    if (randomType > 0.7) return "weak";
    if (randomType > 0.4) return "medium";
    return "strong";
  }
}
