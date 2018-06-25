// debugger;

var areaR = 100;
var nodes = [];
var auxins = [];
var auxinLim = 1;
var checkAuxinLim = 1;
var newAuxin = 1;



function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	strokeWeight(3);
	for (var i = 0; i < 3; i++) {
		nodes.push(new Node());
		nodes[i].position.x = 0;
		nodes[i].position.y = areaR - 5 * (i + 1);
	}

	for (var i = 0; i < 4; i++) {
		auxins.push(new Auxin());
	}

	frameRate(20);
}

function draw() {
	background(255);
	noStroke()
	translate(width / 2, height / 2);
	fill(50);
	ellipse(0, 0, areaR * 2, areaR * 2);
	stroke(255);
	for (var i = 0; i < nodes.length; i++) {
		var hierarchy = Math.floor(i / 200);
		var branchWeight = map(hierarchy, 0, 10, 5, 1);
		fill(255);
		ellipse(nodes[i].position.x, nodes[i].position.y, branchWeight);
	}
	if (auxins.length < 3000) {
		for (var i = 0; i < auxins.length; i++) {
			auxins[i].nodeCal();
		}

		var nodesLen = nodes.length
		for (var i = 0; i < nodesLen; i++) {
			nodes[i].vectorCal();
			nodes[i].normalize();
			nodes[i].putNode();
			nodes[i].resetNextVec();
		}
		deleteAuxin();
		if (areaR < 0.35 * height) {
			areaR += 10;
		}
		for (var i = 0; i < newAuxin; i++) {
			auxins.push(new Auxin());
		}
		checkAuxin();
		// for (var i = 0; i < auxins.length; i++) {
		// 	stroke(color('red'));
		// 	point(auxins[i].position.x, auxins[i].position.y);
		// }

		console.log(nodes.length);
	}

	// noLoop();
}

function Node() {
	this.position = createVector(0, 0);
	this.nextVec = createVector(0, 0);
	this.auxinColl = [];
	this.vectorCal = function() {
		if (this.auxinColl.length != 0) {
			for (var i = 0; i < this.auxinColl.length; i++) {
				var tempVec = p5.Vector.sub(this.auxinColl[i], this.position);
				// console.log(tempVec);
				// console.log(this.auxinColl[i]);
				// console.log(this.position)
				// console.log('');
				var distTemp = tempVec.mag();
				this.nextVec.add(tempVec.div(distTemp));
			}
		}
		else {
			return;
		}
	}
	this.normalize = function() {
		if (this.nextVec.mag() != 0) {
			this.nextVec.div(this.nextVec.mag());
		}
		else {
			return;
		}
	}
	this.putNode = function() {
		if(this.nextVec.mag() != 0) {
			var positionTemp = p5.Vector.add(this.position, this.nextVec.setMag(1));
			for (var i = 0; i < nodes.length; i++) {
				var distN2N = p5.Vector.sub(positionTemp, nodes[i].position).mag();
				// console.log('dist ' + distN2N);
				// console.log(nodes.length);
				// console.log(auxins.length);
				if (distN2N < auxinLim) {
					return;
				}
			}
			// console.log('work');
			checkN2N(positionTemp);
		}
	}
	this.resetNextVec = function() {
		this.nextVec = createVector(0, 0);
	}
	
}

function Auxin() {
	this.position = createVector(random(-1, 1), random(-1, 1)).setMag(random(areaR));
	this.nearestNode = [];
	this.distArr = [];
	this.nodeCal = function() {
		for (var i = 0; i < nodes.length; i++) {
			var distTemp = dist(this.position.x, this.position.y, nodes[i].position.x, nodes[i].position.y);
			this.distArr.push(distTemp);
		}

		var min = Math.min.apply(null, this.distArr);
		for (var i = 0; i < nodes.length; i++) {
			if (this.distArr[i] == min) this.nearestNode.push(i);
		}
		var index = Math.floor(Math.random() * this.nearestNode.length);
		nodes[this.nearestNode[index]].auxinColl.push(this.position);
		this.distArr = [];
	}
}

// 看現有的auxin和新增的node距離是否太近
function deleteAuxin() {
	var delList = [];
	for (var i = 0; i < auxins.length; i++) {
		for (var j = 0; j < nodes.length; j++) {
			var distTemp = dist(auxins[i].position.x, auxins[i].position.y, nodes[j].position.x, nodes[j].position.y);
			if (distTemp < auxinLim) {
				delList.push(i);
				break;
			}
		}
	}

	for (var i = delList.length - 1; i >= 0; i--) {
		auxins.splice(delList[i], 1);
		// print('deleteAuxin');
	}
	delList = [];
}

// 確認新增的auxin和舊的auxin距離不會太近
function checkAuxin() {
	var start = auxins.length - newAuxin;
	var delList = [];
	for (var i = start; i < auxins.length; i++) {
		for (var j = 0; j < start; j++ ) {
			var distTemp = dist(auxins[i].position.x, auxins[i].position.y, auxins[j].position.x, auxins[i].position.y);
			if (distTemp < checkAuxinLim) {
				delList.push(i);
				break;
			}
		}
	}
	for (i = delList.length - 1; i >= 0; i--) {
		auxins.splice(delList[i], 1);
		// print('checkAuxin');
	}
}

function checkN2N(vector) {
	// print('in');
	nodes.push(new Node());
	nodes[nodes.length - 1].position = vector;
}