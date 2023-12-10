let w, h; // width and height
let time = 0;
let num;
let waveSlider;
let waveSliderValue;
let waveFunction;
let waveText;
let wave = [];

function setup() {
  w = windowWidth;
  h = windowHeight*1.00;

	// Create the sliders
  num = createSlider(1, 256, 1);
	num.position(w*0.15, h*0.92);
	num.size(w*0.12);

	waveSlider = createSlider(1, 3, 1);
	waveSlider.position(w*0.01, h*0.92);
	waveSlider.size(w*0.12);

	waveText = ["Square", "Sawtooth", "Triangle"];
	waveSliderValue = waveSlider.value();

	waveFunction = new Functions(waveSliderValue, min(w, h)/5);

  createCanvas(w, h);
}

function draw() {
  background(0);

  let x=0;
  let y=0;

  translate(windowWidth*0.25, h/2);

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
	strokeWeight(2);
  line(x, y, w/2.5, y);
  pop();

  // Draw the end point
  circle(x, y, 8);

  // Draw the wave
  wave.unshift(y);

  push();
  noFill();
  stroke(255,255,0);
	strokeWeight(2);
  beginShape();
  for(let i=0; i<wave.length; i++) {
    vertex(w/2.5 + i, wave[i]);
  }
  endShape();
  pop();


  // For memory efficiency
	// Remove old points from wave
  if(wave.length >= w) {
    wave.pop();
  }

	// Draw the slider texts
  push();
	translate(-windowWidth*0.25, -h/2);
  fill(255);
  stroke(255);
  textSize(w/64);
  text(str(num.value()), w*0.15, h*0.90);
	text(waveText[waveSlider.value()-1], w*0.01, h*0.90);
  pop();

  time += 0.02;
}