/**
 * Exercise 1: I like to move it!
 * @author Nicolas Morales-Sanabria
 * 
 * Animates a dancing alien that changes color and body width, it follows the user's cursor 
 * and moves its arms to the beat!
 * My submission for Excercise 1: I like to move it!
 */
"use strict";
let size;
let randomColorR1, randomColorG1, randomColorB1;
let randomColorR2, randomColorG2, randomColorB2;
let randomColorR3, randomColorG3, randomColorB3;
let randomColorR4, randomColorG4, randomColorB4;
let randomColorR5, randomColorG5, randomColorB5;
let randomColorR6, randomColorG6, randomColorB6;
let direction, direction2, direction3, direction4;
let offset, offset2, offset3, offset4;
let xOffset, yOffset;
let x1, y1;
let horizontalMovement, verticalMovement;

/**
 * Creates the canvas and sets the text size used in the animation.
*/
function setup() {
    direction = direction2 = direction3 = direction4 = 1;
    offset = offset2 = offset3 = offset4 = 0;
    xOffset = yOffset = 0;
    mouseX = x1 = windowWidth / 2;
    mouseY = y1 = windowHeight / 2;
    horizontalMovement = verticalMovement = 0;
    size = windowHeight;
    createCanvas(windowWidth, windowHeight);
    textSize(size * 0.04);
    strokeWeight(size * 0.04)
    textAlign(CENTER, CENTER)
}

