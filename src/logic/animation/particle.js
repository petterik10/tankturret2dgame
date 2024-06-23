class Particle {
  constructor(game) {
    this.markedForDeletion = false;
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

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "white";
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

export class Splash extends Particle {}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
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
    this.speedY = 0.2 * 2 ;
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

  draw(context) {
    const currentImage = this.images[this.currentImageIndex];
    if (currentImage) {
      context.drawImage(currentImage, this.x, this.y, this.size, this.size);
    }
  }
}
