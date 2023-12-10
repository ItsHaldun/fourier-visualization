let w, h; // width and height
let time = 0;
let num;
let waveSlider;
let waveSliderValue;
let waveFunction;
let wave = [];

function setup() {
  w = windowWidth;
  h = windowHeight-20;

	// Create the sliders
  num = createSlider(1, 256, 1);
	num.position(10, h);

	waveSlider = createSlider(1, 3, 1);
	waveSlider.position(10, h-20);

	waveSliderValue = waveSlider.value();

	waveFunction = new Functions(waveSliderValue);

  createCanvas(w, h);
}

function draw() {
  background(0);

  let x=0;
  let y=0;

  let radius = (h/5) * 4 / (1 * PI);
  translate(radius*2, h/2);

	// Check if waveSlider moved
	if (waveSliderValue != waveSlider.value()) {
		waveSliderValue = waveSlider.value();
		waveFunction.chosenFunction = waveSliderValue;
	}

	// Calculate the transform
	new_coordinates = waveFunction.transform(x, y);
	x = new_coordinates[0];
	y = new_coordinates[1];

  // Draw the horizontal line
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