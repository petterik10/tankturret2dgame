import { Game } from "./game/Game.js";
import "./styling/style.css";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 900;
  canvas.height = 500;

  const instructions = document.getElementById("instructions");
  instructions.style.display = "block";

  const main = document.getElementById("main");
  main.style.display = "flex";

  const game = new Game(canvas, ctx);
  game.init();
  game.start();
});
