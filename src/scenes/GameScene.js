import 'phaser';
import grass from '../assets/grass.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('grass', grass);
    
  }

  create() {
    //  The platforms group contains the ground and the 2 ledges we can jump on
    let platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(50, 568, 'grass').setScale(1).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'grass');
    platforms.create(50, 250, 'grass');
    platforms.create(750, 220, 'grass');
  }
}