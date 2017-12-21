var dots = [];
var xoff = 15;
var xmove = 0.5;

function setup() {
	createCanvas(600, 600);

	for (var i = 0; i < 50; i++) {
		dots.push(new Dot());
		dots[i].x += xoff * i;
		dots[i].y = map(dots[i].initNoise, 0, 1, 0, height);
	}

}

function draw() {
	background(0);
	color(255);
	stroke(255);
	fill(255);

	while(dots[0].x == 30) {
		dots.pop();
		dots.unshift(new Dot())
	}

	for (var i = 0; i < dots.length; i++) {
		dots[i].x += xmove;
		dots[i].y = map(noise(dots[i].initNoise), 0, 1, 0, height);
		dots[i].initNoise += 0.01
		ellipse(dots[i].x, dots[i].y, 5, 5);
	}

	noFill();
	beginShape();
	for (var i = 0; i < dots.length; i++) {
		vertex(dots[i].x, dots[i].y);
	}
	endShape();
}


function Dot() {
	this.x = 0;
	this.y = 0;
	this.initNoise = random(100);
}