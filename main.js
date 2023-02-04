import "./style.css";
import { Image } from "./background.js";
import { Cannon } from "./pictures/cannon";
import { InputHandler } from "./input.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 900;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.backgrounds = [
        new Image(ctx, 0.2, document.getElementById("layer1")),
        new Image(ctx, 0.4, document.getElementById("layer2")),
        new Image(ctx, 0.6, document.getElementById("layer3")),
        new Image(ctx, 0.8, document.getElementById("layer4")),
        new Image(ctx, 1, document.getElementById("layer5")),
      ];

      this.player = new Cannon(
        document.getElementById("cannon"),
        ctx,
        canvas.width,
        canvas.height
      );

      this.input = new InputHandler(this);
    }

    update(deltaTime) {
      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });
      this.player.draw();
      this.player.update(this.input.keys);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp) {
    /* const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp; */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    /* layer.update();
    layer.draw(); */

    /* game.draw(ctx);
    game.update(deltaTime); */
    requestAnimationFrame(animate);
  }

  animate(0);
});
