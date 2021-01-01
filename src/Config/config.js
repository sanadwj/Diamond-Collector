import 'phaser';


export default {
  type: Phaser.AUTO,
  parent: 'phaser-app',
  width: 1024,
  height: 720,

  scale: {
    mode: Phaser.DOM.ENVELOP,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    parent: 'phaser-app',
    dom: {
      createContainer: true,
    },
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};