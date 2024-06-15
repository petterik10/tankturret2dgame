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
        e.key === "Enter" ||
        (e.key === "ArrowRight" && this.keys.indexOf(e.key) === -1)
      ) {
        this.keyPress = true;
        this.lastKey = e.key;
        this.player.update(this.lastKey);
        this.circles.forEach((circle, index) => {
          if (e.key === "Enter" && index === this.circles.length - 1) {
            const { x, y, angle } = this.tank.getTurretPosition();
            circle.releaseCircle(x, y, angle);
          }
          if (
            e.key === "ArrowLeft" ||
            (e.key === "ArrowRight" && index === this.circles.length - 1)
          ) {
            circle.moveCircle(e.key);
          }
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            const { x, y, angle } = this.tank.getTurretPosition();
            circle.moveCircle(e.key, x, y, angle);
          }
        });
        if (e.key === "Enter" && this.game.gameOver) {
          this.game.restart();
          this.game.start();
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keyPress = false;
      this.lastKey = "";
    });
  }
}
