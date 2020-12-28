/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

import scoreBoard from '../score/scoreBoard';
import config from '../Config/config';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {

    this.add.text(config.width / 3, 10, 'LEADERBOARD', { color: 'white', fontSize: '32px' });

    this.menuButton = this.add.sprite(400, 500, 'buttonOne').setInteractive();
    this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '28px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', () => {
      this.scene.start('Title');
    });
    scoreBoard.create();
  }
}
