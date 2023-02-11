export class Circle {
  constructor(game, ctx, canvasWidth, canvasHeight, input, x, y) {
    this.game = game;
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = 100;
    this.height = 100;
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.input = input;
    this.clicked = false;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "white";
    this.ctx.stroke();
    this.ctx.fill();
  }

  update() {
    if (!this.clicked) {
      if (this.input.keys.includes("ArrowLeft") && this.x > this.width / 2) {
        this.x -= 5;
      } else if (
        this.input.keys.includes("ArrowRight") &&
        this.x < this.canvasWidth - this.width / 2
      ) {
        this.x += 5;
      } else if (this.input.lastKey === "Enter") {
        this.input.lastKey = "";
        this.clicked = true;
        this.game.circles.push(
          new Circle(
            this.game,
            this.ctx,
            this.canvasWidth,
            this.canvasHeight,
            this.input,
            this.x,
            this.canvasHeight - 20 - 100
          )
        );
      }
    } else {
      this.y -= 1;
    }
  }
}

/* class Test extends Circle {
   super()

   constructor(x,  y){
    this.x = x;
    this.y = y;
   }

   draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "white";
    this.ctx.stroke();
    this.ctx.fill();
  }

  
} */
