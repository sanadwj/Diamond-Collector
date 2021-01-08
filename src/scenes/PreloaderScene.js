/* eslint-disable no-undef */
/* eslint-disable radix */
import 'phaser';
import buttonOne from '../assets/ui/Button_Play.png';
import buttonTwo from '../assets/ui/Button_06.png';
import backBtnOne from '../assets/ui/Button_78.png';
import backBtnTwo from '../assets/ui/Button_79.png';
import box from '../assets/ui/grey_box.png';
import checkBox from '../assets/ui/blue_boxCheckmark.png';
import platform from '../assets/platforms/platform.png';
import dim from '../assets/dim.png';
import robo from '../assets/run.png';
import die from '../assets/die.png';
import jump from '../assets/jump.png';
import background from '../assets/ui/BG.png';
import fire from '../assets/fire3.png';
import cloud from '../assets/objects/cloud.png';
import bush from '../assets/objects/Bush.png';
import tree from '../assets/objects/Tree_2.png';
import stone from '../assets/objects/Stone.png';
import mashroom from '../assets/objects/Mushroom_2.png';
import water from '../assets/platforms/water.png';
import homeOne from '../assets/ui/Button_18.png';
import homeTwo from '../assets/ui/Button_19.png';
import playOne from '../assets/ui/Button_14.png';
import playTwo from '../assets/ui/Button_15.png';
import board from '../assets/ui/Windows_17.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);


    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 60,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });

    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ff0000',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', (file) => {
      assetText.setText(`Loadng asset:${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('buttonOne', buttonOne);
    this.load.image('backBtnOne', backBtnOne);
    this.load.image('backBtnTwo', backBtnTwo);
    this.load.image('buttonTwo', buttonTwo);
    this.load.image('homeOne', homeOne);
    this.load.image('homeTwo', homeTwo);
    this.load.image('playOne', playOne);
    this.load.image('playTwo', playTwo);
    this.load.image('box', box);
    this.load.image('checkedBox', checkBox);
    this.load.audio('bgMusic', ['../src/assets/TownTheme.mp3']);


    this.load.image('platform', platform);
    this.load.image('board', board);
    this.load.image('water', water);
    this.load.image('bground', background);
    this.load.image('dim', dim);
    this.load.image('tree', tree);
    this.load.image('bush', bush);
    this.load.image('stone', stone);
    this.load.image('mashroom', mashroom);
    this.load.spritesheet('fire', fire, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('robo', robo, {
      frameWidth: 260,
      frameHeight: 240,
    });

    this.load.spritesheet('die', die, {
      frameWidth: 260,
      frameHeight: 230,
    });
    this.load.spritesheet('jump', jump, {
      frameWidth: 260,
      frameHeight: 230,
    });
    // mountains are a sprite sheet made by 512x512 pixels
    this.load.image('cloud', cloud);
  }

  create() {
    // setting player animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('robo', {
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });

    // setting player animation
    this.anims.create({
      key: 'died',
      frames: this.anims.generateFrameNumbers('die', {
        start: 1,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    // setting player animation
    this.anims.create({
      key: 'jumping',
      frames: this.anims.generateFrameNumbers('jump', {
        start: 1,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

    // setting fire animation
    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('fire', {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    // eslint-disable-next-line no-plusplus
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}