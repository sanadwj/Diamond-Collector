import Phaser from 'phaser';

import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'bground');
    
    this.add.image(config.width / 2, config.height / 2, 'board').setScale(0.5, 0.8);

    this.playAganeButton = new Button(this, config.width / 2, config.height / 2 - 70, 'playOne', 'playTwo', '', 'Game').setScale(0.5);

    this.quitButton = new Button(this, config.width / 2, config.height / 2 + 70, 'homeOne', 'homeTwo', '', 'Title').setScale(0.5);

    const gameOverText = this.add.text(config.width / 2, config.height / 2 - 150, 'GAME OVER', { fontSize: '44px', fill: '#940000' });
    gameOverText.setOrigin(0.5);

  }
}