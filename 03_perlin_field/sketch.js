var scl = 20;
var row;
var col;
var inc = 0.03;
var particles = [];
var flowfield;
var zoff = 0;

function setup() {
	createCanvas(800, 600);
	background(255);
	col = width / scl;
	row = height / scl;
	flowfield = new Array(floor(col) * floor(row));
	var yoff = 0;
	for (var y = 0; y < row; y++) {
		var xoff = 0;
		for (var x = 0; x < col; x++) {
			var index = y * col + x;
			var angle = noise(xoff, yoff) * TWO_PI;
			var flowVec = p5.Vector.fromAngle(angle);
			flowVec.setMag(10);

			// visualize the flowfield
			//
			// push();
			// translate(x * scl, y * scl);
			// line(0, 0, flowVec.x, flowVec.y);
			// pop();

			// console.log(flowVec);
			flowfield[index] = flowVec;
			xoff += inc;
		}
		yoff += inc;
	}

	for (var i = 0; i < 1000; i++) {
		particles.push(new Particles());
	}
}

function draw() {
	for(var i = 0; i < particles.length; i++) {
		particles[i].edge();
		particles[i].show();
		particles[i].update();
		particles[i].follow(flowfield);	
	}
}