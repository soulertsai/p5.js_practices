function Particles() {
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.prevPos = this.pos.copy();

	this.show = function() {
		stroke(0, 25);
		strokeWeight(2);
		line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
	}

	this.update = function() {
		this.updatePrev();
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.vel.limit(2);
		this.acc.mult(0);
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.updatePrev = function() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	this.follow = function(vector) {
		var gridx = floor(this.pos.x / scl);
		var gridy = floor(this.pos.y / scl);
		var index = gridy * col + gridx;
		console.log(index);
		this.applyForce(vector[index]);
		// console.log(vector[50].x);
	}

	this.edge = function() {
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.prevPos.x = this.pos.x;
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.prevPos.x = this.pos.x;
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.prevPos.y = this.pos.y;
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.prevPos.y = this.pos.y;
		}
	}
}