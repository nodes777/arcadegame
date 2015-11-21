var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
   
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x+this.speed*dt;
    if  (this.x > 600){
        this.x = -100;
    }
    this.checkCollision(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollision = function(player) {
        var enemyObj = 50;
        if (player.x < this.x + enemyObj &&
            player.x + enemyObj > this.x &&
            player.y < this.y + enemyObj &&
            enemyObj + player.y > this.y) {
            //player position resets
            player.x = 200;
            player.y = 400;
        }
    };
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [ new Enemy(100, 50, 100),  new Enemy(200, 220, 10),  new Enemy(100, 140, 200)];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = 200;
    this.y = 400;

    //need a checkCollisions functionality to reset the game when you touch a bug

    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function(dt) {
    this.x*dt;
    this.y*dt;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
    if( this.x < 350){ //contains player movement to canvas
        if(dir==='right') this.x+=100;
    };
    if( this.x > 10){
        if(dir==='left') this.x-=100;
    };
    if( this.y > 10){
        if(dir==='up') this.y-=83;
    };
    if( this.y < 400){
        if(dir==='down') this.y+=83;
    };


}
// Place the player object in a variable called player
var player = new Player(20, 20);
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

