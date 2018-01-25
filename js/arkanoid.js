const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

class Ball {
    constructor(radius, {positionX = radius, positionY = radius} = {}, {velocityX = 0.5, velocityY = 20} = {}) {
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.nextX = velocityX;
        this.nextY = velocityY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.stroke();
    }

    move() {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.draw();


        this.positionX += this.nextX;
        this.positionY += this.velocityY;

        const collisionBottomY = this.positionY + this.nextY > canvas.height,
            collisionTopY = this.nextY + this.positionY < 0,
            collisionY = collisionBottomY || collisionTopY,
            collisionBottomX = this.positionX + this.velocityX > canvas.width,
            collisionTopX = this.velocityX + this.positionX < 0,
            collisionX = collisionBottomX || collisionTopX;



        if (collisionY) {
            this.velocityY = -this.velocityY;
        }
        if (collisionX) {
            this.nextX = -this.velocityX;
        }



            window.requestAnimationFrame(this.move.bind(this));


    }
}

const myBall = new Ball(30, {
    positionY: 30,
    positionX: 50
});
myBall.draw();
window.requestAnimationFrame(myBall.move.bind(myBall));