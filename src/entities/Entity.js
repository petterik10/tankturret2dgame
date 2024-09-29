export class Entity {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.markedForDeletion = false;
  }

  update(deltaTime) {}

  render(ctx) {}
}
