// Whole-script strict mode syntax
'use strict';

const ENEMY_HEIGHT = 25;
const ENEMY_WIDTH = 60;
const ENEMY_DEFAULT_SPEED = 100;
const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 50;
const PLAYER_DEFAULT_X = 200;
const PLAYER_DEFAULT_Y = 380;
const PLAYER_DEFAULT_SPEED = 50;
const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;
const CANVAS_TOP_BOUNDARY = 0;
const CANVAS_LEF_BOUNDARY = 0;
const CANVAS_RIGHT_BOUNDARY = 400;


// parent class for enemy and player
function ParentClass(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Draw the enemy on the screen, required method for game
ParentClass.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Detect isCollision between enemy and player
ParentClass.prototype.isCollision = function(objectA, objectB){
    if(objectA.x + objectA.width >= objectB.x &&
        objectA.x <= objectB.x + objectB.width &&
        objectA.y + objectA.height >= objectB.y &&
        objectA.y <= objectB.y + objectB.height)
        return true;
    return false;
}


// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // position of the enemie and speed of the enemie
    ParentClass.call(this, x,y,speed);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // width and height of object enemi
    this.width = ENEMY_WIDTH;
    this.height = ENEMY_HEIGHT;

};

// enemy class extends to Parent class
Enemy.prototype = Object.create(ParentClass.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location (you need to implement)
    this.x = this.x + (this.speed * dt);

    // if enemies arrive at the end of field
    if (this.x > CANVAS_WIDTH) {
        this.x = 0;
        this.speed = ENEMY_DEFAULT_SPEED + Math.floor(Math.random() * 512);
    }

    // Handles collision with the Player (you need to implement)
    if(this.isCollision(this, player))
        player.resetPosition();

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends ParentClass{

    constructor(x, y, speed){
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // position of the enemie and speed of the enemie
        super(x, y, speed);

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/char-boy.png';

        // width and height of object enemi
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
    }

    // update player position and condition if hit boundary
    update(){

        if(this.y < CANVAS_TOP_BOUNDARY){
            this.resetPosition();
            alert('You won!');
        }
        else if (this.y > PLAYER_DEFAULT_Y){
            this.y = PLAYER_DEFAULT_Y;
        }
        else if (this.x > CANVAS_RIGHT_BOUNDARY){
            this.x = CANVAS_RIGHT_BOUNDARY
        }
        else if (this.x < CANVAS_LEF_BOUNDARY){
            this.x = CANVAS_LEF_BOUNDARY;
        }
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
        this.x = PLAYER_DEFAULT_X;
        this.y = PLAYER_DEFAULT_Y;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let enemyPosition = [60, 140, 220];
let player = new Player(PLAYER_DEFAULT_X, PLAYER_DEFAULT_Y, PLAYER_DEFAULT_SPEED);

enemyPosition.forEach(function(positionY) {
    const enemy = new Enemy(0, positionY, ENEMY_DEFAULT_SPEED + Math.floor(Math.random() * 512));
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
