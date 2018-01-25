var numberC = 4;
var points = [];
var dots = []

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	var distanceX = width / (numberC + 1);
	var distanceY = height / (numberC + 1);
	var firstPointX = width / 2 - (numberC - 1) * distanceY / 2;
	var firstPoint = createVector(firstPointX, distanceY);

	for(var i = 0; i < numberC; i++) {
		for(var j = 0; j < numberC; j++) {
			var temp = createVector(0, 0);
			temp.x += firstPoint.x + j * distanceY;
			temp.y += firstPoint.y + i * distanceY;
			points.push(temp);
		}
	}

	for(var i = 0; i < points.length; i++) {
		dots.push(new Dot());
		dots[i].x = points[i].x;
		dots[i].y = points[i].y;
	}
}

function draw() {
	background(0);

	for(var i = 0; i < dots.length; i++) {
		dots[i].update(frameCount / 40);
		dots[i].show();
	}	
}

function Dot() {
	this.x = 0;
	this.y = 0;
	this.maxR = 90 * random(0.2, 2);
	this.whiteR = 0;
	this.blackR = 0;

	this.update = function(count) {
		this.whiteR = this.maxR * Math.abs(sin(count / 10));
		this.blackR = 0.8 * this.maxR * Math.abs(sin(count + PI / 4));
	}

	this.show = function() {
		stroke(250);
		strokeWeight(3);
		fill(255);
		ellipse(this.x, this.y, this.whiteR, this.whiteR);
		fill(0);
		ellipse(this.x, this.y, this.blackR, this.blackR);
	}
}