/** Project 1: The clownapping
 * @author Nicolas Morales-Sanabria
 * 
 * This is a simulation where clown & clownette get kidnapped by aliens, they are sent to the "clowniseum"
 * and the clown (the user) must survive 20 rounds to save clownette. It begins with an animation and then
 * jumps into a playable survival game where the user must shoot and protect himself from evil clowns. The player
 * controls the clown with keys and mouse. If the clown dies the user is prompted to restart, otherwise they
 * are congratulated for saving clownette. 
 * this project uses Ben Moren's p5.collide2D library. */
"use strict";
//used to always have a similar gameplay area no matter the screen ratio/dimensions
let heightRatio = 0.513671875;
//represents the user
let user, userTexture;
//projectile arrays and fire rates
let userProjectiles = [], enemyProjectiles = [], userFireRate = 0, enemyFireRate = 60;
//camera offsets used to follow the user
let cameraOffsetX = undefined, cameraOffsetY = undefined;
//represent various simlulation elements
let restart = false;
let clowniseumTexture, evilClownTexture;
let evilClowns = [], wave = 1;
let walls = [], wallWidth;
let titleAliens = [], topAliens = [], bottomAliens = [], leftAliens = [], rightAliens = [];
//variables used to correctly execute different states of the simulation
let state = `title`;
let titleFirstFrame = true, simulationFirstFrame = true;
//variables used for the beginning animation
let titleClownMovement = 0, titleFinalMovement = 0, titleAliensMovement = 0, titleAliensTimer = 0, titleBeginningSpeed, titleFinalSpeed, titleAlienSpeed, gameplayDialogue;
//represents the animation Clown & Clownette
let titleClown = {
    x: 0,
    y: 0,
    size: 250,
    texture: undefined
}, titleClownette = {
    x: 0,
    y: 0,
    size: 250,
    texture: undefined
};

/** Loads the textures/images used in the simulation*/
function preload() {
    EvilClown.texture = loadImage('assets/images/evilClown.png');
    clowniseumTexture = loadImage('assets/images/clowniseum.png');
    userTexture = loadImage('assets/images/clown.png');
    titleClown.texture = loadImage('assets/images/clown.png');
    titleClownette.texture = loadImage('assets/images/clownette.png');
}

/** sets up the critical variables, settings or executes the necessary actions in order to correctly launch the simulation */
function setup() {
    console.log(`Window width: ${width}, Window height: ${height}`);
    width = windowWidth * 0.98;
    height = windowHeight * 0.94;
    createCanvas(width, height);
    user = new Player(width / 2, height / 2, width * 0.039, width * 7.8125E-5, (width * 1.953125E-3) * 2);
    user.texture = userTexture;
    Alien.size = width / 3;
    createAliens();
    wallWidth = width / 20;
    createWalls();
    noStroke();
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
}

/** sets up the critical variables in order to correctly run the title state of the simulation */
function titleSetup() {
    titleBeginningSpeed = width * 7.824726E-4;
    titleFinalSpeed = height * 1.801801802E-3;
    titleAlienSpeed = height * 1.171875E-3 / 2.8;
    titleClownette.size = titleClown.size = height / 4;
    titleClownette.y = titleClown.y = height - titleClown.size / 2;
    titleFirstFrame = false;
    simulationFirstFrame = true;
}

/** sets up the critical variables in order to correctly run the gameplay state of the simulation */
function gameplaySetup() {
    //Reset the game to its initial state if restarting
    if (restart) {
        user.health = 100;
        user.x = width / 2;
        user.y = height / 2;
        wave = 1;
        evilClowns = [];
        enemyProjectiles = [];
        restart = false;
    }
    //Start the first wave and variables
    generateEvilClowns(1);
    gameplayDialogue = 0;
    Alien.size = 0.09765625 * width;
    simulationFirstFrame = false;
    titleFirstFrame = true;
}

/** Ensures the aliens are always being animated and draws/runs the correct state of the simulation accoding the application's state */
function draw() {
    Alien.alienAnimation();
    if (state === `title`) {
        title();
    } else if (state === `gameplay`) {
        gameplay();
    } else if (state === `loss`) {
        loss();
    } else if (state === `win`) {
        win();
    }
}

