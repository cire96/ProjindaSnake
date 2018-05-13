class menu extends Phaser.Scene {
//called when creted
  constructor(){
    super({key:"menu"}); //parentconstructer, a key to be able to call it by name
  }

  preload(){
    this.load.image('forest','assets/trees.png')
    this.load.audio('starwars', ['assets/sw.wav', 'assets/sw.mp3'])
  }

  create(){
    this.add.image(300,260,'forest');
  }

  update(){

  }
}
