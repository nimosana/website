/**Exercise 3: Love, Actually
 * @author Nicolas Morales-Sanabria
 * 
 * In this simulation, the user controls a clown emoji that moves around trying to collect money,
 *  there are also "fish" (clowns with lipstick) following him around but keeping a set distance,
 *  as the user collects more money the fish get closer to the user. The game ends if the user makes
 *  contact with a fish or if the user collects a set amount of money. */

"use strict";
//represents the user
let user = {
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 3,
    maxSpeed: undefined,
    directionX: 1,
    directionY: 1,
    accelX: undefined,
    accelY: undefined,
    texture: null,
    money: 5
};
//array for all my fish
let fishInTheSea = [];
//number of fish to create
let fishNumber = 1000;
//speed of the fishies
let fishSpeed = 3;
//texture used for the fish
let fishTexture = undefined;
//represents the money wads
let money = {
    x: 250,
    y: 250,
    size: undefined,
    texture: undefined
}

let state = `title`; // Can be: title, simulation, love

/** loads the textures used for the user,fishes and money */
function preload() {
    user.texture = loadImage('assets/images/clown.png');
    fishTexture = loadImage('assets/images/clownette2.png');
    money.texture = loadImage('assets/images/money2.png');
}

/** Sets the user's initial position, creates the fish array, places the money and sets the text style*/
function setup() {
    width = windowWidth * 0.98;
    height = windowHeight * 0.92;
    createCanvas(width, height);
    user.size = width * 0.04;
    user.maxSpeed = width * 0.001718;
    user.accelX = width * 3.9025E-5;
    user.accelY = user.accelX;
    money.size = user.size;
    user.x = width / 2;
    user.y = height / 2;
    makeFishList();
    spawnMoney();
    textSize(width * 0.025);
    textAlign(CENTER, CENTER);
}

/** Draws the correct animation depending on the state of the game */
function draw() {
    background(0);

    if (state === `title`) {
        title();
    }
    else if (state === `simulation`) {
        simulation();
    }
    else if (state === `love`) {
        love();
    }
    else if (state === `rich`) {
        rich();
    }
}

/** Displays the title screen */
function title() {
    fill(200, 100, 100);
    text("💘Modern love simulator💘\n\nGet that money💸\nWASD/Arrow Keys to move\nClick to start", width / 2, height / 2);
}

/** executes the functions necessary for the animation. Control the user, money and display the moving fish */
function simulation() {
    keyMovement(user);
    lockInWindow(user);
    fishCuriosity();
    checkOverlap();
    checkMoney();
    display();
}

/** Displays the animation when the user makes contact with a fish */
function love() {
    push();
    for (let i = 0; i < 3000; i++) { //thats alot of money!
        image(money.texture, random(-money.size/2, width), random(-money.size/2, height), money.size, money.size);
    }
    rectMode(CENTER);
    fill(0, 0, 0, 120)
    rect(width / 2, height / 2, width*0.2, height*0.2);
    fill(255, 50, 50);
    text(`You found "love"\n\nClick to restart`, width / 2, height / 2);
    pop();
    if (mouseIsPressed) {
        user.money = 5;
        user.x = width / 2;
        user.y = height / 2;
        fishInTheSea = [];
        makeFishList();
        state = "simulation";
    }
}

/** Display an alternative end animation if the user has earned enough money */
function rich() {
    for (let i = 0; i < 3000; i++) { //thats alot of money!
        image(money.texture, random(-money.size/2, width), random(-money.size/2, height), money.size, money.size);
    }
    rectMode(CENTER);
    fill(0, 0, 0, 120)
    rect(width / 2, height / 2, width*0.5, height*0.3);
    fill(255, 50, 50);
    text(`You're way too rich for these clowns\n go get a Bugatti or something\n\nClick to restart`, width / 2, height / 2);
    if (mouseIsPressed) {
        user.money = 5;
        user.x = width / 2;
        user.y = height / 2;
        fishInTheSea = [];
        makeFishList();
        state = "simulation";
    }
}

/** detect if the user has had contact with the money or the fishies */
function checkOverlap() {
    // check if the user has grabbed money and if he does, move it & make him richer
    if (ellipseSuperpositionDetection(user, money)) {
        repositionEllipseOutsideOther(money, user);
        user.money *= 2;
        for (let fish of fishInTheSea) { // draw every "fish" closer ;)
            fish.curiosity -= user.size * 0.2;
        }
    }
    // change the game state if the user and a fish touch
    for (let fish of fishInTheSea) {
        if (ellipseSuperpositionDetection(user, fish)) {
            state = `love`;
        }
    }
}

