import "./styling/style.css";
import { Image } from "./logic/animation/background.js";
import { InputHandler } from "./logic/input/input.js";
import { Circle } from "./logic/animation/circle.js";
import { Enemy } from "./logic/enemy/enemy.js";
import { Tank } from "./logic/tank/tank.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 900;
  canvas.height = 500;

  function distance(circle, rect) {
    const dx =
      circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const dy =
      circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    return Math.sqrt(dx * dx + dy * dy);
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.backgrounds = [
        new Image(ctx, 0.4, document.getElementById("layer2")),
        new Image(ctx, 0.8, document.getElementById("layer4")),
      ];
      this.speed = 0;
      this.maxSpeed = 3;
      this.tankPlayer = new Tank(
        document.getElementById("tanktrack"),
        document.getElementById("tankbody"),
        document.getElementById("tankturret"),
        ctx,
        canvas.width,
        canvas.height,
        this
      );
      const { x, y, angle } = this.tankPlayer.getTurretPosition();
      this.particles = [];
      this.enemies = [
        new Enemy(this, canvas.width, canvas.height, ctx),
        new Enemy(this, canvas.width, canvas.height, ctx),
      ];
      this.circles = [
        new Circle(
          this,
          ctx,
          canvas.width,
          canvas.height,
          70,
          canvas.height - 20 - 100 * 2 + 35,
          angle
        ),
      ];
      this.input = new InputHandler(
        this,
        this.tankPlayer,
        this.circles,
        this.tankPlayer
      );

      this.createNewEnemy = false;
      this.offscreenEnemiesCount = 0;
      this.maxOffscreenEnemies = 30;
      this.gameOver = false;
    }

    update(deltaTime) {
      this.enemies = this.enemies.filter((enemy) => {
        if (enemy.isOffscreen()) {
          this.offscreenEnemiesCount++;
          if (this.offscreenEnemiesCount >= this.maxOffscreenEnemies) {
            this.gameOver = true;
          }
        }
        return enemy.markedForDeletion !== true;
      });

      this.backgrounds.forEach((background) => {
        background.update(deltaTime);
        background.draw();
      });
      this.tankPlayer.update();
      this.tankPlayer.draw();
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        enemy.draw();
      });

      this.particles.forEach((particle, index) => {
        particle.update(deltaTime);
        particle.draw(ctx);
        if (particle.markedForDeletion) {
          this.particles.splice(index, 1);
        }
      });
      if (this.circles.length === 0) {
        const { x, y, angle } = this.tankPlayer.getTurretPosition();
        this.circles.push(
          new Circle(this, ctx, canvas.width, canvas.height, x, y, angle)
        );
      }
      this.circles.forEach((circle, i) => {
        circle.update();
        circle.draw();
        if (circle.markedForDeletion) {
          this.circles.splice(i, 1);
        }
        this.enemies.forEach((enemy) => {
          let dist = distance(circle, enemy);
          if (dist <= circle.radius) {
            enemy.collisionDetected = true;
            circle.markedForDeletion = true;
          }
        });
      });
    }

    showGameOverMessage() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.font = "30px Monospace";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);
      ctx.font = "20px Monospace";
      ctx.fillText(
        "Too many enemies have passed the defence line",
        canvas.width / 2 - 20,
        canvas.height / 2 - 10
      );
      ctx.fillText(
        "Press Space to restart",
        canvas.width / 2,
        canvas.height / 2 + 20
      );
    }

    restart() {
      this.gameOver = false;
      this.offscreenEnemiesCount = 0;
      this.enemies = [
        new Enemy(this, canvas.width, canvas.height, ctx),
        new Enemy(this, canvas.width, canvas.height, ctx),
      ]; // Reset enemies
      this.createNewEnemy = false;
      this.maxOffscreenEnemies = 30;

      const { angle } = this.tankPlayer.getInitialPosition();
      this.circles.splice(0, this.circles.length);
      this.circles.push(
        new Circle(
          this,
          ctx,
          canvas.width,
          canvas.height,
          70,
          canvas.height - 20 - 100 * 2 + 35,
          angle
        )
      );
      this.tankPlayer.resetPosition();
    }

    start() {
      const animate = (timeStamp) => {
        if (this.gameOver) {
          this.showGameOverMessage();
          return;
        }
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.update(deltaTime);
        requestAnimationFrame(animate);
      };
      let lastTime = 0;
      animate(0);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  game.start();
});
