/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

import scoreBoard from '../score/scoreBoard';
import config from '../Config/config';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.add.text(config.width / 3, 8, 'LEADERBOARD', { color: 'white', fontSize: '28px' });

    const menuButton = document.getElementById('menu');
    menuButton.style.display = 'block';

    menuButton.addEventListener('click', () => {
      const score = document.getElementById('score');
      this.scene.start('Title');
      score.style.display = 'none';
      menuButton.style.display = 'none';
    });
    scoreBoard.create();
  }
}