/** displays the user, the fishies, the money wad & the money the user has */
function display() {
    // Display the user
    displayImage(user, 0);
    // Display the fishes
    fill("blue");
    for (let fish of fishInTheSea) {
        displayImage(fish, 2, fishTexture);
    }
    //display the money
    displayImage(money, 0);
    push();
    textAlign(LEFT, CENTER);
    rectMode(CENTER);
    fill(0, 0, 0, 150);
    rect(150, 40, width * 0.273, 80);
    fill('lime');
    text(`Money: ${user.money}`, 10, 40);
    pop();
}

/** starts the simulation if the mouse is pressed */
function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }
}

/** generates a certain amount of fishies outside the user's personal space.
 * the fishes will each have a random position, and a random "curiosity" which
 * will affect how close they get to the user */
function makeFishList() {
    for (let i = 0; i < fishNumber; i++) {
        let tempPos = {
            x: random(0, width),
            y: random(0, height)
        }
        while (dist(user.x, user.y, tempPos.x, tempPos.y) < user.size * 2) {
            tempPos.x = random(0, width);
            tempPos.y = random(0, height);
        }
        let fish = {
            x: tempPos.x,
            y: tempPos.y,
            size: user.size,
            speed: 3,
            vx: 0,
            vy: 0,
            maxSpeed: width * 2.734E-3,
            directionX: 1,
            directionY: 1,
            accelX: width * 9.7656E-5,
            accelY: width * 9.7656E-5,
            curiosity: random(4 * user.size, 25 * user.size)
        };
        fishInTheSea.push(fish);
    }
}

/** generates a movement behavior for the fishies, makes them 
 * constantly chase the user and then flee when they are too close 
 * (depending on their curiosity). Also makes them have random spasms. */
function fishCuriosity() {
    for (let fish of fishInTheSea) {
        if (dist(user.x, user.y, fish.x, fish.y) > (user.size + fish.curiosity)) {
            chaseFleeTarget(fish, user, 1);
        }
        else {
            chaseFleeTarget(fish, user, -1);
        }
        randomSpasm(fish, 0.01, 0.5);
    }
}

/**compares X & Y of two objects & affects the mover's accel/speed to go towards or flee the target
 * @param  mover the object being moved
 * @param  target the object being chased
 * @param  usage 1 to  chase, -1 to flee */
function chaseFleeTarget(mover, target, usage) {
    //horizontal movement - detect direction change & affect speed
    let directionX = usage * Math.sign(target.x - mover.x);
    let accelX = directionX * mover.accelX;
    mover.vx += accelX;
    //limit speed to max speed then move object
    if (abs(mover.vx) > abs(mover.maxSpeed)) {
        mover.vx = mover.maxSpeed * directionX;
    }
    mover.x += mover.vx;
    //vertical movement - detect direction change & affect speed
    let directionY = usage * Math.sign(target.y - mover.y);
    let accelY = directionY * mover.accelY;
    mover.vy += accelY;
    //limit speed to max speed then move object
    if (abs(mover.vy) > abs(mover.maxSpeed)) {
        mover.vy = mover.maxSpeed * directionY;
    }
    mover.y += mover.vy;
    // console.log("mover speed X: " + mover.vx + "mover speed Y: " + mover.vy); //test acceleration
}

/** Allows the user to control an object's speed with accelerations, using the arrow keys
 * @param obj object to be controlled using the arrow keys */
function keyMovement(obj) {
    //horizontal movement
    if ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) {
        obj.vx = obj.vx + obj.accelX;
    } else if (keyIsDown(37) && !keyIsDown(39) || (keyIsDown(65) && !keyIsDown(68))) {
        obj.vx = obj.vx - obj.accelX;

    } else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39)) || (keyIsDown(65) && keyIsDown(68))) {
        if (abs(obj.vx) > (obj.maxSpeed * 0.01)) {
            obj.vx /= 1.03;
        } else {
            obj.vx = 0;
        }
    }
    //vertical movement
    if ((keyIsDown(38) && !keyIsDown(40)) || (keyIsDown(87) && !keyIsDown(83))) {
        obj.vy -= obj.accelY;
    } else if (keyIsDown(40) && !keyIsDown(38) || (keyIsDown(83) && !keyIsDown(87))) {
        obj.vy += obj.accelY;
    } else if ((!keyIsDown(40) && !keyIsDown(38)) || (keyIsDown(40) && keyIsDown(38)) || (keyIsDown(83) && keyIsDown(87))) {
        if (abs(obj.vy) > (obj.maxSpeed * 0.01)) {
            obj.vy /= 1.03;
        } else {
            obj.vy = 0;
        }
    }
    //limit to max speed
    obj.speed = sqrt(pow(obj.vx, 2) + pow(obj.vy, 2));
    if (obj.speed > obj.maxSpeed) {
        obj.vx *= (obj.maxSpeed / obj.speed);
        obj.vy *= (obj.maxSpeed / obj.speed);
    } //move obj
    obj.x += obj.vx;
    obj.y += obj.vy;
}
/** Prevents an object from leaving the viewable window area, sets it back inside and inverts its speed.
 * @param obj object to be locked inside the window  */
