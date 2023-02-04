export class InputHandler {
  constructor(game) {
    this.game = game;
    this.lastKey = "";
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "Enter" ||
        (e.key === "ArrowRight" && this.keys.indexOf(e.key) === -1)
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "Enter" ||
        e.key === "ArrowRight"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }

    });
  }
}
