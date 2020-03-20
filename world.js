class World {
  constructor(gl) {
    this.gl = gl;

    this.worldObjects = [];
    this.transform = glMatrix.mat2d.create();
  }

  addWorldObject(worldObject) {
    this.worldObjects.push(worldObject);
  }

  getWorldObject(i) {
    if (i < 0 || i >= this.worldObjects.length)
      throw new Error(`World object index "${i}" out of bounds.`);

    return this.worldObjects[i];
  }

  // Zoom the world by amount about position.
  // @param amount The amount to zoom (e.g. 1.1 to zoom in by 110%).
  // @param point The position to zoom about as a vec2.
  zoom(amount, point) {
    // Translation matrix that moves the world such that the mouse point is at
    // the top of the canvas (where 0,0 would normally be).
    const toPoint = this.gl.mat2d.fromTranslation(this.gl.mat2d.create(),
      this.gl.vec2.fromValues(-point[0], -point[1]));

    // Scale (zoom) matrix.
    const scale = this.gl.mat2d.fromScaling(this.gl.mat2d.create(),
      this.gl.vec2.fromValues(amount, amount));

    // Translation matrix which translates the world back to where it started.
    const fromPoint = this.gl.mat2d.fromTranslation(this.gl.mat2d.create(),
      point);

    // The new world transformation matrix is:
    // fromPoint * scale * toPoint * worldTrans.
    // Matrix multiplication is _not_ commutative and operates right to left.
    this.gl.mat2d.multiply(this.transform, toPoint, this.transform);
    this.gl.mat2d.multiply(this.transform, scale, this.transform);
    this.gl.mat2d.multiply(this.transform, fromPoint, this.transform);
  }
}
