var t = 0
var circle = [];

function setup() {
	// frameRate(3);
	createCanvas(windowWidth, windowHeight);
	background('#FAFAF4');
	for (var i = 0; i < 3; i++) {
		circle.push(new Noise_circle(random(width / 5), random(height), random(20, 50)));
	}
}

function draw() {
	for (var i = 0; i < circle.length; i++) {
		circle[i].x += 20;
		if (random(1) > 0.5) {
			circle[i].y += 50 * noise(t);
		}
		else {
			circle[i].y -= 50 * noise(t);
		}
		circle[i].draw_circle();
		circle[i].show();
	}
}

function Noise_circle(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.col = []

	this.draw_circle = function() {
		var divide = 720;
		var segment = TWO_PI / divide
		for (var i = 0; i < divide; i++) {
			var pt_x = this.x + r * (1 + random(-1, 1) * noise(t)) * cos(i * segment);
			var pt_y = this.y + r * (1 + random(-1, 1) * noise(t)) * sin(i * segment);
			this.col.push([pt_x, pt_y]);
			t += 0.05;
		}
	}
	this.show = function() {
		noFill();
		stroke('rgba(36, 42, 175, 0.5)');
		strokeWeight(2);
		beginShape();
		for (var i = 0; i < this.col.length; i++) {
			curveVertex(this.col[i][0], this.col[i][1]);
		}
		endShape(CLOSE);
		this.col = [];
	}
}