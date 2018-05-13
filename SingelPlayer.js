class singelPlayer extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"singelPlayer"}); //parentconstructer, a key to be able to call it by name
  }

  preload(){
    this.load.image('sky','assets/sky.png')
    this.load.audio('starwars', ['assets/sw.wav', 'assets/sw.mp3'])
  }

  create(){
    this.add.image(400,300,'sky');
  }

  update(){

  }
}