/**
 * Draws an alien that bops its head around, Updates the random colors, the offsets and follows 
 * the user's cursor while staying inside the canvas. The alien's body stretches and compresses.
*/
function draw() {
    background(0, 0, 0);
    //x1 and y1 values determine a position that follows the mouse,
    //the constrain on "map" to keeps the alien's whole head in the canvas
    x1 = constrain(map(mouseX, 0, windowWidth, 0, windowWidth) - (size / 2), -size / 2, (windowWidth * 1));
    y1 = constrain(map(mouseY, 0, size, 0, size) - ((size / 2) + size * 0.28), -(size * 0.5), 0);
    //the code without constrain would let the alien follow the cursor up to the corner of the canvas (with map's withinBounds =true)
    // x1 = map(mouseX, 0, size, 0, size, true) - (size / 2), -(size * 0.25), (size * 0.25);
    // y1 = map(mouseY, 0, size, 0, size, true) - ((size / 2) + 140), -(size * 0.5), 0;
    // y1 = -(size / 3);
    //randomize colors and determine next movement
    randomColors();
    boppingX(size * 0.02);
    boppingY(size * 0.06);
    bodyWiggle(size * 0.04);
    eyesClosing();
    horizontalMovement = xOffset + x1;
    verticalMovement = yOffset + y1;
    //The following code draws the alien
    //top of the head
    noStroke();
    fill(randomColorR1, randomColorG1, randomColorB1);
    ellipse((size / 2) + horizontalMovement, (size / 2) + (size / 8) + verticalMovement, size / 2, size / 4);
    fill(0);
    rect(0 + x1, size * (5 / 8) + verticalMovement + 1, size, size);
    fill(randomColorR1, randomColorG1, randomColorB1);
    stroke(randomColorR1, randomColorG1, randomColorB1);
    //left arm
    line(size / 2 + horizontalMovement, size + verticalMovement, (size / 8) + horizontalMovement, size - (yOffset / 5) + y1 + size * 0.1);
    line((size / 8) + horizontalMovement, size - (yOffset / 5) + y1 + size * 0.1, (size * 0.2) + horizontalMovement, size - yOffset * 5 + y1 + -size * 0.1);
    //right arm
    line(size / 2 + horizontalMovement, size + verticalMovement, (size * 0.875) + horizontalMovement, size - (yOffset / 5) + y1 + size * 0.1);
    line((size * 0.875) + horizontalMovement, size - (yOffset / 5) + y1 + size * 0.1, (size * 0.8) + horizontalMovement, size + yOffset * 5 + y1 + -size * 0.1);
    noStroke();
    //body
    ellipse((size / 2) + horizontalMovement, size + verticalMovement + size * 0.36, (size / 4) + offset3, size + offset3);
    fill(0);
    rect((size / 2) + horizontalMovement - (size / 4), size + verticalMovement + size * 0.6, (size / 2))
    //CLASSIFIED
    fill(randomColorR2, randomColorG2, randomColorB2);
    text("BELIEVE", (size / 2) + horizontalMovement, (size / 2) + verticalMovement + size * 0.75);
    //bottom of the head
    fill(randomColorR1, randomColorG1, randomColorB1);
    triangle(size / 4 + horizontalMovement, size * (5 / 8) + verticalMovement, (size * 0.75) + horizontalMovement, size * (5 / 8) + verticalMovement,
        (size / 2) + x1, size + verticalMovement);
    //mouth
    fill(randomColorR2, randomColorG2, randomColorB2);
    ellipse((size / 2) + horizontalMovement, (size * 3 / 4) + verticalMovement, size / 8, size / 4);
    fill(randomColorR1, randomColorG1, randomColorB1);
    ellipse((size / 2) + horizontalMovement, (size * 3 / 4) - size * 0.02 + verticalMovement, size / 7, size / 4);
    //left eye
    push();
    fill(randomColorR3, randomColorG3, randomColorB3);
    translate(size * (6 / 16) - size * 0.016 + horizontalMovement, size * (10.6 / 16) + verticalMovement);
    rotate(PI / 7);
    ellipse(0, 0, size * 0.24, size * 0.04 + offset4);
    pop();
    //right eye
    push();
    translate(size * (10 / 16) + size * 0.016 + horizontalMovement, size * (10.6 / 16) + verticalMovement);
    rotate(-(PI / 7));
    fill(randomColorR4, randomColorG4, randomColorB4);
    ellipse(0, 0, size * 0.24, size * 0.04 + offset4);
    pop();
    //nostrils
    fill(randomColorR5, randomColorG5, randomColorB5);
    ellipse(size * (8 / 16) - size * 0.02 + horizontalMovement, (size / 1.5) + size * 0.1 + verticalMovement, size * 0.01, size * 0.01);
    fill(randomColorR6, randomColorG6, randomColorB6);
    ellipse(size * (8 / 16) + size * 0.02 + horizontalMovement, (size / 1.5) + size * 0.1 + verticalMovement, size * 0.01, size * 0.01);
}
/**
 * Randomizes the RGB values for the different colors used
*/
function randomColors() {
    //body & head
    randomColorR1 = (Math.random() * 80);
    randomColorG1 = (Math.random() * 80);
    randomColorB1 = (Math.random() * 80);
    //mouth & text
    randomColorR2 = (Math.random() * 160);
    randomColorG2 = (Math.random() * 160);
    randomColorB2 = (Math.random() * 160);
    //left eye
    randomColorR3 = (Math.random() * 255);
    randomColorG3 = (Math.random() * 255);
    randomColorB3 = (Math.random() * 255);
    //right eye
    randomColorR4 = (Math.random() * 255);
    randomColorG4 = (Math.random() * 255);
    randomColorB4 = (Math.random() * 255);
    //nostrils
    randomColorR5 = (Math.random() * 120);
    randomColorG5 = (Math.random() * 120);
    randomColorB5 = (Math.random() * 120);
    randomColorR6 = (Math.random() * 120);
    randomColorG6 = (Math.random() * 120);
    randomColorB6 = (Math.random() * 120);
}
/**
 * creates a left-right movement, modifying the xOffset.
 * @param maxOffset maximum value of the offset (absolute)
*/
function boppingX(maxOffset) {
    offset += direction * size * 2.1E-3;
    if (offset >= maxOffset || offset <= -maxOffset) {
        direction *= -1;
    }
    xOffset = offset;
}
/**
 * creates an up-down movement, modifying the yOffset.
 * @param maxOffset maximum value of the offset (absolute)
*/
function boppingY(maxOffset) {
    offset2 += direction2 * size * 4.2E-3;
    if (offset2 >= maxOffset || offset2 <= -maxOffset) {
        direction2 *= -1;
    }
    yOffset = offset2;
}
/**
 * generates the open and closing movement of the eyes
 */
function eyesClosing() {
    let maxOffset = size * 0.04;
    offset4 += direction4 * (size * 0.04) / 30;
    if (offset4 >= maxOffset || offset4 <= -maxOffset) {
        direction4 *= -1;
    }
}
/**
 * modifies offset3, the value oscillates between its max offset
 * @param maxOffset maximum value of the offset (absolute)
*/
function bodyWiggle(maxOffset) {
    offset3 += direction3 * 2E-3;
    if (offset3 >= maxOffset || offset3 <= -maxOffset) {
        direction3 *= -1;
    }
}