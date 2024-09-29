import { Entity } from "./Entity";

class Particle extends Entity {
  constructor(game, x, y) {
    super(game, x, y, 0, 0);
    this.lifespan = 15;
  }

  update() {
    this.y -= this.speedY;
    this.lifespan--;
    if (this.lifespan <= 0) {
      this.markedForDeletion = true;
    }
  }
}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game, x, y);
    this.images = [];
    for (let i = 1; i <= 27; i++) {
      const img = document.getElementById(`fire${i}`);
      if (img) {
        this.images.push(img);
      }
    }
    this.currentImageIndex = 0;
    this.size = 0.5 * 100 + 100;
    this.x = x;
    this.y = y + -40;
    this.speedX = 0;
    this.speedY = 0.2 * 2;
    this.frameInterval = 2;
    this.frameCount = 0;
  }

  update(deltaTime) {
    super.update();
    this.frameCount++;
    if (this.frameCount >= this.frameInterval) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
      this.frameCount = 0;
    }
  }

  render(ctx) {
    const currentImage = this.images[this.currentImageIndex];
    if (currentImage) {
      ctx.drawImage(currentImage, this.x, this.y, this.size, this.size);
    }
  }
}