/** runs the 'title' of the simulation, where the beginning animation is set up and automatically plays, can be skipped by clicking */
function title() {
    if (titleFirstFrame) {
        titleSetup(); //adjusts variables to correctly run
    }
    //plays the animation
    background(0);
    beginningAnimation();
    if (mouseIsPressed) {
        state = `gameplay`;
    }
}

/** runs the 'gameplay' part of the simulation, where the user can interact, move, shoot, etc. inside the game area*/
function gameplay() {
    if (simulationFirstFrame) {
        gameplaySetup(); //adjusts variables to correctly run
    }
    //runs the gameplay
    if (evilClowns.length === 0) {
        generateEvilClowns(wave + 1);
        wave++;
        if (wave >= 21) {
            state = 'win';
        }
    }
    //runs the necessary functions for the gameplay
    background(0);
    user.keyMovement();
    collisions();
    displayObjects();
    projectileManagement();
    userHealthManagement();
    for (let evilClown of evilClowns) {
        evilClown.chaseFleeTarget(user, 1);
    }
}

/** displays the loss state/text of the simulation, opting to restart it */
function loss() {
    restart = true;
    simulationFirstFrame = true;
    background(0);
    textSize(0.025 * width);
    fill('red');
    text(`You died at wave ${wave}\n You couldn't save Clownette\npress "Enter" to restart`, width / 2, height / 2);
    if (keyIsDown(13)) {
        state = `gameplay`;
    }
}

/** displays the win state of the simulation and stops it */
function win() {
    //displays Clown & Clownette thanking you for playing
    background(0);
    fill('orange');
    text(`You survived the clownapping &\n saved Clownette!\n Thanks for playing`, width / 2, height / 2);
    titleClown.x = width / 3;
    titleClownette.x = (width / 3) * 2;
    titleClown.y = titleClownette.y = height - titleClown.size / 2;
    displayImage(titleClown, 0);
    displayImage(titleClownette, 0);
    noLoop();
}

/** creates projectiles at the request of the user (Space/LeftClick) or evil clowns in accordance to their angles, 
 * positions, fire rates and delays, also recalculates the projectile positions and draws them */
function projectileManagement() {
    //creates user projectiles with his position & angle if his fireRate delay has passed
    if (user.fireDelay > userFireRate && (keyIsDown(32) || (mouseIsPressed && mouseButton === LEFT))) {
        userProjectiles.push(new Projectile(user.x, user.y, width * 3.90625E-3, width * 7.8125E-3, user.angle));
        user.fireDelay = 0;
    }
    user.fireDelay++;
    //creates the projectiles of the evil clowns if they are close enough and their fireRate delay has passed 
    for (let evilClown of evilClowns) {
        if (evilClown.fireDelay > enemyFireRate && dist(evilClown.x, evilClown.y, user.x, user.y) < width / 2) {
            enemyProjectiles.push(new Projectile(evilClown.x, evilClown.y, width * 3.90625E-3, width * 7.8125E-3, evilClown.angle));
            evilClown.fireDelay = 0;
        }
        evilClown.fireDelay++;
    }
    //recalculates the positions and draws the projectiles
    fill('green');
    Projectile.moveDrawProjectiles(cameraOffsetX, cameraOffsetY, userProjectiles);
    fill('orange');
    Projectile.moveDrawProjectiles(cameraOffsetX, cameraOffsetY, enemyProjectiles);
}

/** displays all the objects of the simulation (user, walls, wall aliens & background)
 *  relative to the user, the image is centered on the user, with a speed effect (cameraOffsets) */
function displayObjects() {
    //calculates the 'camera' offset to center the player and draw everything relative to it
    cameraOffsetX = width / 2 - user.x + user.vx * 4;
    cameraOffsetY = height / 2 - user.y + user.vy * 4;
    //draw the outside wall aliens & game area texture
    drawWallAliens();
    image(clowniseumTexture, -width + cameraOffsetX, -width * heightRatio - wallWidth + cameraOffsetY, width * 3, width * heightRatio * 3 + (wallWidth * 2));
    //draws the user
    user.displayRotatingPlayer(cameraOffsetX, cameraOffsetY);
    for (let evilClown of evilClowns) {
        evilClown.displayRotatingClown(cameraOffsetX, cameraOffsetY, user);
    }
    //draws the walls
    for (let wall of walls) {
        fill('lime');
        displayImage(wall, 1);
    }
    //displays the current wave
    push();
    textAlign(LEFT, TOP);
    textSize(0.025 * width);
    fill(255, 0, 255);
    text(`Wave: ${wave}`, 0, 0);
    pop();
    //displays the intro text
    gameplayIntro();
}

