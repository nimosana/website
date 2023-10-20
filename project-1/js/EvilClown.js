/** Evil Clown class
 * @author Nicolas Morales-Sanabria
 * Allows the creation of evil clowns with a shared texture that can move around chasing other objects,
 * and rotate following the mouse */
class EvilClown {
    static texture = undefined;

    /** Creates an evil clown object at the desired position, with the desired size, acceleration & max speed
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
        this.angle;
        this.fireDelay = 0;
        this.health = 100;
    }

    /** calculates the angle between the clown & the target and draws him rotated, taking into account any camera offset
     * @param cameraOffsetX any horizontal offset to take into account to draw
     * @param cameraOffsetY any vertical offset to take into account to draw */
    displayRotatingClown(cameraOffsetX, cameraOffsetY, target) {
        push();
        this.angle = atan2(target.y - this.y - (user.vy * 4), target.x - this.x - (user.vx * 4));
        translate(this.x + cameraOffsetX, this.y + cameraOffsetY);
        rotate(this.angle - 90);
        this.displayImageForRotation();
        pop();
    }

    /** displays the clown's texture to remain centered even if rotated*/
    displayImageForRotation() {
        image(EvilClown.texture, -this.size / 2, -this.size / 2, this.size, this.size);
    }

    /**compares positions of the clown & their target & affects their accel/speed to chase or flee the target
     * this function is taken from my "Love actually" exercise"
     * @param  target the target object
     * @param  usage 1 to  chase, -1 to flee */
    chaseFleeTarget(target, usage) {
        //horizontal movement - detect direction change & affect speed
        let directionX = usage * Math.sign(target.x - this.x);
        let accelX = directionX * this.accelX;
        this.vx += accelX;
        //limit speed to max speed then move
        if (abs(this.vx) > abs(this.maxSpeed)) {
            this.vx = this.maxSpeed * directionX;
        }
        this.x += this.vx;
        //vertical movement - detect direction change & affect speed
        let directionY = usage * Math.sign(target.y - this.y);
        let accelY = directionY * this.accelY;
        this.vy += accelY;
        //limit speed to max speed then move
        if (abs(this.vy) > abs(this.maxSpeed)) {
            this.vy = this.maxSpeed * directionY;
        }
        this.y += this.vy;
    }
}