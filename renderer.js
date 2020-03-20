/**
 * Base class for Renderers.  All Renderers store a to-be-rendered WorldObject.
 */
class Renderer {
  constructor(worldObject) {
    this.worldObject = worldObject;
  }

  getWorldObject() {
    return this.worldObject;
  }
}
