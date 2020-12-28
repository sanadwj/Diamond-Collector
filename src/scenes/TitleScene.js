/* eslint-disable no-undef */
import Phaser from 'phaser';

import config from '../Config/config';
import Button from '../Objects/Button';
import bg from '../assets/red/bkg1_front5.png';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.load.image('bg', bg);
  }

  create() {
    this.add.image(510, 300, 'bg').setDepth(-1);


    this.instructionButton = new Button(this, config.width / 2, config.height / 2 - 250, 'buttonOne', 'buttonTwo', 'Instruction', 'Instruction');


    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 150, 'buttonOne', 'buttonTwo', 'Play', 'Game');


    this.optionsButton = new Button(this, config.width / 2, config.height / 2 - 50, 'buttonOne', 'buttonTwo', 'Options', 'Options');


    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 50, 'buttonOne', 'buttonTwo', 'Credits', 'Credits');


    this.leadboardButton = new Button(this, config.width / 2, config.height / 2 + 150, 'buttonOne', 'buttonTwo', 'Board', 'LeaderBoard');


    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}