# Noise Wave

### Idea
First, make a constructor function to initialize the object I make.
Because `noise()` take values varying differently when specifying greatly different arguments, so I randomize between 100.

After initialization, I move each element in array 'dots' by adding the 'xoff', and change the noise position gradually.

### Problems and Solutions
####  How to add a new value to the very beginnig of an array
`arr.unshift(new Dots())`

#### How to connect all the different points on the canvas
[link](https://p5js.org/reference/#/p5/beginShape)

#### What I have learned
1. Make a construstor function is very useful when I need to reassign the initial values.
2. It's very convenient to make an array to store a series of information. When time involved (just like an element appearing after another), I can easily uilize some methods predefined, like `pop`, `splice()`