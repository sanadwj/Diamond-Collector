/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

import scoreBoard from '../score/scoreBoard';
import config from '../Config/config';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'board').setScale(2);
    this.add.text(config.width / 2 - 80, config.height / 2 - 280, 'LEADERBOARD', { color: '#5d1512', fontFamily: 'Arial', fontSize: '32px' });

    const menuButton = document.getElementById('menu');
    menuButton.style.display = 'block';

    menuButton.addEventListener('click', () => {
      const score = document.getElementById('score');
      this.scene.start('Title');
      score.style.display = 'none';
      menuButton.style.display = 'none';
      score.innerHTML = '';
    });
    scoreBoard.create();
  }
}
