var dots = [];
var circle = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    dots = dots_around_circle(3, 350);
    var dots_copy = dots.slice(0);
    tri_sub(dots);
    
    sand_plot(dots_copy[1], dots_copy[0], 4, 1.5);
    
    sand_plot(dots_copy[0], dots_copy[2], 4, 1.5);
    sand_plot(dots_copy[1], dots_copy[2], 4, 1.5);

    circle = circle_division(width / 2, height / 2, 50, 350);
    
    for (var i = 0; i < circle.length - 1; i++) {
        sand_plot(circle[i], circle[i + 1], 4, 1.5);
    }
    
    sand_plot(circle[0], circle[circle.length - 1], 4, 1.5);


}

function draw() {
    //stroke(50);
    //strokeWeight(1);
    noFill();
    //beginShape();
    //for (var i = 0; i < dots.length; i++) {
	//vertex(dots[i].x, dots[i].y);
    //}
    //endShape(CLOSE);

}

function dots_around_circle(number, radius) {
    var dots_arr = []
    for (var i = 0; i< number; i++) {
        middle_x = width / 2;
        middle_y = height / 2;
        angle = random(TWO_PI);
        x = middle_x + radius * cos(angle);
        y = middle_y + radius * sin(angle);
        dots_arr.push(createVector(x, y));
    }
    return dots_arr;
}

function tri_sub(dots) {
    var dots_array = dots.slice();
    var dist_array = [];
    dist_array = array_dist(dots_array);
    
    var indexOfMaxValue = dist_array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

    if (indexOfMaxValue != dist_array.length - 1) {
	var pt1 = dots_array[indexOfMaxValue];
	var pt2 = dots_array[indexOfMaxValue + 1];
	dots_array.splice(indexOfMaxValue + 1, 1);
	dots_array.splice(indexOfMaxValue, 1);
    }
    else {
	var pt1 = dots_array[indexOfMaxValue];
	var pt2 = dots_array[0];
	dots_array.splice(indexOfMaxValue, 1);
	dots_array.splice(0, 1);
    }
    var pt3 = interplot(pt1, pt2, random(0.4, 0.5));
    stroke(255);
    //line(dots_array[0].x, dots_array[0].y, pt3.x, pt3.y);
    sand_plot(dots_array[0], pt3, 4, 1.5);
    var seq1 = [pt1, pt3, dots_array[0]];
    var seq2 = [pt2, pt3, dots_array[0]];

    var check = 1;
    length_min = 30;
    dist_array.forEach(function(item) {
	if (item < length_min) {
	    check = 0;
	}});
    if (check) {
	if (random(1) > 0.1) {
	    tri_sub(seq1);
	}
	if (random(1) > 0.1) {
	    tri_sub(seq2);
	}
    }
    
}

function array_dist(array) {
    dist_array = [];
    for (var i = 0; i < (array.length - 1); i++) {
        var vec_temp = p5.Vector.sub(array[i], array[i + 1])
        var dist_temp = vec_temp.mag();
        dist_array.push(dist_temp);
    }

    var vec_temp = p5.Vector.sub(array[0], array[array.length - 1])
    var dist_temp = vec_temp.mag();
    dist_array.push(dist_temp);

    return dist_array;
}

// interplot a new point based on pt1
function interplot(pt1, pt2, ratio) {
    var sub = p5.Vector.sub(pt2, pt1);
    var mag = sub.mag();
    sub.setMag(mag * ratio);
    var pt3 = p5.Vector.add(pt1, sub)

    return pt3;
}

//function sand_plot(pt1, pt2) {
    //var xoff = 0;
    //var sub_vec = p5.Vector.sub(pt2, pt1);
    //var len = sub_vec.mag();
    //for (var i = 1; i * 1.5 < len; i++) {
	//var cl = noise(xoff);
	//var map_cl = map(cl, 0, 1, 0, 225);
	////stroke(map_cl);
	////strokeWeight(2);
	//noStroke();
	//sub_vec.setMag(i * 1.5);
	//var pos = p5.Vector.add(pt1, sub_vec);
	//fill(map_cl);
	//ellipse(pos.x, pos.y, random(4), random(4));
	////ellipse(pos.x, pos.y, 2, 2);
	//noFill();
	//console.log(pos.x + ' ' + pos.y);
	//xoff += 1;
    //}
//}
function sand_plot(pt1, pt2, stroke_weight, density) {
    var xoff = 0;
    var sub_vec = p5.Vector.sub(pt2, pt1);
    var len = sub_vec.mag();

    for (var i = 1; i * density < len; i++) {
        var cl = noise(xoff);
        var map_cl = map(cl, 0, 1, 0, 100);
    
        //noStroke();
        stroke(map_cl, random(150, 255));
        sub_vec.setMag(i * density);
        var pos = p5.Vector.add(pt1, sub_vec);
        //fill(map_cl);
        //ellipse(pos.x, pos.y, random(stroke_weight), random(stroke_weight));
        strokeWeight(random(stroke_weight));
        point(pos.x, pos.y);
    
        noFill();
        console.log(pos.x + ' ' + pos.y);
        xoff += 1;
    }
}

function circle_division(x, y, number, radius) {
    var dots_arr = [];
    for (var i = 0; i < number; i++) {
        angle = map(i, 0, number, 0, TWO_PI);
        pos_x = x + radius * cos(angle);
        pos_y = y + radius * sin(angle);
        dots_arr.push(createVector(pos_x, pos_y));
    }

    return dots_arr;
}
