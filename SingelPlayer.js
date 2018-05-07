var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
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
            this.setPosition(x * 16, y * 16);
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
            this.setPosition(x * 16, y * 16);
        }

    });

    var Snake = new Phaser.Class({

        initialize:

        function Snake (scene, x, y)
        {
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.head = this.body.create(x * 16, y * 16, 'body');
            this.head.setOrigin(0);

            this.alive = true;

            this.speed = 100;

            this.moveTime = 0;

            this.tail = new Phaser.Geom.Point(x, y);

            this.heading = RIGHT;
            this.direction = RIGHT;
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
            /**
            * Based on the heading property (which is the direction the pgroup pressed)
            * we update the headPosition value accordingly.
            *
            * The Math.wrap call allow the snake to wrap around the screen, so when
            * it goes off any of the sides it re-appears on the other.
            */
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
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

            //  Update the timer ready for the next movement
            this.moveTime = time + this.speed;

            return true;
        },

        grow: function ()
        {
            var newPart = this.body.create(this.tail.x, this.tail.y, 'body');

            newPart.setOrigin(0);
        },

        collideWithApple: function (apple)
        {
            if (this.head.x === apple.x && this.head.y === apple.y)
            {
                this.grow();

                apple.eat();

                return true;
            }
            else
            {
                return false;
            }
        }

    });
    this.add.image(400,300,'sky');
    apple = new Apple(this, 3, 4);


    snake = new Snake(this, 8, 8);

    //  Create our keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update (time, delta)
{
    if (!snake.alive)
    {
        return;
    }

    /**
    * Check which key is pressed, and then change the direction the snake
    * is heading based on that. The checks ensure you don't double-back
    * on yourself, for example if you're moving to the right and you press
    * the LEFT cursor, it ignores it, because the only valid directions you
    * can move in at that time is up and down.
    */
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
