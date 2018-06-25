var rot = 0;
var changeDir = 1;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	translate(width / 2, height / 2);
	


	for (var i = 5; i < 11; i++) {
		polygon(i, 30 * i);
	}
}

function polygon(nPoly, radius) {
	push();
	var degRotate = Math.pow(-1, nPoly) * frameCount / (20 * nPoly);
	stroke(255);
	strokeWeight(2);
	noFill();
	rotate(degRotate);
	var unitAng = TWO_PI / nPoly;
	beginShape();
	for (var i = 0; i < nPoly; i++) {
		var vertexX = radius * (cos(i * unitAng));
		var vertexY = radius * (sin(i * unitAng));
		vertex(vertexX, vertexY);
	}
	endShape(CLOSE);
	pop();
}