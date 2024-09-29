import { Enemy } from "../entities/Enemy";
import { Projectile } from "../entities/Projectile";

export class CollisionManager {
  checkCollisions(entities) {
    const projectiles = entities.filter(
      (entity) => entity instanceof Projectile
    );
    const enemies = entities.filter((entity) => entity instanceof Enemy);

    projectiles.forEach((projectile) => {
      enemies.forEach((enemy) => {
        if (this.checkCollision(projectile, enemy)) {
          projectile.markedForDeletion = true;
          enemy.onCollision();
        }
      });
    });
  }

  checkCollision(circle, rect) {
    const distX = Math.abs(circle.x - rect.x - rect.width / 2);
    const distY = Math.abs(circle.y - rect.y - rect.height / 2);

    if (distX > rect.width / 2 + circle.radius) return false;
    if (distY > rect.height / 2 + circle.radius) return false;

    if (distX <= rect.width / 2) return true;
    if (distY <= rect.height / 2) return true;

    const dx = distX - rect.width / 2;
    const dy = distY - rect.height / 2;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }
}
