/** Player class
 * @author Nicolas Morales-Sanabria
 * Allows the creation and control of a user with a texture that can move around with keys,
 * and rotate following the mouse */
class Player {

    /** Creates a Player object at the desired position, with the desired size, acceleration & max speed
     * @param  x desired horizontal position
     * @param  y desired vertical position
     * @param  size desired size
     * @param  accel desired acceleration
     * @param  maxSpeed desired max speed */
    constructor(x, y, size, accel, maxSpeed) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = size;
        this.accelX = this.accelY = accel;
        this.maxSpeed = maxSpeed;
        this.speed = 0;
        this.texture = undefined;
        this.angle;
        this.fireDelay = 0;
        this.health = 100;
    }

    /** Allows the user to control the player's speed with accelerations,
     *  using the arrow keys or WASD*/
    keyMovement() {
        //horizontal movement
        if ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) {
            this.vx += this.accelX;
        } else if (keyIsDown(37) && !keyIsDown(39) || (keyIsDown(65) && !keyIsDown(68))) {
            this.vx -= this.accelX;
        } else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39)) || (keyIsDown(65) && keyIsDown(68))) {
            if (abs(this.vx) > (this.maxSpeed * 0.01)) {
                this.vx /= 1.03;
            } else {
                this.vx = 0;
            }
        }
        //vertical movement
        if ((keyIsDown(38) && !keyIsDown(40)) || (keyIsDown(87) && !keyIsDown(83))) {
            this.vy -= this.accelY;
        } else if (keyIsDown(40) && !keyIsDown(38) || (keyIsDown(83) && !keyIsDown(87))) {
            this.vy += this.accelY;
        } else if ((!keyIsDown(40) && !keyIsDown(38)) || (keyIsDown(40) && keyIsDown(38)) || (keyIsDown(83) && keyIsDown(87))) {
            if (abs(this.vy) > (this.maxSpeed * 0.01)) {
                this.vy /= 1.03;
            } else {
                this.vy = 0;
            }
        }
        //limit to max speed
        this.speed = sqrt(pow(this.vx, 2) + pow(this.vy, 2));
        if (this.speed > this.maxSpeed) {
            this.vx *= (this.maxSpeed / this.speed);
            this.vy *= (this.maxSpeed / this.speed);
        }
        //move obj
        this.x += this.vx;
        this.y += this.vy;
        // console.log(`spd X: ${this.vx} spd Y: ${this.vy}`);
    }

    /** calculates the angle between the user and draws him rotated, taking into account any offset of the user (ie. from the middle of the screen)
     * @param cameraOffsetX any horizontal offset to take into account to draw the user
     * @param cameraOffsetY any vertical offset to take into account to draw the user */
    displayRotatingPlayer(cameraOffsetX, cameraOffsetY) {
        push();
        this.angle = atan2(mouseY - windowHeight / 2 - (user.vy * 4), mouseX - windowWidth / 2 - (user.vx * 4));
        translate(user.x + cameraOffsetX, user.y + cameraOffsetY);
        rotate(this.angle - 90);
        this.displayImageForRotation();
        pop();
        // console.log(`User angle: ${angle}`)
    }

    /** displays the user's texture to remain centered even if rotated*/
    displayImageForRotation() {
        image(this.texture, -this.size / 2, -this.size / 2, this.size, this.size);
    }
}