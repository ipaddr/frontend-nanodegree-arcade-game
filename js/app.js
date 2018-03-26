const enemyHeight = 25;
const enemyWidth = 60;
const enemyDefaultSpeed = 100;
const playerHeight = 30;
const playerWidth = 50;
const playerDefaultX = 200;
const playerDefaultY = 380;
const playerDefaultSpeed = 50;
const canvasWidth = 505;
const canvasHeight = 606;
const canvasLefBoundary = 0;
const canvasRightBoundary = 400;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // width and height of object enemi
    this.width = enemyWidth;
    this.height = enemyHeight;

    // position of the enemie
    this.x = x;
    this.y = y;

    // speed of the enemie
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location (you need to implement)
    this.x = this.x + (this.speed * dt);

    // if enemies arrive at the end of field
    if (this.x > canvasWidth) {
        this.x = 0;
        this.speed = enemyDefaultSpeed + Math.floor(Math.random() * 512);
    }

    // Handles collision with the Player (you need to implement)
    if(isCollision(this, player))
        player.resetPosition();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{

    constructor(x, y, speed){
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/char-boy.png';

        // width and height of object enemi
        this.width = playerWidth;
        this.height = playerHeight;

        // position of the enemie
        this.x = x;
        this.y = y;

        // speed of the enemie
        this.speed = playerDefaultSpeed;
    }

    // update player position and condition if hit boundary
    update(){

        if(this.y < 0){
            this.resetPosition();
            alert('You won!');
        }
        else if (this.y > playerDefaultY){
            this.y = playerDefaultY;
        }
        else if (this.x > canvasRightBoundary){
            this.x = canvasRightBoundary
        }
        else if (this.x < 0){
            this.x = 0;
        }
    }

    // render the player
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // handling keyboard input, as lef, up, right, down
    handleInput(keypress){
        switch(keypress){
            case 'left' :
                this.x = this.x - (this.speed + this.width);
                break;
            case 'up' :
                this.y = this.y - (this.speed + this.height);
                break;
            case 'right' :
                this.x = this.x + (this.speed + this.width);
                break;
            case 'down' :
                this.y = this.y + (this.speed + this.height);
                break;
            default:break;
        }
    }

    // reset postion to defautl position
    resetPosition(){
        this.x = playerDefaultX;
        this.y = playerDefaultY;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let enemyPosition = [60, 140, 220];
let player = new Player(playerDefaultX, playerDefaultY, playerDefaultSpeed);

enemyPosition.forEach(function(positionY) {
    const enemy = new Enemy(0, positionY, enemyDefaultSpeed + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function isCollision(objectA, objectB){
    if(objectA.x + objectA.width >= objectB.x &&
        objectA.x <= objectB.x + objectB.width &&
        objectA.y + objectA.height >= objectB.y &&
        objectA.y <= objectB.y + objectB.height)
        return true;
    return false;

}