/** Manages the display of the user's Health bar and its regeneration*/
function userHealthManagement() {
    //display the health bar
    let healthTransparency = map(user.health, 100, 0, 255, 0);
    fill(0, 0, 0, 150);
    rect(width / 2 - width * 0.1, height * 0.8, width * 0.2, height * 0.1);
    fill(0, 255, 0, healthTransparency);
    rect(width / 2 - width * 0.1, height * 0.8, width * 0.2 * (user.health / 100), height * 0.1);
    fill(255);
    textSize(0.025 * width);
    text(`HP: ${user.health}`, width / 2, height * 0.85);
    //+2 health if hurt, every ~1 second
    if (frameCount % 60 === 0 && user.health < 100) {
        user.health += 2;
    }
}

/** draws the aliens along the walls/game area */
function drawWallAliens() {
    //draws the top wall aliens
    for (let i = 0; i < topAliens.length; i++) {
        topAliens[i].x = -0.0125 * width - width / 20 - width + Alien.size * i + cameraOffsetX;
        topAliens[i].y = -width * heightRatio - Alien.size * 1.8 + cameraOffsetY;
        topAliens[i].drawAlien();
    }
    push();
    //draws the bottom wall aliens
    rotate(180);
    for (let i = 0; i < bottomAliens.length; i++) {
        bottomAliens[i].x = -0.0125 * width - width / 20 - width * 2 + Alien.size * i - cameraOffsetX;
        bottomAliens[i].y = -width * heightRatio * 2 - (wallWidth / 20) * 2 - Alien.size * 1.8 - cameraOffsetY;
        bottomAliens[i].drawAlien();
    }
    pop();
    //draws the right wall aliens
    push();
    rotate(90);
    for (let i = 0; i < rightAliens.length; i++) {
        rightAliens[i].x = -width * 9.765625E-3 - width * heightRatio + Alien.size * i + cameraOffsetY;
        rightAliens[i].y = -0.0125 * width * 2 - width / 20 - width * 2 - Alien.size - cameraOffsetX;
        rightAliens[i].drawAlien();
    }
    pop();
    //draws the left wall aliens
    push();
    rotate(-90);
    for (let i = 0; i < leftAliens.length; i++) {
        leftAliens[i].x = width * 9.765625E-3 + width * heightRatio - Alien.size - Alien.size * i - cameraOffsetY;
        leftAliens[i].y = -0.0125 * width * 2 - width / 20 - width - Alien.size + cameraOffsetX;
        leftAliens[i].drawAlien();
    }
    pop();
}

/** creates the outside walls/game area relative to the window width and places them into their array */
function createWalls() {
    //creates the walls
    let topWall = {
        x: -width,
        y: -width * heightRatio - wallWidth,
        w: width * 3,
        h: wallWidth,
        texture: clowniseumTexture
    }, bottomWall = {
        x: -width,
        y: width * heightRatio * 2,
        w: width * 3,
        h: wallWidth,
        texture: clowniseumTexture
    }, leftWall = {
        x: -width - wallWidth,
        y: -width * heightRatio - wallWidth,
        w: wallWidth,
        h: width * heightRatio * 3 + (wallWidth * 2),
        texture: clowniseumTexture
    }, rightWall = {
        x: width * 2,
        y: -width * heightRatio - wallWidth,
        w: wallWidth,
        h: width * heightRatio * 3 + (wallWidth * 2),
        texture: clowniseumTexture
    };
    //adds the walls to their array
    walls.push(topWall, bottomWall, leftWall, rightWall);
}

/** creates aliens of the beginning animation,
 *  also creates the aliens to place along the outside walls */
function createAliens() {
    //creates the aliens for the title animation
    for (let i = 0; i < 3; i++) {
        titleAliens.push(new Alien(Alien.size * i, height));
    }
    //creates the aliens for the top/bottom game area walls
    for (let i = 0; i < 32; i++) {
        topAliens.push(new Alien(0, 0));
        bottomAliens.push(new Alien(0, 0));
    }
    //creates the aliens for the left/right game area walls
    for (let i = 0; i < 16; i++) {
        leftAliens.push(new Alien(0, 0));
        rightAliens.push(new Alien(0, 0));
    }
    console.log(`aliens created`);
}

