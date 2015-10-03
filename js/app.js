//	our player must avoid
var Enemy = function(x, y) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started
		this.x = x;
		this.y = y;
		// random speed
		this.speed = Math.floor(Math.random()*100) + 330;
		// The image/sprite for our , this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x = this.x + this.speed * dt;
		// condition, if enemy run out of game field area,
		//we set	the x-asis position to -100
		if(this.x > 500) {
			this.x = -100;
	 }
		// define the edges of the bug
		var bugXLeftEdge = this.x - 50;
		var bugXRightEdge = this.x + 50;
		var bugYTopEdge = this.y - 50;
		var bugYBottomEdge = this.y + 50;
		// compare the position of player and the bug
		//if the player collisions with the bug,
		//he moves to the start point
		if (player.x > bugXLeftEdge && player.x < bugXRightEdge && player.y > bugYTopEdge && player.y < bugYBottomEdge) {
			player.resetPlayer();
			player.resetScore();
		}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
		this.x = x; // x position for player
		this.y = y; // y position for player
		// initial score
		this.score = 0;
		this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		ctx.font = '28pt Helvetica';
		ctx.fillStyle = '#2a4ea3';
		ctx.clearRect(0,0,300,40);
		ctx.fillText('Score' + ' ' + this.score, 0, 30);
};

Player.prototype.handleInput = function(keyPress) {
		// move the player with keys left, up, right, down
		switch (keyPress) {
			case 'left':
				if(this.x > 0) {
					this.x -= 100;
				}
				break;
			case 'right':
				if(this.x < 400) {
					this.x += 100;
				}
				break;
			case 'up':
				if (this.y < 90) {
					// if the player reaches the water
					// he returns to the start position
					player.resetPlayer();
					// 10 points for reaching the water
					this.score += 10;
				} else	{
					this.y -= 90;
				}
				break;
			case 'down':
				if(this.y < 400) {
					this.y += 90;
				}
				break;
			default:
		}
};

// set the start position for the player
Player.prototype.resetPlayer = function() {
		this.x = 200;
		this.y = 400;
};

// reset score of the the player
Player.prototype.resetScore = function() {
		this.score = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called all
// Place the player object in a variable called player
var allEnemies = [
		new Enemy(0, 58), // position of first enemy
		new Enemy(0, 141), // position of second enemy
		new Enemy(0, 224) //position of third enemy
];

// player object and its start position
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
