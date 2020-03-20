(function(window, document, gl) {
  'use strict';

  const easel = document.getElementById('easel');
  const ctx   = easel.getContext('2d');

  // The world/scene and a renderer for it.
  const world = new World(gl);
  const worldRenderer = new WorldRenderer(world);

  // Four rectangles will be rendered.
  for (let i = 0; i < 4; ++i)
    worldRenderer.addRenderer(new RectangleRenderer(new Rectangle(gl)));

  // Color for each rectangle.
  world.getWorldObject(0).color = '#0000FF';
  world.getWorldObject(1).color = '#00FF00';
  world.getWorldObject(2).color = '#00FFFF';
  world.getWorldObject(3).color = '#FF0000';

  // Each rectangle is 20x30, positioned at the four corners of the canvas,
  // left to right, top to bottom.
  const rectWidth  = 20;
  const rectHeight = 30;
  const rectPad    = 20;
  const rectLeft   = rectPad + rectWidth / 2;
  const rectRight  = easel.width - rectWidth / 2 - rectPad;
  const rectTop    = rectPad + rectHeight / 2;
  const rectBottom = easel.height - rectHeight / 2 - rectPad;

  world
    .getWorldObject(0)
    .setSize(rectWidth, rectHeight)
    .setLocation(rectLeft, rectTop);

  world
    .getWorldObject(1)
    .setSize(rectWidth, rectHeight)
    .setLocation(rectRight, rectTop);

  world
    .getWorldObject(2)
    .setSize(rectWidth, rectHeight)
    .setLocation(rectLeft, rectBottom);

  world
    .getWorldObject(3)
    .setSize(rectWidth, rectHeight)
    .setLocation(rectRight, rectBottom);

  // Render the world/scene.
  render(ctx, worldRenderer);

  // On mouse wheel, zoom centered about the mouse coordinates.
  easel.addEventListener('wheel', e => {
    // Amount to scale.
    const amnt = e.deltaY < 0 ? 1.1 : .9;

    // Point to scale about.
    const point = gl.vec2.fromValues(e.offsetX, e.offsetY);

    // Zoom by amount about point.
    world.zoom(amnt, point);

    // Render the new scene.
    render(ctx, worldRenderer);

    // Prevent the default wheel action of scrolling the whole page.
    e.preventDefault();
  });

  // Request an animation frame and render the world/scene.
  function render(ctx, worldRenderer) {
    window.requestAnimationFrame(() => worldRenderer.render(ctx));
  }
})(window, window.document, window.glMatrix);
