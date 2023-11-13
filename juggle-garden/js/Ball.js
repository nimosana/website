/** Ball class
 * @author Nicolas Morales-Sanabria
 * Allows the creation, display and control of balls (displayed as clowns) that move around
 * and can bounce on paddles */
class Ball {
    /** creates a new ball object, at the desired position
     * @param x the position in x for the ball
     * @param y the position in y for the ball */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.sign(random(-1, 1)) * (width * 2.3474E-3);
        this.vy = 0;
        this.ax = width * 7.82473E-4;
        this.maxspeed = width * 0.0352;
        this.size = width * 0.03123;
    }

    /** move the ball, constrain it to the window and check if it scores */
    move() {
        //move and constrain to window if out of bounds
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        this.constrainToWindow();
        // check if a player lost the round
        if (this.x > width) {
            //increase score & setup for inbetween rounds
            clong.score1++;
            clong.lastRoundWinner = 1;
            clong.roundEnded = true;
            clong.state = `waiting`;
            if (clong.score1 === 3) {
                clong.score1 = clong.score2 = 0;
                clong.wins1++;
                clong.state = `endGame`;
            }
        } else if (this.x < 0) {
            //increase score & setup for inbetween rounds
            clong.score2++;
            clong.lastRoundWinner = 2;
            clong.roundEnded = true;
            clong.state = `waiting`;
            if (clong.score2 === 3) {
                clong.score1 = clong.score2 = 0;
                clong.wins2++;
                clong.state = `endGame`;
            }
        }
    }

    /** constrain to window and invert its speed to make it "bounce" if going out of the window */
    constrainToWindow() {
        if (this.y > height - this.size / 2) {
            this.y = height - this.size / 2;
            this.vy *= -1;
        } else if (this.y < this.size / 2) {
            this.y = 0 + this.size / 2;
            this.vy *= -1;
        }
    }

    /** make the ball bounce on the paddles */
    bounce(paddle) {
        let dx = this.y - paddle.y - paddle.height / 2;
        if (paddle.player === 1) { //left (cyan paddle)
            if (collideRectCircle(paddle.x, paddle.y, paddle.width, paddle.height, this.x, this.y, this.size)) {
                //make it bounce and accelerate the ball
                this.x = paddle.x + paddle.width + this.size / 2;
                this.vx *= -1;
                if (abs(this.vx) < this.maxspeed) {
                    this.vx += this.ax;
                }
                // give it a vertical speed according to the angle of the ball & center of the paddle
                this.vy = this.vy + map(dx, -paddle.height / 2, paddle.height / 2, -2, 2);
            }
        } else if (paddle.player === 2) { //right (red paddle)
            if (collideRectCircle(paddle.x, paddle.y, paddle.width, paddle.height, this.x, this.y, this.size)) {
                //make it bounce and accelerate the ball
                this.x = width - paddle.width - this.size / 2;
                this.vx *= -1;
                if (abs(this.vx) < this.maxspeed) {
                    this.vx -= this.ax;
                }
                // give it a vertical speed according to the angle of the ball & center of the paddle
                this.vy = this.vy + map(dx, -paddle.height / 2, paddle.height / 2, -2, 2);
            }
        }
    }

    /** display the ball at its position */
    display() {
        image(imageBalls, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

}