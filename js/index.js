const canvas = document.getElementById('canvas'),
    startButton = document.getElementById('start-button'),
    stopButton = document.getElementById('stop-button'),
    yInput = document.getElementById('y-velocity'),
    xInput = document.getElementById('x-velocity'),
    ctx = canvas.getContext('2d');

class Ball {
    constructor(radius, {positionX = radius, positionY = radius} = {}) {
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;
        this.velocityX = null;
        this.velocityY = null;
        this.ref = null;
    }

    setVelocity({velocityX = 10, velocityY = 10} = {}) {
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.nextX = velocityX;
        this.nextY = velocityY;
        console.log(this.velocityX);
        console.log(this.velocityX)
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fillStyle = 'green';
        ctx.fill();
    }

    isVelocitySet() {
        return this.velocityY !== null && this.velocityX !== null;
    }

    drawArrow(x, y) {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.draw();
        ctx.moveTo(this.positionX, this.positionY);
        ctx.lineTo(this.positionX + x * 10, this.positionY + y * 10);
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    move() {
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.draw();


        this.positionX += this.nextX;
        this.positionY += this.nextY;

        const collisionBottomY = this.positionY + this.radius >= canvas.height,
            collisionTopY = this.positionY - this.radius <= 0,
            collisionY = collisionBottomY || collisionTopY,
            collisionRightX = this.positionX + this.radius >= canvas.width,
            collisionLeftX = this.positionX - this.radius <= 0,
            collisionX = collisionRightX || collisionLeftX;

        if (collisionY) {
            this.nextY = (-this.velocityY) * (Math.abs(this.nextY) / this.nextY);
        }
        if (collisionX) {
            this.nextX = (-this.velocityX) * (Math.abs(this.nextX) / this.nextX);
        }
        this.ref = window.requestAnimationFrame(this.move.bind(this));
    }

    stopAnimation() {
        window.cancelAnimationFrame(this.ref);
    }
}

class NumberInput {
    constructor(input) {
        this.input = input;
    }

    getValue() {
        return Number(this.input.value);
    }
}

const myBall = new Ball(25, {
        positionY: 30,
        positionX: 60
    }),
    xValue = new NumberInput(xInput),
    yValue = new NumberInput(yInput);
myBall.draw();
myBall.drawArrow(xValue.getValue(), yValue.getValue());

startButton.onclick = () => {
    myBall.setVelocity({velocityY: yValue.getValue(), velocityX: xValue.getValue(),});
    window.requestAnimationFrame(myBall.move.bind(myBall));
};

stopButton.onclick = () => {
    myBall.stopAnimation();
};

yInput.onchange = () => {
    myBall.drawArrow(xValue.getValue(), yValue.getValue());
};

xInput.onchange = () => {
    myBall.drawArrow(xValue.getValue(), yValue.getValue());
};