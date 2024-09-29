export class EntityManager {
  constructor() {
    this.entities = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }

  update(deltaTime) {
    this.entities.forEach((entity) => entity.update(deltaTime));
    this.entities = this.entities.filter((entity) => !entity.markedForDeletion);
  }

  render(ctx) {
    this.entities.forEach((entity) => entity.render(ctx));
  }

  getEntitiesByType(type) {
    return this.entities.filter((entity) => entity instanceof type);
  }

  clear() {
    this.entities = [];
  }
}
