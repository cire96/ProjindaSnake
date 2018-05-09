export class SnakeleyGame {
  game: Phaser.game;

  constructor() {
    //constucting the game
    this.game = new Phaser.Game(640, 480, Phaser.AUTO,{create: this.create, preload: this.preload});
  }

  preload() {
    //Loading in all assets
    this.load.image('box', 'assets/firstaid.png');
    this.load.image('body', 'assets/star.png');
    this.load.image('barrier', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
  }
  crete() {
    //Add all the states used in the game

    //this.game.state.add("TitleScreenState", GameFromScratch.TitleScreenState, true);
    //this.game.state.add("GamePlayState", GameFromScratch.GamePlayState, false);
    //this.game.state.add("GameOverState", GameFromScratch.GameOverState, false);

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }
}

window.onload = () => {
    var game = new Game.ExtremeWalkingSimulator();
};
