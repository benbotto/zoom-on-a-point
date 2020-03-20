class WorldRenderer extends Renderer {
  /**
   * Initialize with the World (the entire scene).
   */
  constructor(world) {
    super(world);

    this.renderers = [];
  }

  /**
   * Add a Renderer for an object in the world, and put the Renderer's
   * WorldObject in the world.
   */
  addRenderer(renderer) {
    this.renderers.push(renderer);
    this.getWorldObject().addWorldObject(renderer.getWorldObject());
  }

  /**
   * Render the World by applying the World's transformation matrix
   * (zoom/pan/etc.), then rendering each object in the world.
   * @param ctx A CanvasRenderingContext2D from a canvas.
   */
  render(ctx) {
    const world = this.getWorldObject();

    // Clear the canvas.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Clear any leftover transforms from the last render.
    ctx.resetTransform();

    // Apply the world transformation.
    ctx.transform(...world.transform);

    // Render each object in the world using the transformed context.
    this.renderers.forEach(renderer => renderer.render(ctx));
  }
}
