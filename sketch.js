let w, h; // width and height
let time = 0;
let num;
let wave = [];

function setup() {
  w = windowWidth;
  h = windowHeight-20;

  num = createSlider(1, 100, 1);

  createCanvas(w, h);
}

function draw() {
  background(0);

  let x=0;
  let y=0;

  let radius = (h/5) * 4 / (1 * PI);
    
    translate(radius*2, h/2);

  

  for(let i=0; i<num.value(); i++) {

    prevx = x;
    prevy = y;

    n = 2 * i + 1;
    radius = (h/5) * 4 / (n * PI);

    // Draw the circles
    push();
    noFill();
    stroke(255, 100);
    circle(x, y, 2*radius);
    pop();

    // Calculate new x y
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    // Draw the connecting lines
    push();
    stroke(255);
    line(prevx, prevy, x, y);
    pop();
  }

    // Draw the vertical line
  push(); 
  stroke(226, 83, 178);
  line(x, y, w/2.5, y);
  pop();

  // Draw the end point
  circle(x, y, 8);

  // Draw the wave
  wave.unshift(y);

  push();
  noFill();
  stroke(255,255,0);
  beginShape();
  for(let i=0; i<wave.length; i++) {
    vertex(w/2.5 + i, wave[i]);
  }
  endShape();
  pop();


  // For memory efficiency
  if(wave.length >= w) {
    wave.pop();
  }

  push();
  fill(255);
  stroke(255);
  textSize(32);
  text(str(num.value()), 10-(h/5) * 8 / (1 * PI), h/2 - h/40);
  pop();

  time += 0.02;
}
