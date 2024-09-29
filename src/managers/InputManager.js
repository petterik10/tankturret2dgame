import { Projectile } from "../entities/Projectile";
import { Tank } from "../entities/Tank";

export class InputManager {
  constructor(game) {
    this.game = game;
    this.keyState = {};
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
    this.canFire = true;
  }

  init() {
    window.removeEventListener("keydown", this.boundHandleKeyDown);
    window.removeEventListener("keyup", this.boundHandleKeyUp);
    
    window.addEventListener("keydown", this.boundHandleKeyDown);
    window.addEventListener("keyup", this.boundHandleKeyUp);
  }

  handleKeyDown(e) {
    this.keyState[e.key] = true;
    this.processInput(e.key);
  }

  handleKeyUp(e) {
    this.keyState[e.key] = false;
    if (e.key === " ") {
      this.canFire = true;
    }
  }

  processInput(key) {
    if (key === " ") {
      if (this.game.gameState.isGameOver()) {
        this.game.restart();
      } else if (this.canFire) {
        this.fireBullet();
        this.canFire = false;
      }
    }
  }

  fireBullet() {
    const tank = this.game.entityManager.getEntitiesByType(Tank)[0];
    const projectiles = this.game.entityManager.getEntitiesByType(Projectile);
    const { x, y, angle } = tank.getTurretPosition();
    
    if (projectiles.length > 0) {
      projectiles[projectiles.length - 1].release();
    }
    
    this.game.entityManager.addEntity(new Projectile(this.game, x, y, angle));
  }

  update() {
    const tank = this.game.entityManager.getEntitiesByType(Tank)[0];
    const projectiles = this.game.entityManager.getEntitiesByType(Projectile);

    if (this.keyState['ArrowLeft']) tank.moveLeft();
    if (this.keyState['ArrowRight']) tank.moveRight();
    if (this.keyState['ArrowUp']) tank.rotateTurretUp();
    if (this.keyState['ArrowDown']) tank.rotateTurretDown();

    const { x, y, angle } = tank.getTurretPosition();
    projectiles.forEach((projectile) => {
      if (!projectile.clicked) {
        projectile.move(x, y, angle);
      }
    });
  }

  reset() {
    this.keyState = {};
    this.canFire = true;
  }
}