import { Enemy } from "../entities/Enemy";
import { FloatingText } from "../entities/FloatingText";
import { Projectile } from "../entities/Projectile";
import { Tank } from "../entities/Tank";
import { BackgroundManager } from "../managers/BackgroundManager";
import { CollisionManager } from "../managers/CollisionManager";
import { EntityManager } from "../managers/EntityManager";
import { InputManager } from "../managers/InputManager";
import { ScoreManager } from "../managers/ScoreManager";
import { Renderer } from "../rendering/Rendering";
import { GameState } from "./GameState";

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.gameState = new GameState();
    this.renderer = new Renderer(ctx);
    this.entityManager = new EntityManager();
    this.inputManager = new InputManager(this);
    this.collisionManager = new CollisionManager();
    this.scoreManager = new ScoreManager();
    this.backgroundManager = new BackgroundManager(ctx);
  }

  init() {
    this.backgroundManager.init();
    this.tank = new Tank(this, 0, this.height - 160);
    this.entityManager.addEntity(this.tank);

    for (let i = 0; i < 2; i++) {
      this.createEnemy();
    }

    this.inputManager.init();
  }

  initAgain() {
    this.backgroundManager.init();
    this.tank = new Tank(this, 0, this.height - 160);
    this.entityManager.addEntity(this.tank);

    for (let i = 0; i < 2; i++) {
      this.createEnemy();
    }

    this.inputManager.init();
  }

  createEnemy() {
    const enemyType = this.getRandomEnemyType();
    this.entityManager.addEntity(new Enemy(this, enemyType));
  }

  getRandomEnemyType() {
    const randomType = Math.random();
    if (randomType > 0.7) return "weak";
    if (randomType > 0.4) return "medium";
    return "strong";
  }

  update(deltaTime) {
    if (this.gameState.isGameOver()) {
      return;
    }
    this.inputManager.update();
    this.backgroundManager.update(deltaTime);
    this.entityManager.update(deltaTime);
    this.collisionManager.checkCollisions(this.entityManager.entities);

    if (this.entityManager.getEntitiesByType(Enemy).length === 0) {
      const enemyType = this.getRandomEnemyType();
      this.entityManager.addEntity(new Enemy(this, enemyType));
    }

    if (this.entityManager.getEntitiesByType(Projectile).length === 0) {
      const { x, y, angle } = this.tank.getTurretPosition();
      this.entityManager.addEntity(new Projectile(this, x, y, angle));
    }
    this.entityManager.entities
      .filter((entity) => entity instanceof FloatingText)
      .forEach((text) => {
        text.update();
        if (text.lifespan <= 0) {
          text.markedForDeletion = true;
        }
      });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.backgroundManager.render();
    this.entityManager.render(this.ctx);
    if (this.gameState.isGameOver()) {
      this.renderer.renderGameOver(this.gameState);
    }
    this.renderer.renderUI(this.gameState, this.scoreManager);
    this.entityManager.entities
      .filter((entity) => entity instanceof FloatingText)
      .forEach((text) => text.render(this.ctx));
  }

  start() {
    let lastTime = 0;
    const gameLoop = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      if (this.gameState.isGameOver()) {
        this.renderer.renderGameOver(this.gameState);
      } else {
        this.update(deltaTime);
        this.render();
      }

      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }

  restart() {
    this.gameState.reset();
    this.scoreManager.reset();
    this.entityManager.clear();
    this.inputManager.reset();
    this.init();
    this.tank.resetPosition();
    this.entityManager.addEntity(this.tank);
  }
}
