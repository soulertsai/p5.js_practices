var xoff = 0;
var yoff = 0;
var inc = 0.01;

function setup() {
	createCanvas(200, 200);
	pixelDensity(1);
}

function draw() {
	// background(0);
	loadPixels();
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var index = (x + y * width) * 4;
			pixels[index + 0] = noise(xoff, yoff) * 255;
			pixels[index + 1] = noise(xoff, yoff) * 255;
			pixels[index + 2] = noise(xoff, yoff) * 255;
			pixels[index + 3] = 255;
			xoff += inc;
		}
		xoff = 0;
		yoff += inc;
	}
	updatePixels();

	noLoop();
}