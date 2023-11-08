/** Age of Aquariums
 * @author Nicolas Morales-Sanabria
 * 
 * This is a fishing simulation, the user can move around and catch fish, he can win by catching enough or losing by catching a carnivore.
 * the player can click around to add fish to the simulation */
"use strict";

let state = `title`;
let school = [], evilSchool = [];
let schoolSize = 30, evilSchoolSize = 5;
let waterRatio = 0.8, waterSurface;
let fishTextureR, fishTextureL, evilTextureR, evilTextureL;
let fishHookSpeed = undefined;
//represents the user on the boat
let user = {
    score: 0,
    boat: {
        x: 0,
        y: 0,
        w: undefined,
        h: undefined,
        vx: 0,
        accelX: 0.1,
        maxSpeed: 2
    },
    hook: {
        xOrigin: 0,
        yOrigin: 0,
        x: 0,
        y: 0,
        size: undefined,
        vy: 0,
        busy: false
    },
    texture: undefined
}

/** load the required textures for the fish and the user */
function preload() {
    user.texture = loadImage('assets/images/fisherman.png');
    fishTextureL = loadImage('assets/images/GuppyL.png');
    fishTextureR = loadImage('assets/images/GuppyR.png');
    evilTextureL = loadImage('assets/images/CarnivoreL.png');
    evilTextureR = loadImage('assets/images/CarnivoreR.png');
}

/** Set important variables correctly, create the fish and position the boat*/
function setup() {
    width = windowWidth * 0.98;
    height = windowHeight * 0.92;
    createCanvas(width, height);
    user.boat.w = 0.15625 * width;
    user.boat.h = user.boat.w / 2;
    user.hook.size = 3.90635E-3 * width;
    fishHookSpeed = 1.5625E-3 * width;
    waterSurface = height * (1 - waterRatio);
    user.boat.y = waterSurface - (user.boat.h * 0.8);
    user.hook.y = user.boat.y + (user.boat.h / 2);
    textSize(0.02 * width);
    textAlign(LEFT, TOP);
    // Create the initial fish and add them to the school array
    for (let i = 0; i < schoolSize - 2; i++) {
        school.push(createFish(random(0, width), random(waterSurface, height), 0));
    }
    for (let i = 0; i < evilSchoolSize; i++) {
        school.push(createFish(random(0, width), random(waterSurface, height), 1));
    }
}

/** draws and generates the correct animation depending on the simulation state */
function draw() {
    //draw the boat and the water
    background('lightblue');
    image(user.texture, user.boat.x, user.boat.y, user.boat.w, user.boat.h);
    fill(0, 0, 100);
    rect(0, waterSurface, width, height * waterRatio);
    //draw the animation depending on the simulation state
    if (state === `title`) {
        title();
    } else if (state === `simulation`) {
        simulation();
    } else if (state === `win`) {
        win();
    } else if (state === 'loss') {
        loss();
    }
}

/** displays the initial state and the instructions */
function title() {
    push();
    textAlign(CENTER, CENTER);
    fill('lightblue');
    textSize(0.04 * width);
    text(`Age of Aquariums\n\nAD/Arrow Keys to move\nPress space to lower hook & reel fish in\nClick to start or add fish to the aquarium`, width / 2, height / 2);
    pop();
    if (mouseIsPressed) {
        state = `simulation`;
    }
}

/** continues the animation after the player has won */
function win() {
    //animate and draw fish
    for (let fish of school) {
        moveFish(fish);
        displayRotatingFish(fish);
    }
    push();
    textAlign(CENTER, TOP);
    textSize(0.02 * width);
    text(`You caught enough fish, now sit back and relax.\nClick to add more fishies`, width / 2, 0.01 * height);
    pop();
}

/** continues the animation after the player has lost */
function loss() {
    //animate and draw fish
    for (let fish of school) {
        moveFish(fish);
        displayRotatingFish(fish);
    }
    push();
    textAlign(CENTER, TOP);
    textSize(0.02 * width);
    text(`You caught a carnivore what are you doing??\nenough fishing for today..\nClick to add fishies`, width / 2, 0.01 * height);
    pop();
}

/** controls the simulation, the state when the user is fishing*/
function simulation() {
    //draw background
    if (user.score >= 20) {
        state = 'win';
        state = 'win';

    }
    keyMovement();
    //animate and draw fish
    for (let fish of school) {
        moveFish(fish);
        displayRotatingFish(fish);
    }
    controlBoatHook();
    text(`Fishies caught: ${user.score}`, 0, 0.01 * height);
}

