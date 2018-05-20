



class singlePlayer extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"singlePlayer"}); //parentconstructer, a key to be able to call it by name
    this.trunks;
    this.apples;
    this.snake;
    this.goal;
    this.cursors;
    this.UP = 0;
    this.DOWN = 1;
    this.LEFT = 2;
    this.RIGHT = 3;
    this.HitPositionConstant=16;
    this.firstcamera;
    this.worldBoundX=4900;
    this.worldBoundY=3075;
    this.gamePauseBool;

    this.shakeCamera;

  }

  preload(){
    this.load.image('apple', 'assets/firstaid.png');
    this.load.image('body', 'assets/star.png');
    this.load.image('barrier', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bak','assets/BakSnake3.0.png');
    this.load.image('trunk','assets/trunk.png')

  }

  create(time){

    var Snake = new Phaser.Class({

        initialize:

        function Snake (scene, x, y)
        {
            this.scene=scene
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.physics.add.group();
            this.head = this.body.create(x*this.scene.HitPositionConstant, y*this.scene.HitPositionConstant, 'body');

            this.alive = true;

            this.speed = 100;

            this.moveTime = 0;

            this.tail = new Phaser.Geom.Point(x, y);

            this.heading = scene.UP;
            this.direction = scene.UP;
        },

        update:function(time)
        {
            if (time >= this.moveTime && !this.scene.gamePauseBool)
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
                case this.scene.LEFT:
                    this.headPosition.x = this.headPosition.x - 1;
                    break;

                case this.scene.RIGHT:
                    this.headPosition.x = this.headPosition.x + 1;
                    break;

                case this.scene.UP:
                    this.headPosition.y = this.headPosition.y - 1;
                    break;

                case this.scene.DOWN:
                    this.headPosition.y = this.headPosition.y + 1;
                    break;
            }

            this.direction = this.heading;

            //  Update the body segments and place the last coordinate into this.tail
            Phaser.Actions.ShiftPosition(
              this.body.getChildren(),
               this.headPosition.x *this.scene.HitPositionConstant,
                this.headPosition.y *this.scene.HitPositionConstant,
                 1,
                  this.tail);

            if (this.collidWithBody()==true){this.alive=false;}
            if (this.collidWithBounds()==true){this.alive=false;}

            //  Update the timer ready for the next movement
            this.moveTime = time + this.speed;

            return true;
        },

        grow: function ()
        {
            this.body.create(this.tail.x, this.tail.y, 'body');
        },

        collidWithBody: function()
        {
          var bodyParts=this.body.getChildren();
          for(var i = 1; i <bodyParts.length; i++)
          {
            if(this.head.x==bodyParts[i].x && this.head.y==bodyParts[i].y){;return true;}
          }
          return false;
        },
        collidWithBounds: function()
        {
          if(this.head.x<0 || this.head.y<0 || this.head.x>this.scene.worldBoundX ||this.head.y>this.scene.worldBoundY){return true;}
          return false;
        }



    });

    this.gamePauseBool=false;

    this.cameras.main.setBounds(0, 0, this.worldBoundX, this.worldBoundY);


    this.add.sprite(0,0,'bak').setOrigin(0,0);
    this.apples=this.physics.add.group();
    this.apples.create(200,300,'apple');
    this.trunks=this.physics.add.group();
    this.trunks.create(600,300,'trunk');

    this.goal=this.physics.add.sprite(100,100,'body');


    this.snake = new Snake(this, 10, 20);

      //New posistion for apple when eaten
    this.physics.add.collider(this.snake.head,this.apples,function(snake,apple){
      var x,y;
      this.snake.grow();
      this.snake.speed=this.snake.speed*0.99;
      x = Phaser.Math.Between(this.snake.head.x-150, this.snake.head.x+300);
      y = Phaser.Math.Between(this.snake.head.y-100, this.snake.head.y+200);
      console.log('first'+x+'**'+y)
      if(x<0+50){x=x+500}
      if(x>this.worldBoundX-300){x=x-500}//worldBoundX
      if(y<0+50){y=y+500}
      if(y>this.worldBoundY-300){y=y-500}//worldBoundY
      console.log('second'+x+'**'+y)

      apple.disableBody(true,true);
      this.apples.create(x,y,'apple')
    },null,this);
    this.physics.add.collider(this.apples,this.trunks,function(apple,trunk){
      //If apple is positioned on a trunk its removed and created some where else
      var x = Phaser.Math.Between(this.snake.head.x+150, this.snake.head.x+300);
      var y = Phaser.Math.Between(this.snake.head.y+100, this.snake.head.y+200);
      apple.disableBody(true,true);
      this.apples.create(x,y,'apple')
    },null,this)

    this.physics.add.collider(this.snake.head,this.goal,function(){
      this.scene.start('win')
      //poäng
    },null,this)

    this.physics.add.collider(this.snake.head,this.trunks,function(){this.cameras.main.shake(1000);this.snake.alive=false;},null,this);

    this.firstcamera=this.cameras.main.startFollow(this.snake.head);

    //  Create our keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }





  update(time, delta){
    if (!this.snake.alive)
    {
        this.scene.start('gameOver');
    }


    if (this.cursors.left.isDown)
    {
      if (this.snake.direction === this.UP || this.snake.direction === this.DOWN)
      {
          this.snake.heading = this.LEFT;
      }
    }
    else if (this.cursors.right.isDown)
    {
      if (this.snake.direction === this.UP || this.snake.direction === this.DOWN)
      {
          this.snake.heading = this.RIGHT;
      }
    }
    else if (this.cursors.up.isDown)
    {
      if (this.snake.direction === this.LEFT || this.snake.direction === this.RIGHT)
      {
          this.snake.heading = this.UP;
      }
    }
    else if (this.cursors.down.isDown)
    {
      if (this.snake.direction === this.LEFT || this.snake.direction === this.RIGHT)
      {
          this.snake.heading = this.DOWN;
      }
    }

    if (this.snake.update(time))
    {

    }
  }
}
