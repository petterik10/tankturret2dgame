import { Enemy } from "./Enemy.js";

export class FastEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.speed = Math.random() * 5 + 3;
    this.health = 1;
    this.color = "red"; 
  }
}

export class TankEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.speed = Math.random() * 2 + 0.5; 
    this.health = 3; 
    this.color = "blue";
  }

  onCollision() {
    this.health--;
    if (this.health <= 0) {
      super.onCollision();
    }
  }
}
