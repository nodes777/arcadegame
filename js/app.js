var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 600) {
        this.x = -100;
    }
    this.checkCollision(player);
};

Enemy.prototype.checkCollision = function(player) {
    var enemyHalfWidth = 50;
    if (player.x < this.x + enemyHalfWidth &&
        player.x + enemyHalfWidth > this.x &&
        player.y < this.y + enemyHalfWidth &&
        enemyHalfWidth + player.y > this.y) {
        //player position resets
        player.x = 200;
        player.y = 400;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(100, 50, 100), new Enemy(200, 220, 10), new Enemy(100, 140, 200)];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function(dt) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(hasWon) {
    if (hasWon === true) {
        alert("Congratulations! You win!");
    }
    this.x = 200;
    this.y = 400;
}
Player.prototype.handleInput = function(dir) {
    switch (dir) {
        case 'left':
            if (this.x > 10) {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x < 350) {
                this.x += 100;
            }
            break;
        case 'up':
            if (this.y > 10) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
    var rect1 = {
        x: 0,
        y: 0,
        width: 500,
        height: 20
    };
    var rect2 = {
        x: this.x,
        y: this.y,
        width: 20,
        height: 20
    };

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        console.log("win")
        hasWon = true;
        var that = this;
        setTimeout(function() {
            return that.reset();
        }, 500);
    }


};
// Place the player object in a variable called player
var player = new Player(200, 400);
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