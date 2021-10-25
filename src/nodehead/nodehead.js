window.onload = () => {
  console.log('document loaded');
  // reference to the html element
  const canvas = document.getElementById('canvas');
  // set the drawing surface to the width and heigth of the canvas element, before starting the drawing

  /* Always set width and height to the actual sizes in which we are going to draw */
  // set the width of canvas = to the width set as css
  canvas.width = canvas.scrollWidth;
  // set the height of canvas = to the height set as css
  canvas.height = canvas.scrollHeight;

  // where API we are going to use to draw
  // ctx contains a reference to the drawing API we're gonna use.
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.log('Browser does not support drawing API');
    return;
  }
  // set color of rectangle
  ctx.fillStyle = 'rgba(250,0,0, 0.5)';
  // draw a filled rectangle, started at(10, 10), width: 100, height: 100
  ctx.fillRect(10, 10, 100, 100);

  // draw an outline rectangle
  ctx.strokeStyle = 'purple';
  ctx.strokeRect(120, 10, 100, 100);

  // filled circle
  ctx.beginPath();
  ctx.arc(280, 60, 50, 0, Math.PI * 2);
  ctx.fill();

  // outline circle
  ctx.beginPath();
  ctx.strokeStyle = 'pink';
  ctx.arc(390, 60, 50, 0, Math.PI * 2);
  ctx.stroke();

  // 1/4 red circle
  ctx.beginPath();
  ctx.arc(500, 60, 50, 0, Math.PI / 2);
  ctx.fillStyle = 'red';
  ctx.lineTo(500, 60);
  ctx.fill();

  // 1/4 green circle
  ctx.beginPath();
  ctx.arc(500, 60, 50, Math.PI / 2, Math.PI);
  ctx.fillStyle = 'blue';
  ctx.lineTo(500, 60);
  ctx.fill();

  // 1/4 blue circle
  ctx.beginPath();
  ctx.arc(500, 60, 50, Math.PI, Math.PI + Math.PI / 2);
  ctx.fillStyle = 'green';
  ctx.lineTo(500, 60);
  ctx.fill();

  // 1/4 purple circle
  ctx.beginPath();
  ctx.arc(500, 60, 50, Math.PI + Math.PI / 2, Math.PI * 2);
  ctx.fillStyle = 'pink';
  ctx.lineTo(500, 60);
  ctx.fill();

  // 1/2 upper arc

  ctx.beginPath();
  ctx.arc(610, 60, 50, 0, Math.PI, true);
  ctx.strokeStyle = '#ededede';
  ctx.lineWidth = 10;
  ctx.stroke();

  //
  ctx.beginPath();
  ctx.arc(710, 60, 50, 0, Math.PI);
  ctx.strokeStyle = '#ededede';

  // stroke thickness
  ctx.lineWidth = 10;
  ctx.stroke();
};
