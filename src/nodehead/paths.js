window.addEventListener('load', () => {
  (function (global) {
    console.log('IFFEE');
    const canvas = document.getElementById('canvas');
    // width and height of canvas equal to actual size.
    canvas.width = canvas.scrollWidth;
    // set the height of canvas = to the height set as css
    canvas.height = canvas.scrollHeight;
    // reference to drawing API
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Your browser does not support drawing');
      return;
    }

    // draw a purple rectangle
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'purple';

    ctx.moveTo(70, 10);
    ctx.lineTo(170, 10);
    ctx.lineTo(170, 60);
    ctx.lineTo(70, 60);
    ctx.lineTo(70, 10 - 1);
    ctx.stroke();

    // draw a  filed triangle
    ctx.beginPath();
    ctx.moveTo(180, 10);
    ctx.lineTo(230, 50);
    ctx.lineTo(180, 50);
    ctx.closePath();
    ctx.fillStyle = '#87AAAA';
    ctx.fill();

    // draw separate lines
    ctx.beginPath();
    ctx.moveTo(600, 300);
    ctx.lineTo(500, 400);

    ctx.moveTo(300, 100);
    ctx.lineTo(50, 50);
    ctx.stroke();
  })(window);
});
