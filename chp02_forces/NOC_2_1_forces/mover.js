/*global PVector*/
(function (exports) {
  var Mover = function (paper) {
    this.width = paper.width;
    this.height = paper.height;

    this.location = new PVector(30, 30);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0,0);
    this.mass = 1;

    this.body = paper.ellipse(this.location.x, this.location.y, 24, 24);

    this.body.attr({
      fill: '#888',
      stroke: '#222'
    });
  };

  Mover.prototype.applyForce = function (force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
    return this;
  };

  Mover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    return this;
  };

  Mover.prototype.move = function () {
    this.body.animate({
      cx: this.location.x,
      cy: this.location.y
    });
    return this;
  };

  Mover.prototype.checkEdges = function () {
    if (this.location.x > this.width) {
      this.location.x = this.width;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.velocity.x *= -1;
      this.location.x = 0;
    }

    if (this.location.y > this.height) {
      this.velocity.y *= -1;
      this.location.y = this.height;
    }
    return this;
  };

  exports.Mover = Mover;

})(this);
