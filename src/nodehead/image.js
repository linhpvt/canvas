window.addEventListener('load', () => {
  ((global) => {
    console.log('window loaded');

    // reference to canvas element
    const canvas = document.getElementById('canvas');

    // set canvas's width and height = actual canvas's size
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    // reference to drawing API
    const ctx = canvas.getContext('2d');

    // start drawing
    ctx.beginPath();
    ctx.moveTo(10, 10);

    ctx.lineTo(10, 50);
    ctx.lineTo(60, 10);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    const img = document.getElementById('turtle');
    if (img) {
      // new drawing
      ctx.beginPath();
      ctx.drawImage(img, 10, 100, 50, 50);
    }

    /**
     *
     * @param {object} ctx where we are going to draw the rotated image
     * @param {*} image the image we want to draw
     * @param {*} x the x axis of the image
     * @param {*} y the y axiz of the image
     * @param {*} width the width of the image
     * @param {*} height the heigth of the image
     * @param {*} rotation the rotated angle in radian
     */
    function drawRotatedImage(ctx, image, x, y, width, height, rotation) {
      // haft
      const haftWidth = width / 2;
      const haftHeigth = height / 2;
      // save the current canvas surface
      ctx.save();
      // translate to the main point the image will rotate arround.
      ctx.translate(x + haftWidth, y + haftHeigth);
      ctx.rotate(rotation);
      ctx.drawImage(image, -haftWidth, -haftHeigth, width, height);
      // be back to the state of save() function
      ctx.restore();

      // the save/restore will go in pair together
      // they ensure there is no effect to other after we draw a rotated image.
    }

    // be sure the image is available then call ctx.drawImage function, this way won't cause the intermittent issue
    function draw(ctx, image) {
      if (!image.complete) {
        setTimeout(() => {
          draw(ctx, image);
        }, 50);
        return;
      }
      ctx.drawImage(image, 120, 100, 50, 50);
    }

    const image = new Image();
    // since this line get executed, it will take a while to get image available to use.
    image.src = '../../public/images/turtle.png';
    // this line might cause the issue
    // ctx.drawImage(image, 120, 100, 50, 50);

    // once image available, drawing will takes place.
    draw(ctx, image);

    drawRotatedImage(ctx, image, 200, 100, 50, 50, 0);
    drawRotatedImage(ctx, image, 200, 200, 50, 50, Math.PI / 2);
    drawRotatedImage(ctx, image, 100, 200, 50, 50, -Math.PI);
    drawRotatedImage(ctx, image, 100, 100, 50, 50, Math.PI * 2);

    const imageLoaded = new Image();
    // callback, when the image is loaded
    imageLoaded.onload = function () {
      ctx.drawImage(imageLoaded, 400, 200, 50, 50);
    };
    imageLoaded.src = '../../public/images/turtle.png';

    // Memory image, to fill shapes
    const memImg = new Image();
    memImg.onload = () => {
      // Create a pattern object
      const pattern = ctx.createPattern(memImg, 'repeat');

      // set fillStyle
      ctx.fillStyle = pattern;

      // draw rectangle
      ctx.fillRect(150, 150, 200, 170);
    };
    memImg.src = '../../public/images/turtle.png';

    // crop 1/4 top-left of the original image
    // and draw it at 20, 20, 150, 150
    const orgImg = new Image();
    // only apply for single image, not over page
    orgImg.onload = () => {
      ctx.drawImage(
        orgImg,
        // crop
        0,
        0,
        orgImg.naturalWidth / 2,
        orgImg.naturalHeight / 2,
        // where to draw
        20,
        20,
        150,
        150,
      );
    };
    orgImg.src = '../../public/images/turtle.png';
  })(window);
});
