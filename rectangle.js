class Rectangle {
  /**
   * Initialize the rectangle as a 1x1 at the origin.
   * @param gl A reference to glMatrix for matrix and vector operations.
   */
  constructor(gl) {
    this.gl = gl;

    this.color = '#000000';

    this.translation = this.gl.mat2d.create();
    this.scale = this.gl.mat2d.create();
    this.transform = this.gl.mat2d.create();

    // By default the rectangle is 1x1 positioned with its center at the
    // origin.
    this
      .setSize(1, 1)
      .setLocation(-0.5, -0.5);
  }

  /**
   * Scale the rectangle such that its dimensions are width x height.
   */
  setSize(width, height) {
    this.gl.mat2d.fromScaling(this.scale, this.gl.vec2.fromValues(width, height));

    this._updateTransform();

    return this;
  }

  /**
   * Translate the rectangle such that its top-left corner is at x,y.
   */
  setLocation(x, y) {
    this.gl.mat2d.fromTranslation(this.translation, this.gl.vec2.fromValues(x, y));

    this._updateTransform();

    return this;
  }

  /**
   * Apply the translation and scale matrices in order.
   */
  _updateTransform() {
    // Order is important.  Scale first, then translate.
    this.gl.mat2d.multiply(this.transform, this.translation, this.scale);
  }
}
