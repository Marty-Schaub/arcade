//Create the Enemy class including location, sprite, speed and radius of bugs for collision checking functionality.
//Render the enemy
class Enemy {
  constructor(x,y){
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.x += Math.floor(Math.random());
    this.radius = 50;
  }
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update(dt) {
           if (this.x < 490) {
             this.speed * dt;
             this.x = this.x + (this.speed * dt);
           } else {
             this.x = -100;
     }
  }
};

//Create the Hero class including location, sprite, speed and radius of bugs for collision checking functionality.
//Render the Hero
class Hero {
  constructor () {
    this.x = 300;
    this.y = 400;
    this.sprite = 'images/char-cat-girl.png';
    this.radius = 50;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update(dt) {
  };


//Set up event listener for player movement.  Set the borders of the playing field.  Display error message if Player
//moves outside boundry of the board.
 handleInput(input) {
    switch(input) {
      case 'left':
      if (this.x > 0 ){
        this.x -=101;} else {
        window.alert("You'll fall off the edge of the earth!")
      //TODO: Add a sound bite
      }
      break;
      case 'right':
      if (this.x < 400){
        this.x += 101;} else {
          window.alert("You'll fall off the edge of the earth!")
        }
      break;
     case 'up'://sets victory condition and changes to victory sprite and sets victory message
      if (this.y > 83){
        this.y -=83;} else {
        this.y -=75;
      }
       console.log(this.y);
      if (this.y < -6) {
      this.sprite = 'images/heart.png';
     window.setTimeout(window.alert, 250, 'You Win');
       victoryReset();
        }
      break;
      case 'down':
      if (this.y < 400){
        this.y += 83;} else {
          window.alert("You'll fall off the edge of the earth!")
        }
      break;
    }
  }
};

//Delay call of restart player function after clicking ok on the victory alert message
function victoryReset(){
  window.setTimeout(restart,500);
}

//reset player sprite and location after clicking ok on the victory alert message
function restart(){
     player.sprite = 'images/char-cat-girl.png';
     player.x = 300;
     player.y = 400;
}


//instatiate hero object
let player = new Hero();

//instatiate enemy objects, place enemies in array called allEnemies
let roach1 = new Enemy(400,75);
let roach2 = new Enemy(300,150);
let roach3 = new Enemy(600,220);
let allEnemies = [];
allEnemies.push(roach1, roach2, roach3);

//check for collisions and reset game if collision occurs
//provided by MDN https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
checkCollisions = function() {
  for (let enemy of allEnemies) {
        //using the distance formula
        let dx = (enemy.x + enemy.radius) - (player.x + player.radius);
        let dy = (enemy.y + enemy.radius) - (player.y + player.radius);
        let distance = Math.sqrt(dx * dx + dy * dy);
       if (distance <  60) { //collision occurs
          //reset start positions of enemies
            roach1.y = 60;
            roach2.y = 150;
            roach3.y = 225;
            //reset start position of player
            player.x = 300;
            player.y = 400;
          console.log('A collision occured!');
      }
    }
};

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
