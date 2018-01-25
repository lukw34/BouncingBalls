const canvas = document.getElementById("canvas"),
   ctx = canvas.getContext("2d");

class Ball {
    constructor(radius, {x = radius, y = radius} = {}) {
        this.radius = radius;
        this.x = x;
        this.y = y;
    }

    init() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    move() {
        
    }
}

const myBall = new Ball(30);
myBall.init();