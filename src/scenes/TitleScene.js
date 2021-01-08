/* eslint-disable no-undef */
import Phaser from 'phaser';

import config from '../Config/config';
import Button from '../Objects/Button';
import bg from '../assets/ui/BG.png';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.load.image('bg', bg);
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'bg').setDepth(-1);

    this.add.text(config.width / 2 - 220, config.height / 2 - 325, 'DIAMOND COLLECTOR', { color: '#5d1512', fontFamily: 'Arial', fontSize: '42px ' });

    this.instructionButton = new Button(this, config.width / 2, config.height / 2 - 225, 'buttonOne', 'buttonTwo', 'Instructions', 'Instructions');
    this.instructionButton.setScale(0.6, 0.5);

    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 125, 'buttonOne', 'buttonTwo', 'Play', 'Input');
    this.gameButton.setScale(0.6, 0.5);

    this.optionsButton = new Button(this, config.width / 2, config.height / 2 - 25, 'buttonOne', 'buttonTwo', 'Options', 'Options');
    this.optionsButton.setScale(0.6, 0.5);

    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 75, 'buttonOne', 'buttonTwo', 'Credits', 'Credits');
    this.creditsButton.setScale(0.6, 0.5);

    this.leadboardButton = new Button(this, config.width / 2, config.height / 2 + 175, 'buttonOne', 'buttonTwo', 'Board', 'LeaderBoard');
    this.leadboardButton.setScale(0.6, 0.5);

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}