function lockInWindow(obj) {
    //horizontally
    if ((obj.x < obj.size / 2)) {
        obj.x = obj.size / 2;
        obj.vx *= -1;
    }
    else if ((obj.x > width - obj.size / 2)) {
        obj.x = width - obj.size / 2;
        obj.vx *= -1;
    }
    //vertically
    if ((obj.y < obj.size / 2)) {
        obj.y = obj.size / 2;
        obj.vy *= -1;
    }
    else if ((obj.y > height - obj.size / 2)) {
        obj.y = height - obj.size / 2;
        obj.vy *= -1;
    }
    console.log(`X: ${obj.x} Y:${obj.y}`);
}

/** allows for moving objects to have random spasms with set percentages and intensity
 * @param spasmer  object to introduce random speed changes to
 * @param odds % probability of a spasm to occur (between 0-1)
 * @param intensity an intensity multiplier relative to the max speed of the object */
function randomSpasm(spasmer, odds, intensity) {
    if (random(0, 1) <= odds) {
        spasmer.vx = random(-spasmer.maxSpeed * intensity, spasmer.maxSpeed * intensity);
        spasmer.vy = random(-spasmer.maxSpeed * intensity, spasmer.maxSpeed * intensity);
    }
}

/**  returns a boolean indicating if two ellipses are overlapping
 @param a the first ellipse
 @param b the second ellipse
 @return true if they are overlapping, false if they aren't */
function ellipseSuperpositionDetection(a, b) {
    let distance = dist(a.x, a.y, b.x, b.y);
    if (distance < a.size / 2 + b.size / 2)
        return true;
    else
        return false;
}

/** Repositions an object while making sure it is outside another
 * a buffer distance multiplier can be added
 * @param obj the object to be randomly repositioned 
 * @param other the object to stay outside of
 * @param distMultiplier a distance multiplier buffer for extra space between the objects (>=1) */
function repositionEllipseOutsideOther(obj, other, distMultiplier) {
    let tempPos = {
        x: random(0, width),
        y: random(0, height)
    }
    while (dist(obj.x, obj.y, other.x, other.y) < (obj.size + other.size) * distMultiplier) {
        tempPos.x = random(0 + obj.size, width - obj.size);
        tempPos.y = random(0 + obj.size, height - obj.size);
    }
    obj.x = tempPos.x;
    obj.y = tempPos.y;
}

/** spawn the money ensuring it is outside the ellipse of the user*/
function spawnMoney() {
    let tempPos = {
        x: random(0 + money.size, width - money.size),
        y: random(0 + money.size, height - money.size)
    }
    while (dist(tempPos.x, tempPos.y, user.x, user.y) < (money.size + user.size)) {
        tempPos.x = random(0 + money.size, width - money.size);
        tempPos.y = random(0 + money.size, height - money.size);
    }
    money.x = tempPos.x;
    money.y = tempPos.y;
}

/** If the user has enough money, change to the special ending game state */
function checkMoney() {
    if (user.money >= 1310720) {
        state = 'rich';
    }
}

/** easily display images instead of shapes
 * @param obj object to be drawn
 * @param type type or case of object to be drawn
 * @param specialTexture a specific texture to be used (for type 2)*/
function displayImage(obj, type, specialTexture) {
    switch (type) {
        case 0: //adjust to draw instead of an ellispe (centered)
            image(obj.texture, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
            break;
        case 1: //adjust to draw instead of a square (corner)
            image(obj.texture, obj.x, obj.y, obj.size, obj.size);
            break;
        case 2: //adjust to draw instead of an ellispe but using a predefined texture
            image(specialTexture, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
            break;
        default: //invalid type
            console.log("DisplayImage Wrong type bud: " + type);
            break;
    }
}