class multiPlayer extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"multiPlayer"}); //parentconstructer, a key to be able to call it by name
    this.trunks;
    this.apples;

    this.snake;

    this.snake2;
    this.keyA ;
    this.keyD ;
    this.keyS ;
    this.keyW ;

    this.goal;
    this.cursors;
    this.UP = 0;
    this.DOWN = 1;
    this.LEFT = 2;
    this.RIGHT = 3;
    this.HitPositionConstant=24;
    this.firstcamera;
    this.worldBoundX=2500;
    this.worldBoundY=1500;
    this.gamePauseBool;

    this.snake1Camera;
    this.snake2Camera;

  }

  preload(){
    this.load.image('apple', 'assets/grape.png');
    this.load.image('body_red', 'assets/red_body.png');
    this.load.image('head_red','assets/head_red');
    this.load.image('body_blue', 'assets/blue_body.png');
    this.load.image('head_blue','assets/head_blue');
    this.load.image('barrier', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bak','assets/background4.0.png');
    this.load.image('trunk','assets/tree_trunk.png');
    this.load.image('bush','assets/bush.png');
    this.load.image('stump','assets/tree_stump.png');
    this.load.image('goal','assets/goal.png');

  }

  create(time){

    var Snake = new Phaser.Class({

        initialize:

        function Snake (scene, x, y,color)
        {
            this.scene=scene
            this.color=color
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.physics.add.group();

            this.head = this.body.create(x*this.scene.HitPositionConstant, y*this.scene.HitPositionConstant, 'head_'+color);

            this.alive = true;

            this.speed = 140;

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
            if (this.collidWithBounds()==true){console.log(this.body);this.alive=false;}

            //  Update the timer ready for the next movement
            this.moveTime = time + this.speed;

            return true;
        },

        grow: function ()
        {
            this.body.create(this.tail.x, this.tail.y, 'body_'+this.color);

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

    this.snake1Camera=this.cameras.add(500,0,500,575)
    this.snake2Camera=this.cameras.add(0,0,500,575)

    this.snake1Camera.setBounds(0, 0, this.worldBoundX, this.worldBoundY);
    this.snake2Camera.setBounds(0, 0, this.worldBoundX, this.worldBoundY);


    this.add.sprite(0,0,'bak').setOrigin(0,0);

    this.goal=this.physics.add.sprite(1900,900,'goal');
    this.apples=this.physics.add.group();
    this.apples.create(300,300,'apple');
    this.apples.create(200,2000,'apple');
    this.apples.create(1000,300,'apple');
    this.apples.create(2000,300,'apple');
    this.apples.create(400,600,'apple');
    this.apples.create(1000,400,'apple');
    this.trunks=this.physics.add.group();
    this.trunks.create(600,300,'trunk');
    this.trunks.create(700,1000,'bush');
    this.trunks.create(100,1000,'stump');
    this.trunks.create(1000,1500,'bush');
    this.trunks.create(1000,400,'bush');
    this.trunks.create(1500,800,'trunk');
    this.trunks.create(1400,1300,'stump');
    this.trunks.create(2000,400,'trunk');
    this.trunks.create(580,1600,'stump');
    this.trunks.create(2000,800,'bush');

    this.snake = new Snake(this, 10, 20,'red');
    this.snake2=new Snake(this, 70, 21,'blue');
    for(var i=0;i<2;i++){
      this.snake.grow();
      this.snake2.grow();
    }

      //New posistion for apple when eaten
    this.physics.add.collider(this.snake.head,this.apples,function(snake,apple){
      var x,y;
      this.snake.grow();
      this.snake.speed=this.snake.speed*0.99;
      x = Phaser.Math.Between(this.snake.head.x-150, this.snake.head.x+300);
      y = Phaser.Math.Between(this.snake.head.y-100, this.snake.head.y+200);
      if(x<0+50){x=x+500}
      if(x>this.worldBoundX-300){x=x-500}//worldBoundX
      if(y<0+50){y=y+500}
      if(y>this.worldBoundY-300){y=y-500}//worldBoundY
      apple.disableBody(true,true);
      this.apples.create(x,y,'apple')
    },null,this);
    this.physics.add.collider(this.snake.head,this.goal,function(){
      this.scene.start('win')
      //poäng
    },null,this)
    this.physics.add.collider(this.snake.head,this.trunks,function(){this.snake.alive=false;},null,this);
    this.snake1Camera.startFollow(this.snake.head);


    //create keys
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //New posistion for apple when eaten
    this.physics.add.collider(this.snake2.head,this.apples,function(snake2,apple){
      var x,y;
      this.snake2.grow();
      this.snake.speed=this.snake2.speed*0.99;
      x = Phaser.Math.Between(this.snake2.head.x-150, this.snake2.head.x+300);
      y = Phaser.Math.Between(this.snake2.head.y-100, this.snake2.head.y+200);
      if(x<0+50){x=x+500}
      if(x>this.worldBoundX-300){x=x-500}//worldBoundX
      if(y<0+50){y=y+500}
      if(y>this.worldBoundY-300){y=y-500}//worldBoundY
      apple.disableBody(true,true);
      this.apples.create(x,y,'apple')
    },null,this);
    this.physics.add.collider(this.snake2.head,this.goal,function(){
    this.scene.start('win')
    //poäng
  },null,this)
    this.physics.add.collider(this.snake2.head,this.trunks,function(){this.snake2.alive=false;},null,this);
    this.snake2Camera.startFollow(this.snake2.head);

    this.physics.add.collider(this.apples,this.trunks,function(apple,trunk){
      //If apple is positioned on a trunk its removed and created some where else
      var x = Phaser.Math.Between(50, 2450);
      var y = Phaser.Math.Between(50, 1950);
      apple.disableBody(true,true);
      this.apples.create(x,y,'apple')
    },null,this)
    //  Create our keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }





  update(time, delta){
    if (!this.snake.alive)
    {
      this.scene.start('win',{id:2});
    }
    if (!this.snake2.alive)
    {
      this.scene.start('win',{id:1});
    }



    if (this.cursors.left.isDown)
    {
      if (this.snake.direction === this.UP || this.snake.direction === this.DOWN)
      {
          this.snake.heading = this.LEFT;
          this.snake.head.angle=-90;
      }
    }
    else if (this.cursors.right.isDown)
    {
      if (this.snake.direction === this.UP || this.snake.direction === this.DOWN)
      {
          this.snake.heading = this.RIGHT;
          this.snake.head.angle=90;
      }
    }
    else if (this.cursors.up.isDown)
    {
      if (this.snake.direction === this.LEFT || this.snake.direction === this.RIGHT)
      {
          this.snake.heading = this.UP;
          this.snake.head.angle=0;
      }
    }
    else if (this.cursors.down.isDown)
    {
      if (this.snake.direction === this.LEFT || this.snake.direction === this.RIGHT)
      {
          this.snake.heading = this.DOWN;
          this.snake.head.angle=180;
      }
    }


    if (this.keyA.isDown)
    {
      if (this.snake2.direction === this.UP || this.snake2.direction === this.DOWN)
      {
          this.snake2.heading = this.LEFT;
          this.snake2.head.angle=-90;
      }
    }
    else if (this.keyD.isDown)
    {
      if (this.snake2.direction === this.UP || this.snake2.direction === this.DOWN)
      {
          this.snake2.heading = this.RIGHT;
          this.snake2.head.angle=90;
      }
    }
    else if (this.keyW.isDown)
    {
      if (this.snake2.direction === this.LEFT || this.snake2.direction === this.RIGHT)
      {
          this.snake2.heading = this.UP;
          this.snake2.head.angle=0;
      }
    }
    else if (this.keyS.isDown)
    {
      if (this.snake2.direction === this.LEFT || this.snake2.direction === this.RIGHT)
      {
          this.snake2.heading = this.DOWN;
          this.snake2.head.angle=180;
      }
    }



    for(var i = 1; i <this.snake2.body.getChildren().length; i++)
    {
      if(this.snake.head.x==this.snake2.body.getChildren()[i].x && this.snake.head.y==this.snake2.body.getChildren()[i].y)
      {
        this.snake.aleive=false;
        console.log('1')
      }
    }
    for(var i = 1; i <this.snake.body.getChildren().length; i++)
    {
      if(this.snake2.head.x==this.snake.body.getChildren()[i].x && this.snake2.head.y==this.snake.body.getChildren()[i].y)
      {
        this.snake2.alive=false;
        console.log('2')
      }
    }

    if(this.snake.alive && this.snake2.alive){this.snake.update(time)}
    if(this.snake.alive && this.snake2.alive){this.snake2.update(time)}


  }
}
