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
    this.load.audio('starwars', 'assets/sw.wav');

  }

  create(){
    this.add.image(0,0,'forest').setOrigin(0,0);
    var singlePlayerButtom=this.add.sprite(500, 200, 'singlePlayerButtom').setInteractive();
    var highScoreButtom=this.add.sprite(500, 300,'highScoreButtom').setInteractive();

    singlePlayerButtom.on('pointerdown', function (pointer){
      this.scene.start("singlePlayer");
    },this)

    highScoreButtom.on('pointerdown',function(pointer){
      this.scene.start('highScore');
    },this);

  }

}


class singlePlayer extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"singlePlayer"}); //parentconstructer, a key to be able to call it by name
  }


  create(){
    var highScoreButtom=this.add.sprite(500, 300,'highScoreButtom').setInteractive();

    highScoreButtom.on('pointerdown',function(pointer){
      this.scene.start('highScore');
    },this);


    this.input.keyboard.on('keyup',function(e){
      if (e.key=="g"){this.scene.start('menu');}

    },this);

  }

  update(){

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
  scene: [menu, singlePlayer, highScore]

};

var game = new Phaser.Game(config);