/** detects collisions between walls and clowns to bring/bounce him back into the game area,
 * also detects collisions with the projectiles and removes them if they hit a wall or a clown */
function collisions() {
    for (let wall of walls) {
        //collisions between walls and the user
        wallBounce(wall, user);
        //collisions between walls and any evil clown
        for (let evilClown of evilClowns) {
            wallBounce(wall, evilClown);
        }
    }
    //detects any user projectile hitting a clown
    for (let i = userProjectiles.length - 1; i >= 0; i--) {
        for (let j = evilClowns.length - 1; j >= 0; j--) {
            if (collideCircleCircle(evilClowns[j].x, evilClowns[j].y, evilClowns[j].size, userProjectiles[i].x, userProjectiles[i].y, userProjectiles[i].size)) {
                evilClowns[j].health -= 25;
                if (evilClowns[j].health <= 0) {
                    evilClowns.splice(j, 1);
                }
                userProjectiles.splice(i, 1)
                break;
            }
        }
    }
    //detects any enemy projectile hitting the user
    for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
        if (collideCircleCircle(user.x, user.y, user.size, enemyProjectiles[i].x, enemyProjectiles[i].y, enemyProjectiles[i].size)) {
            user.health -= 5;
            if (user.health <= 0) {
                state = 'loss';
            }
            enemyProjectiles.splice(i, 1);
        }
    }
    //detects any user projectile hitting a wall
    for (let i = userProjectiles.length - 1; i >= 0; i--) {
        for (let wall of walls) {
            if (collideRectCircle(wall.x, wall.y, wall.w, wall.h, userProjectiles[i].x, userProjectiles[i].y, userProjectiles[i].size)) {
                userProjectiles.splice(i, 1);
                break;
            }
        }
    }
    //detects any enemy projectile hitting a wall
    for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
        for (let wall of walls) {
            if (collideRectCircle(wall.x, wall.y, wall.w, wall.h, enemyProjectiles[i].x, enemyProjectiles[i].y, enemyProjectiles[i].size)) {
                enemyProjectiles.splice(i, 1);
                break;
            }
        }
    }
}

/** makes an object bounce off of a wall, repositionintg it so it doesn't get stuck inside &
 * changing its speed to make it 'bounce' off in the correct direction*/
function wallBounce(wall, object) {
    if (collideRectCircle(wall.x, wall.y, wall.w, wall.h, object.x, object.y, object.size)) {
        // top wall
        if ((object.x > wall.x && object.x < wall.x + wall.w) && (object.y > wall.y + wall.h)) {
            object.y = wall.y + wall.h + object.size / 2;
            object.vy *= -0.9;
        }
        //bottom wall
        if ((object.x > wall.x && object.x < wall.x + wall.w) && (object.y < wall.y)) {
            object.y = wall.y - object.size / 2;
            object.vy *= -0.9;
        }
        //left wall
        if ((object.y > wall.y && object.y < wall.y + wall.h) && (object.x > wall.x + wall.w)) {
            object.x = wall.x + wall.w + object.size / 2;
            object.vx *= -0.9;
        }
        //right wall
        if ((object.y > wall.y && object.y < wall.y + wall.h) && (object.x < wall.x)) {
            object.x = wall.x - object.size / 2;
            object.vx *= -0.9;
        }
    }
}

/** easily display images instead of shapes
 *  this function is reused from my "Love Actually" exercise
 * @param obj object to be drawn
 * @param type type or case of object to be drawn
 * @param specialTexture a specific texture to be used (for type 2) */
