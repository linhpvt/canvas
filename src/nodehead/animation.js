const ShapeType = {
  RECTANGLE: 'rect',
  CIRCLE: 'circle',
};

const canvas = document.getElementById('canvas');
// set up canvas surface to the whole width and height of canvas element.
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
const ctx = canvas.getContext('2d');

class AnimationShape {
  // starting point of shape
  #point = {
    X: 0,
    Y: 0,
  };

  // hold the properties of a shape
  #shape = {
    WIDTH: 0,
    HEIGTH: 0,
    FILLSTYPE: 'black',
  };

  // control the speed of animation
  #speed = {
    X: 0,
    Y: 0,
  };
  #ctx;
  #shapeType;
  #surfaceWidth;
  #surfaceHeigth;
  #halfWidth;
  #halfHeigth;
  #directionX = 1; // default LTR
  #directionY = 1; // default TTB(top to bottom)
  #listColors = [
    'red',
    'green',
    'blue',
    'purple',
    'pink',
    'yellow',
    'navy',
    'orange',
    'black',
  ];
  #prevPostion = {
    X: 0,
    Y: 0,
  };
  #curPostion = {
    X: 0,
    Y: 0,
  };

  constructor(
    ctx,
    canvasWidth,
    canvasHeigth,
    width,
    height,
    speedX,
    speedY,
    fillStyle,
    shapeType,
  ) {
    this.#surfaceHeigth = canvasWidth;
    this.#surfaceWidth = canvasHeigth;

    // set actual config
    this.#shape.HEIGTH = height;
    this.#shape.WIDTH = width;
    this.#shape.FILLSTYPE = fillStyle || 'black';

    // #haft
    this.#halfHeigth = height / 2;
    this.#halfWidth = width / 2;

    this.#speed.X = speedX;
    this.#speed.Y = speedY;

    // reference to drawing API
    this.#ctx = ctx;

    // shape type
    this.#shapeType = shapeType;
    if (shapeType === ShapeType.CIRCLE) {
      this.#point.X = this.#halfWidth;
      this.#point.Y = this.#halfWidth;
    }

    // register events
    this.#registerClickEvent(canvas);
  }
  #registerClickEvent(canvas) {
    canvas.addEventListener('click', (e) => {
      if (this.#curPostion.X !== e.x || this.#curPostion.Y !== e.y) {
        this.#prevPostion.X = this.#curPostion.X;
        this.#prevPostion.Y = this.#curPostion.Y;

        this.#curPostion.X = e.x;
        this.#curPostion.Y = e.y;

        this.#point.X = e.x;
        this.#point.Y = e.y;
      }
    });
  }

  #draw() {
    this.#ctx.fillStyle = this.#shape.FILLSTYPE;
    switch (this.#shapeType) {
      case ShapeType.RECTANGLE:
        this.#ctx.fillStyle = this.#randomColor();
        this.#ctx.fillRect(
          this.#point.X,
          this.#point.Y,
          this.#shape.WIDTH,
          this.#shape.HEIGTH,
        );
        break;
      case ShapeType.CIRCLE:
        this.#ctx.fillStyle = this.#shape.FILLSTYPE;
        this.#ctx.beginPath();
        this.#ctx.arc(
          this.#point.X,
          this.#point.Y,
          this.#halfWidth,
          0,
          Math.PI * 2,
        );
        this.#ctx.fill();
        break;
      default:
        console.log('Not support drawing');
    }
  }
  #randomColor() {
    const index = Math.floor(Math.random() * this.#listColors.length);
    return this.#listColors[index];
  }

  #adjustDirection() {
    // circle, right wall, LTR
    if (this.#directionX === 1) {
      if (
        this.#point.X + this.#speed.X + this.#halfWidth >
        this.#surfaceWidth
      ) {
        this.#directionX = -1;
      }
    } else {
      // circle, left wall, RTL
      if (this.#point.X - this.#speed.X - this.#halfWidth < 0) {
        this.#directionX = 1;
      }
    }

    // circle, top wall, TTB(top to bottom)
    if (this.#directionY === 1) {
      if (
        this.#point.Y + this.#speed.Y + this.#halfWidth >
        this.#surfaceHeigth
      ) {
        this.#directionY = -1;
      }
    } else {
      // circle, bottom wall, BTT(bottom to top)
      if (this.#point.Y - this.#speed.Y - this.#halfWidth < 0) {
        this.#directionY = 1;
      }
    }
  }

  start() {
    // clear
    this.#ctx.clearRect(0, 0, this.#surfaceWidth, this.#surfaceHeigth);

    // adjust direction
    this.#adjustDirection();

    // new main point
    this.#point.X += this.#directionX * this.#speed.X;
    this.#point.Y += this.#directionY * this.#speed.Y;

    this.#shape.FILLSTYPE = this.#randomColor();
    // draw new
    this.#draw();

    // schedule
    requestAnimationFrame(this.start.bind(this));
  }
}

const circle = new AnimationShape(
  ctx,
  canvas.scrollWidth,
  canvas.scrollHeight,
  20,
  20,
  2,
  2,
  'red',
  ShapeType.CIRCLE,
);
circle.start();

const rects = [
  // speed = 60: we want to move 60px per second
  { x: 10, y: 10, width: 50, height: 40, color: 'red', speedX: 60 },

  // 120: we want to move 120px per second
  { x: 10, y: 60, width: 50, height: 40, color: 'green', speedX: 120 },

  // 180: we want to move 180px per second
  { x: 10, y: 120, width: 50, height: 40, color: 'blue', speedX: 180 },
];

const TimingAnimation = function (ctx, shapes, canvasWidth, canvasHeigth) {
  this.ctx = ctx;
  this.shapes = shapes;
  this.canvasWidth = canvasWidth;
  this.canvasHeigth = canvasHeigth;
  this.lastAnimationTime = 0;
  this.update = this.update.bind(this);
};

TimingAnimation.prototype.update = function () {
  // erase canvas surface
  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigth);

  const currentAnimationTime = Date.now();

  // time between 2 frames in second.
  const animationTimeDelta =
    (currentAnimationTime - (this.lastAnimationTime || Date.now())) / 1000;
  this.lastAnimationTime = currentAnimationTime;

  // draw shapes
  this.shapes.forEach((shape) => {
    this.ctx.fillStyle = shape.color;
    this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);

    // x axis of main point for next drawing
    shape.x += shape.speedX * animationTimeDelta;
  });

  requestAnimationFrame(this.update);
};

const animator = new TimingAnimation(ctx, rects, canvas.width, canvas.height);
// animator.update();
