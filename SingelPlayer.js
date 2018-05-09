//collision physics?
//this.physics.add.overlap(player, stars, collectStar, null, this)
//Geom

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var snake;
var apple;
var cursors;

//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var HitPositionConstant=16;// If this is changed apple new position must be changed

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('apple', 'assets/firstaid.png');
    this.load.image('body', 'assets/star.png');
    this.load.image('barrier', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
}

function create ()

{
    var Apple = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Apple (scene, x, y)
        {
            //?
            Phaser.GameObjects.Image.call(this, scene)

            //First posistion
            this.setTexture('apple');
            this.setPosition(x*HitPositionConstant, y*HitPositionConstant);
            this.setOrigin(0);

            this.total = 0;

            scene.children.add(this);
        },

        eat: function ()
        {
            this.total++;

            //New posistion
            var x = Phaser.Math.Between(0, 39);
            var y = Phaser.Math.Between(0, 29);
            this.setPosition(x*HitPositionConstant , y*HitPositionConstant );
        }

    });

    var Snake = new Phaser.Class({

        initialize:

        function Snake (scene, x, y)
        {
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.head = this.body.create(x*HitPositionConstant, y*HitPositionConstant, 'body');
            this.head.setOrigin(0);

            this.alive = true;

            this.speed = 100;

            this.moveTime = 0;

            this.tail = new Phaser.Geom.Point(x, y);

            this.heading = UP;
            this.direction = UP;
        },

        update: function (time)
        {
            if (time >= this.moveTime)
            {
                return this.move(time);
            }
            else
            {
            return false;
            }
        },

        move: function (time)
        {

            switch (this.heading)
            {
                case LEFT:
                    this.headPosition.x = this.headPosition.x - 1;
                    break;

                case RIGHT:
                    this.headPosition.x = this.headPosition.x + 1;
                    break;

                case UP:
                    this.headPosition.y = this.headPosition.y - 1;
                    break;

                case DOWN:
                    this.headPosition.y = this.headPosition.y + 1;
                    break;
            }

            this.direction = this.heading;

            //  Update the body segments and place the last coordinate into this.tail
            Phaser.Actions.ShiftPosition(
              this.body.getChildren(),
               this.headPosition.x *HitPositionConstant,
                this.headPosition.y *HitPositionConstant,
                 1,
                  this.tail);

            if (this.collidWithBody()==true){this.alive=false;}
            //this.collidWithBody();
            //  Update the timer ready for the next movement
            this.moveTime = time + this.speed;

            return true;
        },

        grow: function ()
        {
            var newPart = this.body.create(this.tail.x, this.tail.y, 'body');

            newPart.setOrigin(0);
            console.log(snake.body.getChildren()[0].x);
        },

        collideWithApple: function (apple)
        {
            if (this.head.x == apple.x && this.head.y == apple.y)
            {
                this.grow();

                apple.eat();

                return true;
            }
            else
            {
                return false;
            }
        },
        collidWithBody: function()

        {
          var bodyParts=this.body.getChildren();
          for(var i = 1; i <bodyParts.length; i++)
          {
            if(this.head.x==bodyParts[i].x && this.head.y==bodyParts[i].y){console.log('hit body');return true;}
          }
          return false;
        }

    });

    this.add.image(400,300,'sky');
    apple = new Apple(this, 10, 4);


    snake = new Snake(this, 10, 20);

    //  Create our keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update (time, delta)
{
    if (!snake.alive)
    {
        return;
    }


    if (cursors.left.isDown)
    {
      if (snake.direction === UP || snake.direction === DOWN)
      {
          snake.heading = LEFT;
      }
    }
    else if (cursors.right.isDown)
    {
      if (snake.direction === UP || snake.direction === DOWN)
      {
          snake.heading = RIGHT;
      }
    }
    else if (cursors.up.isDown)
    {
      if (snake.direction === LEFT || snake.direction === RIGHT)
      {
          snake.heading = UP;
      }
    }
    else if (cursors.down.isDown)
    {
      if (snake.direction === LEFT || snake.direction === RIGHT)
      {
          snake.heading = DOWN;
      }
    }

    if (snake.update(time))
    {
        //  If the snake updated, we need to check for collision against food

        snake.collideWithApple(apple);

    }
}