function displayImage(obj, type, specialTexture) {
    switch (type) {
        case 0: //adjust to draw instead of an ellispe (centered)
            image(obj.texture, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
            break;
        case 1: //adjust to draw instead of a square (corner)
            image(obj.texture, obj.x + cameraOffsetX, obj.y + cameraOffsetY, obj.w, obj.h);
            break;
        case 2: //adjust to draw instead of an ellispe but using a predefined texture
            image(specialTexture, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
            break;
        default: //invalid type
            console.log("DisplayImage Wrong type bud: " + type);
            break;
    }
}

/** generates a set amount of evil clowns outside the user's personal space.
 * the clowns will each have a random position outside the user's view */
function generateEvilClowns(wave) {
    for (let i = 0; i < ((wave) * 2); i++) {
        let tempPos = {
            x: random(0, width),
            y: random(0, height)
        } //ensure the clowns spawn inside the game area but outside the user's screen
        while (dist(user.x, user.y, tempPos.x, tempPos.y) < width / 2 + user.size) {
            tempPos.x = random(-width + user.size / 2, width * 2 - user.size / 2);
            tempPos.y = random(-width * heightRatio + user.size / 2, width * heightRatio * 2 - user.size / 2);
        }
        evilClowns.push(new EvilClown(tempPos.x, tempPos.y, user.size, user.accelX / 2, user.maxSpeed));
    }
}

/** displays the controls & the initial simulation dialogue */
function gameplayIntro() {
    if (gameplayDialogue < 255 * 5) {
        textSize(0.025 * width);
        let reversedGameplayDialogue;
        if (gameplayDialogue < 255) {
            reversedGameplayDialogue = map(gameplayDialogue, 0, 255, 255, 0);
            fill(255, 255, 255, reversedGameplayDialogue);
            text("WASD/Arrow Keys to move\nSpace/Left click to shoot mucus", width / 2, height / 4);
        } else if (gameplayDialogue > 255 && gameplayDialogue < 255 * 2) {
            reversedGameplayDialogue = map(gameplayDialogue, 255, 255 * 2, 255, 0);
            fill(255, 165, 0, reversedGameplayDialogue);
            text("What have you done to these poor clowns..\n and why are they so HD?", width / 2, height / 4);
        } else if (gameplayDialogue > 255 * 2 && gameplayDialogue < 255 * 3) {
            reversedGameplayDialogue = map(gameplayDialogue, 255 * 2, 255 * 3, 255, 0);
            fill(255, 150, 255, reversedGameplayDialogue);
            text("Allie:\n I forgot to feed them this week...\nOopsie!", width / 2, height / 4);
        } else if (gameplayDialogue > 255 * 3 && gameplayDialogue < 255 * 4) {
            reversedGameplayDialogue = map(gameplayDialogue, 255 * 3, 255 * 4, 255, 0);
            fill(0, 255, 255, reversedGameplayDialogue);
            text("Alionso:\nWe'll free you & clownette if you entertain us enough", width / 2, height / 4);
        } else if (gameplayDialogue > 255 * 4 && gameplayDialogue < 255 * 5) {
            reversedGameplayDialogue = map(gameplayDialogue, 255 * 4, 255 * 5, 255, 0);
            fill(105, 255, 105, reversedGameplayDialogue);
            text("Allen:\nK, Beat 20 waves and we'll let you go", width / 2, height / 4);
        }
        gameplayDialogue++;
    }
}

/** generates the beginning animation where Clown & Clownette are interrupted and then kidnapped by Allie, Allen & Alionso */
function beginningAnimation() {
    //displays Allie, Allen & Alionso
    for (let alien of titleAliens) {
        alien.drawAlien();
    }
    //Displays the project title at the beginning
    let gameTitleColor = map(titleClownMovement, 0, 255, 255, 0);
    if (gameTitleColor > 0) {
        fill(255, gameTitleColor, gameTitleColor, gameTitleColor);
        textSize(0.025 * width);
        text(`Project 1: \n The clownapping`, width / 2, height / 2);
    }
    // Displays clown & clownette moving to the center & talking to eachother
    textSize(0.0125 * width);
    if (titleClownMovement < width / 3) {
        fill(255, 0, 255);
        if (titleClownMovement < (width / 3) / 3) {
            text("Why did the clown go to the doctor?\n he was feeling a bit funny!", titleClownMovement + width / 3, height * (11 / 16));
        } else if ((titleClownMovement > (width / 3) / 3) && titleClownMovement < width / 3 - (width / 3) / 3) {
            text("You really bring out the circus in me!\nUwU", titleClownMovement + width / 3, height * (11 / 16));
        } else if ((titleClownMovement > width / 3 - (width / 3) / 3) && titleClownMovement < width / 3) {
            fill('orange');
            text("haha babe you're so funny..\n you're like a joke!", titleClownMovement, height * (11 / 16));
        }
        titleClown.x = titleClownMovement;
        titleClownette.x = titleClownMovement + width / 3;
        titleClownMovement += titleBeginningSpeed;
    } else if (titleAliensMovement < Alien.size * 0.8) {
        //Animates the aliens to move up and say their initial lines 
        for (let alien of titleAliens) {
            alien.y = height - Alien.size / 2 - titleAliensMovement;
            titleAliensMovement += titleAlienSpeed;
        }
        if (titleAliensMovement < Alien.size * 0.8 / 3) {
            textSize(0.015625 * width);
            fill(255, 150, 255);
            text("Allie:\nAlors on danse!", (width / 3) / 2, height - titleAliensMovement - Alien.size * 0.1);
        } else if ((titleAliensMovement > Alien.size * 0.8 / 3) && titleAliensMovement < 2 * Alien.size * 0.8 / 3) {
            fill(105, 255, 105);
            text("Allen:\nWhy didn't you tell me they had\nsuch good music here earlier!", 2 * width / 3 - Alien.size / 2, height - titleAliensMovement - Alien.size * 0.1);
        } else if ((titleAliensMovement > 2 * Alien.size * 0.8 / 3)) {
            fill(0, 255, 255);
            text("Alionso:\nWhat do we have here,\n a couple of clowns?", width - Alien.size / 2, height - titleAliensMovement - Alien.size * 0.1);
        }
    } else {
        // Animates the final exchange between the aliens & the clowns
        if (titleAliensTimer < 255 * 2.5) {
            titleAliensTimer++;
        }
        if (titleAliensTimer < 255 * 2) {
            if (titleAliensTimer < 255 / 4) {
                fill('orange');
                text("A couple of clowns\nlol", titleClownMovement, height * (11 / 16));
                fill(255, 0, 255);
                text("A couple of clowns\nlol", titleClownMovement + width / 3, height * (11 / 16));
            }
            fill(255, 150, 255, titleAliensTimer);
            text("They're so cute!", (width / 3) / 2, height - titleAliensMovement - Alien.size * 0.1);
            fill(105, 255, 105, titleAliensTimer - (255 / 2));
            text("Bro she looks drawn on MS paint", 2 * width / 3 - Alien.size / 2, height - titleAliensMovement - Alien.size * 0.1);
            fill(0, 255, 255, titleAliensTimer - (255));
            text("Let's take them to the clowniseum", width - Alien.size / 2, height - titleAliensMovement - Alien.size * 0.1);
        }
        if (titleAliensTimer > 255 * 2 && titleAliensTimer < 255 * 2.5) {
            fill('orange');
            text("the clowniseum???", titleClownMovement, height * (11 / 16));
            fill(255, 0, 255);
            text("the clowniseum???", titleClownMovement + width / 3, height * (11 / 16));
        } else if (titleAliensTimer > 255 * 2.5) {
            // Animates the horrible kidnapping of the clowns by aliens
            if (titleFinalMovement < height / 2 + Alien.size / 3) {
                fill(255, 150, 255);
                text("Muahahahaha", (width / 3) / 2, titleFinalMovement + height - titleAliensMovement - Alien.size * 0.1);
                fill(105, 255, 105);
                text("Muahahahaha", 2 * width / 3 - Alien.size / 2, titleFinalMovement + height - titleAliensMovement - Alien.size * 0.1);
                fill(0, 255, 255);
                text("Muahahahaha", width - Alien.size / 2, titleFinalMovement + height - titleAliensMovement - Alien.size * 0.1);
                fill('orange');
                text("Noooooo", titleClownMovement, titleFinalMovement + height * (11 / 16));
                fill(255, 0, 255);
                text("Noooooo", titleClownMovement + width / 3, titleFinalMovement + height * (11 / 16));
                titleFinalMovement += titleFinalSpeed;
                titleClownette.y = titleClown.y += titleFinalSpeed;
                for (let alien of titleAliens) {
                    alien.y += titleFinalSpeed;
                }
            } else {
                // runs the gameplay part of the simulation after the final animation is over
                state = `gameplay`;
            }
        }
    }
    //displays Clown & Clownette
    displayImage(titleClown, 0);
    displayImage(titleClownette, 0);
}