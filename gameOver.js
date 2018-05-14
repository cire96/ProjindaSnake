class gameOver extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"gameOver"}); //parentconstructer, a key to be able to call it by name
  }

  preload(){
    this.load.image('sky','assets/sky.png')
    this.load.image('forest','assets/woods.png');
    this.load.audio('starwars', ['assets/sw.wav', 'assets/sw.mp3'])
  }

  create(){
    this.add.image(0,0,'forest').setOrigin(0,0);

    this.input.keyboard.on('keyup',function(e){
      if (e.key=="m"){this.scene.start('menu');}
      else if (e.key=="p"){this.scene.start('singlePlayer');}
    },this);

  }
}
