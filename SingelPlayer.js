var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 575,
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
    this.load.image('bak','assets/BakSnake2.0.png')
}

function create ()

{
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
            if (this.collidWithBounds()==true){this.alive=false;}
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

                this.speed=this.speed*0.98;

                return true;
            }
            else
            {
                return false;
            }
        },

        collideWithGaol: function (goal)
        {
            if (this.head.x == goal.x && this.head.y == goal.y)
            {
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
        },
        collidWithBounds: function()
        {
          if(this.head.x<0 || this.head.y<0 || this.head.x>4900 ||this.head.y>3075){return true;}
          return false;

        }



    });

    var Apple = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Apple (scene, x, y,snake)
        {
            //?
            Phaser.GameObjects.Image.call(this, scene)

            //First posistion
            this.setTexture('apple');
            this.setPosition(x*HitPositionConstant, y*HitPositionConstant);
            this.setOrigin(0);
            this.snakeX=snake.head.x;
            this.snakeY=snake.head.y;

            this.total = 0;

            scene.children.add(this);
        },

        eat: function ()
        {
            this.total++;

            //New posistion// fixa med mod 16?
            var x = Phaser.Math.Between(this.snakeX-150, this.snakeX+150);
            x=x-(x%HitPositionConstant)
            var y = Phaser.Math.Between(this.snakeY-100, this.snakeY+100);
            y=y-(y%HitPositionConstant)
            console.log(x +"---"+ y);
            this.setPosition(x , y );
        }



    });
    var Goal=new Phaser.Class({
        Extends: Phaser.GameObjects.Image,

        initialize:

        function Gaol(scene,x,y)
        {
          Phaser.GameObjects.Image.call(this, scene)

          //First posistion
          this.setTexture('body');

          this.setPosition(x-x%HitPositionConstant, y-y%HitPositionConstant);
          this.setOrigin(0);

          scene.children.add(this);
        }


    var Apple = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Apple (scene, x, y,snake)
        {
            //?
            Phaser.GameObjects.Image.call(this, scene)

            //First posistion
            this.setTexture('apple');
            this.setPosition(x*HitPositionConstant, y*HitPositionConstant);
            this.setOrigin(0);
            this.snakeX=snake.head.x;
            this.snakeY=snake.head.y;

            this.total = 0;

            scene.children.add(this);
        },

        eat: function ()
        {
            this.total++;

            //New posistion// fixa med mod 16?
            var x = Phaser.Math.Between(this.snakeX-150, this.snakeX+150);
            x=x-(x%HitPositionConstant)
            var y = Phaser.Math.Between(this.snakeY-100, this.snakeY+100);
            y=y-(y%HitPositionConstant)
            console.log(x +"---"+ y);
            this.setPosition(x , y );
        }

    });
    var Goal=new Phaser.Class({
        Extends: Phaser.GameObjects.Image,

        initialize:

        function Gaol(scene,x,y)
        {
          Phaser.GameObjects.Image.call(this, scene)

          //First posistion
          this.setTexture('body');

          this.setPosition(x-x%HitPositionConstant, y-y%HitPositionConstant);
          this.setOrigin(0);

          scene.children.add(this);
        }


    })


    //this.cameras.main.setSize(640, 480);
    //this.impact.world.setBounds(640,480);
    this.add.sprite(2485,1550,'bak');
    snake = new Snake(this, 10, 20);
    goal= new Goal(this,200,200)
    apple = new Apple(this, 30, 30,snake);




    //his.physics.impact.enable(snake);
    //snake.head.setActive().setVelocity(300, 200).setBounce(1);
    firstcamera=this.cameras.main.startFollow(snake.head);
    //snake.onWorldBound=true;


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
        snake.collideWithGaol(goal)

    }
}
