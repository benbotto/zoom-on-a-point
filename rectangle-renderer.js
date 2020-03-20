class RectangleRenderer extends Renderer {
  constructor(rectangle) {
    super(rectangle);
  }

  /**
   * Render the rectangle.  The transformation on the rendering context is
   * preserved.
   * @param ctx A CanvasRenderingContext2D context from a canvas.
   */
  render(ctx) {
    const rect = this.getWorldObject();

    // Save the context so that the parent (world) transform can be restored.
    ctx.save();

    // Apply the rectangles transform to size and position it.
    ctx.transform(...rect.transform);

    // Render the rectangle as a 1x1 square centered at 0,0.
    ctx.fillStyle = rect.color;
    ctx.fillRect(-0.5, -0.5, 1, 1);

    // Restore the context.
    ctx.restore();
  }
}
