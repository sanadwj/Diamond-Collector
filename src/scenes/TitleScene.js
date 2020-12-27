/* eslint-disable no-undef */
import 'phaser';
import config from '../Config/config';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
  }

  create() {
    this.gameButton = this.add.sprite(100, 200, 'buttonOne').setInteractive();
    this.centerButton(this.gameButton, 1);


    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.input.on('pointerover', (_Event, gameObjects) => {
      gameObjects[0].setTexture('buttonTwo');
    });

    this.input.on('pointerout', (_Event, gameObjects) => {
      gameObjects[0].setTexture('buttonOne');
    });

    this.optionsButton = this.add.sprite(300, 200, 'buttonOne').setInteractive();
    this.centerButton(this.optionsButton);

    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);

    this.optionsButton.on('pointerdown', () => {
      this.scene.start('Options');
    });

    // Credits
    this.creditsButton = this.add.sprite(300, 200, 'buttonOne').setInteractive();
    this.centerButton(this.creditsButton, -1);

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.creditsText, this.creditsButton);

    this.creditsButton.on('pointerdown', () => {
      this.scene.start('Credits');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('buttonTwo');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('buttonOne');
    });

    // this.model = this.sys.game.globals.model;
    // if (this.model.musicOn === true) {
    //   this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
    //   this.bgMusic.play();
    // }
  }
  
  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}