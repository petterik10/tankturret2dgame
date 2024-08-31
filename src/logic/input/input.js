export class InputHandler {
  constructor(game, player, circles, tank) {
    this.game = game;
    this.lastKey = "";
    this.keys = [];
    this.player = player;
    this.circles = circles;
    this.tank = tank;
    this.keyPress = false;

    window.addEventListener("keydown", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === " " || // Space key
        e.key === "ArrowRight"
      ) {
        if (this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key);
        }

        this.keyPress = true;
        this.lastKey = e.key;
        this.player.update(this.lastKey);

        const tankCanMove = this.tank.canMove(e.key);
        if (tankCanMove) {
          this.tank.move(e.key);
        }

        const { x: tankX, y: tankY, angle: tankAngle } = this.tank.getTurretPosition();

        this.circles.forEach((circle, index) => {
          if (e.key === " " && index === this.circles.length - 1) {
            circle.releaseCircle(tankX, tankY, tankAngle);
          } else if (
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowDown"
          ) {
            circle.moveCircle(e.key, tankX, tankY, tankAngle, tankCanMove);
            circle.updateOffset(tankX);
          }
        });

        if (e.key === " " && this.game.gameOver) {
          this.game.restart();
          this.game.start();
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keyPress = false;
      this.lastKey = "";
      const index = this.keys.indexOf(e.key);
      if (index !== -1) {
        this.keys.splice(index, 1);
      }
    });
  }
}
