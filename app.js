class menu extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"menu"}); //parentconstructer, a key to be able to call it by name
  }

  preload(){
    this.load.image('forest','assets/woods.png');
    this.load.image('single_Buttom','assets/single_Buttom.png');
    this.load.image('multi_Buttom','assets/multi_Buttom.png');
    this.load.image('again_Buttom','assets/again_Buttom.png');
    this.load.image('menu_Buttom','assets/menu_Buttom.png');
    this.load.image('highScoreButtom','assets/highScore.png');
    this.load.image('sky','assets/sky.png');
    this.load.image('win_text','assets/win_text.png');
    this.load.image('win_1_text','assets/win_1_text.png');
    this.load.image('win_2_text','assets/win_2_text.png');
    this.load.image('game_over','assets/game_over.png');
    this.load.image('start_text','assets/start_text');
    this.load.image('tutorial', 'assets/tutorial_button.png');
    //Ljud fil gör scenen ändring långsam
    //this.load.audio('starwars', 'assets/sw.wav');

  }



  create(){

    this.add.image(0,0,'forest').setOrigin(0,0);
    this.add.image(500,200,'start_text')
    var singlePlayerButtom=this.add.sprite(250, 500, 'single_Buttom').setInteractive();
    //var highScoreButtom=this.add.sprite(500, 400,'highScoreButtom').setInteractive();
    var multiPlayer=this.add.sprite(750,500,'multi_Buttom').setInteractive();
    var tutorial = this.add.sprite(0,0, 'tutorial').setInteractive();
    tutorial.setOrigin(0,0);

    singlePlayerButtom.on('pointerdown', function (pointer){
      this.scene.start('singlePlayer');
    },this);

    //highScoreButtom.on('pointerdown',function(pointer){this.scene.start('highScore');},this);

    multiPlayer.on('pointerdown',function(pointer){
      this.scene.start('multiPlayer');
    },this);

    tutorial.on('pointerdown', function (pointer){
      this.scene.start('tutorial')
    },this)


  }

}


class gameOver extends Phaser.Scene{

  constructor(){
    super({key:"gameOver"}); //parentconstructer, a key to be able to call it by name
  }


  create(){
    this.add.image(0,0,'forest').setOrigin(0,0);
    this.add.image(500,100,'game_over');
    var menubuttom=this.add.sprite(750, 350, 'menu_Buttom').setInteractive();
    var replay=this.add.sprite(250, 350,'again_Buttom').setInteractive();

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
  init(data){

    this.id=data.id
  }


  create(){

    this.add.image(0,0,'forest').setOrigin(0,0);
    if(this.id==1){
      this.add.image(500,100,'win_1_text');
    }
    else if(this.id==2){
      this.add.image(500,100,'win_2_text');
    }
    else if(this.id==3){
      this.add.image(500,100,'win_text');
    }
    var menubuttom=this.add.sprite(750, 350, 'menu_Buttom').setInteractive();
    var replay=this.add.sprite(250, 350,'again_Buttom').setInteractive();

    replay.on('pointerdown', function (pointer){
      if(this.id==3){
        this.scene.start("singlePlayer");
      }
      else if(this.id==1||this.id==2){
        this.scene.start("multiPlayer")
      }
    },this)

    menubuttom.on('pointerdown',function(pointer){
      this.scene.start('menu');
    },this);

  }

}

class tutorial extends Phaser.Scene{

  constructor() {
    super({key:"tutorial"});
  }

  preload() {
    this.load.image('arrow','assets/arrow_button.png');
    this.load.image('awsd','assets/awsd_button.png');

  }

  create() {
    this.add.image(0,0,'forest').setOrigin(0,0);
    var menubuttom=this.add.sprite(0, 0, 'menu_Buttom').setInteractive();
    menubuttom.setOrigin(0,0);

    this.add.sprite(250, 470, 'arrow');
    this.add.text(200,535, "Player 1",  { font: "bold 24px Arial", fill: "#e67300", align: "left" })
    this.add.sprite(700, 470, 'awsd');
    this.add.text(650,535, "Player 2",  { font: "bold 24px Arial", fill: "#e67300", align: "left" })


    var text = this.add.text(180, 150, "Snakeley has found himself in a forest,\nalone and hungry. He only eats grapes,\nas the python he is. For every grape he\neats, he will go a bit faster then before.\n\t\t\t\t\t\t\t\t\t\t\tHelp Snakeley find food\n\t\t\t\t\t\t\t\t\t\t\tand the way back home!", { font: "bold 35px Arial", fill: "#e67300", align: "left" });
    text.setShadow(-2, 2, 'rgba(0, 0, 0, 0.5)', 0);

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
  scene: [menu, singlePlayer, gameOver,pause,win,multiPlayer, tutorial]

};

var game = new Phaser.Game(config);