/** Display the hook and control actions related to it */
function controlBoatHook() {
    push();
    strokeWeight(user.hook.size / 2);
    stroke("white");
    //detect if a fish is touching the hook and catch it if it is
    for (let fish of school) {
        if (!user.hook.busy && (dist(user.hook.xOrigin, user.hook.y, fish.x, fish.y) < (fish.size / 2 + user.hook.size / 2))) {
            user.hook.busy = fish.caught = true;
            console.log('caught');
        }
    }
    //draw the hook when it hasn't grabbed a fish
    if (!user.hook.busy) {
        line(user.hook.xOrigin, user.boat.y + (user.boat.h * 0.15), user.hook.xOrigin, user.hook.y - user.hook.size / 2);
        noStroke();
        fill('red');
        ellipse(user.hook.xOrigin, user.hook.y, user.hook.size);
    } else {
        for (let i = school.length - 1; i >= 0; i--) {
            //draw the hook stuck to the fish if it's caught one and execute the correct actions 
            if (school[i].caught) {
                line(user.hook.xOrigin, user.boat.y + (user.boat.h * 0.15), school[i].x, school[i].y);
                //reel the fish in if he's on the hook
                if (keyIsDown(32)) {
                    let angle = atan2(user.hook.xOrigin - school[i].x, user.hook.yOrigin - school[i].y);
                    school[i].vx = fishHookSpeed * sin(angle);
                    school[i].vy = fishHookSpeed * cos(angle);
                }
                //remove the fish and free the hook if the user has reeled it in, add 1 to the score
                if (dist(user.hook.xOrigin, user.hook.yOrigin, school[i].x, school[i].y) < user.hook.size) {
                    user.hook.y = user.hook.yOrigin;
                    user.hook.busy = false;
                    //lose if its a carnivore
                    if (school[i].type === 1) {
                        state = 'loss';
                    }
                    user.score++;
                    school.splice(i, 1);
                }
            }
        }
    }
    pop();
}

/** creates a fish at the desired position with random size, speed and odds to change direction
 * @param x horizontal position for the fish to be created
 * @param y vertical position for the fish to be created
 * 
 * @returns a new fish */
function createFish(x, y, type) {
    let fish = {
        x: x,
        y: y,
        size: random(9.765E-3 * width, 0.03 * width),
        vx: 0,
        vy: 0,
        speed: random(5.86E-4 * width, fishHookSpeed),
        changeRate: random(0.5, 5),
        caught: false,
        type: type
    };
    return fish;
}

/** animate the fish, make them go in random directions, constrain them to the canvas and to the water */
function moveFish(fish) {
    // Choose whether to change direction
    if (fish.y > waterSurface) {
        let change = random(0, 100);
        if (change < fish.changeRate) {
            fish.vx = random(-fish.speed, fish.speed);
            fish.vy = random(-fish.speed, fish.speed);
        }
    }
    // Move the fish
    fish.x = fish.x + fish.vx;
    fish.y = fish.y + fish.vy;
    // Constrain the fish to the canvas
    if (fish.x < fish.size / 2 || fish.x > width - (fish.size / 2)) {
        fish.vx *= -0.5;
        fish.x = constrain(fish.x, fish.size / 2, width - (fish.size / 2));
    }
    if (fish.y < fish.size / 2 || fish.y > height - (fish.size / 2)) {
        fish.vy *= -0.5;
        fish.y = constrain(fish.y, fish.size / 2, height - (fish.size / 2));
    }
    // Gravitational effect if the fish get out of the water
    if (fish.y < waterSurface) {
        fish.vy += 3.90625E-5 * width;
    }
}

/** display the fish pointing in the direction of his movement */
function displayRotatingFish(fish) {
    // calculate the fish's angle and rotate it
    push();
    let angle = atan2(fish.vy, fish.vx);
    translate(fish.x, fish.y);
    rotate(angle);
    // display the correct image depending on its direction
    if (fish.vx < 0) {
        rotate(135);
        if (fish.type === 0) {
            image(fishTextureL, -fish.size / 2, -fish.size / 2, fish.size, fish.size);
        } else {
            image(evilTextureL, -fish.size / 2, -fish.size / 2, fish.size, fish.size);
        }
    } else {
        if (fish.type === 0) {
            image(fishTextureR, -fish.size / 2, -fish.size / 2, fish.size, fish.size);
        } else {
            image(evilTextureR, -fish.size / 2, -fish.size / 2, fish.size, fish.size);
        }
    }
    pop();
}

/** spawn fish at mouse position on click */
function mousePressed() {
    if (state === 'simulation' || 'win' || 'loss') {
        school.push(createFish(mouseX, mouseY, 0));
    }
}

/** Allows the user to control the player's speed with accelerations,
 *  using the arrow keys or WASD
 *  adaptation of the keyMovement function in project 1 */
function keyMovement() {
    //horizontal movement
    if ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) {
        user.boat.vx += user.boat.accelX;
    } else if (keyIsDown(37) && !keyIsDown(39) || (keyIsDown(65) && !keyIsDown(68))) {
        user.boat.vx -= user.boat.accelX;
    } else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39)) || (keyIsDown(65) && keyIsDown(68))) {
        if (abs(user.boat.vx) > (user.boat.maxSpeed * 0.01)) {
            user.boat.vx /= 1.03;
        } else {
            user.boat.vx = 0;
        }
    }
    //lower hook with the space bar and release to raise it
    if (keyIsDown(32) && !user.hook.busy) {
        user.hook.y += fishHookSpeed;
    } else if (!keyIsDown(32) && !user.hook.busy && user.hook.y > user.hook.yOrigin) {
        user.hook.y -= fishHookSpeed;
    }
    // constrain boat to window
    if (user.boat.x < 0 || user.boat.x > width - user.boat.w) {
        user.boat.vx *= -0.5;
        user.boat.x = constrain(user.boat.x, 0, width - user.boat.w);
    }
    //move boat
    user.boat.x += user.boat.vx;
    user.hook.xOrigin = user.boat.x + (user.boat.w * 0.83);
    user.hook.yOrigin = user.boat.y + (user.boat.h / 2);
}