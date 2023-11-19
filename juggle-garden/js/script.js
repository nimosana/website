/** Exercise 5: Juggle garden (clong)
 * @author Nicolas Morales-Sanabria
 * In this exercise, 2 players can play a variation of the "Pong" called "clong".
 * each player controls a paddle and has to make a clown bounce trying * to score on
 * their opponent, the games are best of 3 but players can play as many games 
 * as they want. 
 * This project uses Ben Moren's p5.collide2d.js library */
"use strict";
//represents the clong game instance
let clong;
// the image used for the ball in the clong game
let imageBalls;
let backgroundPos = 0;
setInterval(moveBackground, 50);

/** load the assets used in the clong game */
function preload() {
    imageBalls = loadImage('assets/images/clown.png');
}

/** create the canvas, setup critical variables and initialize ball & paddles */
function setup() {
    width = windowWidth * 0.98;
    height = windowHeight * 0.92;
    createCanvas(width, height);
    textSize(width * 0.031299);
    clong = new Clong(`title`);
}

/** runs the instance of the clong game */
function draw() {
    clong.run();
}

function moveBackground() {
    backgroundPos++;
    document.getElementById("body").style.backgroundPosition = `${backgroundPos}px ${backgroundPos}px`
}