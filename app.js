var config = {
  type:Phaser.AUTO,
  width: 640,
  height: 480,
  physics: {
      default:'arcade',
      arcade: {
          gravity: {y : 0}
      }
  },
  scene: [ menu, singelPlayer ]

};

var game = new Phaser.Game(config);
