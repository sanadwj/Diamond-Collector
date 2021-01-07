/* eslint-disable no-undef */
/* eslint-disable radix */
import 'phaser';
import buttonOne from '../assets/ui/Button_Play.png';
import buttonTwo from '../assets/ui/Button_06.png';
import backBtnOne from '../assets/ui/Button_78.png';
import backBtnTwo from '../assets/ui/Button_79.png';
import logo from '../assets/logo.png';
import box from '../assets/ui/grey_box.png';
import checkBox from '../assets/ui/blue_boxCheckmark.png';
import bg from '../assets/red/bkg1_front5.png';
import platform from '../assets/platform2.png';
import platform3 from '../assets/platforms/platform3.png';
import platform4 from '../assets/platforms/platform4.png';
import platform5 from '../assets/platforms/platform5.png';
import platform6 from '../assets/platforms/platform6.png';
import dim from '../assets/dim.png';
import robo from '../assets/run.png';
import die from '../assets/die.png';
import jump from '../assets/jump.png';
import background from '../assets/bg_forest.png';
import fire from '../assets/fire3.png';
import cloud from '../assets/objects/cloud.png';


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
    this.load.image('logo', logo);
    this.load.image('box', box);
    this.load.image('checkedBox', checkBox);
    this.load.audio('bgMusic', ['../src/assets/TownTheme.mp3']);


    this.load.image('platform', platform);
    this.load.image('platform3', platform3);
    this.load.image('platform4', platform4);
    this.load.image('platform5', platform5);
    this.load.image('platform6', platform6);
    this.load.image('bground', background);
    this.load.image('dim', dim);
    this.load.spritesheet('fire', fire, {
      frameWidth: 60,
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