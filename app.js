class menu extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"menu"}); //parentconstructer, a key to be able to call it by name
  }

  preload(){
    this.load.image('forest','assets/woods.png');
    this.load.image('singlePlayerButtom','assets/SingleP.png');
    this.load.image('highScoreButtom','assets/highScore.png');
    this.load.image('sky','assets/sky.png');

    //Ljud fil gör scenen ändring långsam
    //this.load.audio('starwars', 'assets/sw.wav');

  }



  create(){

    this.add.image(0,0,'forest').setOrigin(0,0);
    var singlePlayerButtom=this.add.sprite(500, 200, 'singlePlayerButtom').setInteractive();
    var highScoreButtom=this.add.sprite(500, 300,'highScoreButtom').setInteractive();

    singlePlayerButtom.on('pointerdown', function (pointer){
      this.scene.start('singlePlayer');
    },this)

    highScoreButtom.on('pointerdown',function(pointer){
      this.scene.start('highScore');
    },this);

  }

}



class highScore extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"highScore"}); //parentconstructer, a key to be able to call it by name
  }


  create(){
    this.add.image(0,0,'sky').setOrigin(0,0);



  }

}

class gameOver extends Phaser.Scene{

  constructor(){
    super({key:"gameOver"}); //parentconstructer, a key to be able to call it by name
  }


  create(){
    this.add.image(0,0,'forest').setOrigin(0,0);
    var menubuttom=this.add.sprite(500, 200, 'star').setInteractive();
    var replay=this.add.sprite(500, 300,'singlePlayerButtom').setInteractive();

    replay.on('pointerdown', function (pointer){
      this.scene.start("singlePlayer");
    },this)

    menubuttom.on('pointerdown',function(pointer){
      this.scene.start('menu');
    },this);

  }

}
class pause extends Phaser.Scene{
  constructor(){
    super({key:"pause"})
  }
  create(){
    this.add.image(0,0,'sky').setOrigin(0,0);
    var continueButtom=this.add.sprite(500, 200, 'singlePlayerButtom').setInteractive();
    var quitButtom=this.add.sprite(500, 300,'highScoreButtom').setInteractive();

    continueButtom.on('pointerdown', function (pointer){


      this.scene.moveDown();
      console.log('yes')
      //this.scene.resume('singlePlayer');
      console.log('and fuck')
    },this)

    quitButtom.on('pointerdown',function(pointer){
      this.scene.start('menu')

    },this);

  }
}

class win extends Phaser.Scene{

  constructor(){
    super({key:"win"}); //parentconstructer, a key to be able to call it by name
  }


  create(){
    this.add.image(0,0,'forest').setOrigin(0,0);
    var menubuttom=this.add.sprite(500, 200, 'body').setInteractive();
    var replay=this.add.sprite(500, 300,'singlePlayerButtom').setInteractive();

    replay.on('pointerdown', function (pointer){
      this.scene.start("singlePlayer");
    },this)

    menubuttom.on('pointerdown',function(pointer){
      this.scene.start('menu');
    },this);

  }

}




var config = {
  type:Phaser.AUTO,
  width: 1000,
  height: 575,
  physics: {
      default:'arcade',
      arcade: {
          gravity: {y : 0}
      }
  },
  scene: [menu, singlePlayer, highScore, gameOver,pause,win]

};

var game = new Phaser.Game(config);
