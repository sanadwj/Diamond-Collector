/* eslint-disable no-undef */
/* eslint-disable radix */
import 'phaser';
import buttonOne from '../assets/ui/buttonNormal.png';
import buttonTwo from '../assets/ui/buttonPressed.png';
import logo from '../assets/logo.png';
import box from '../assets/ui/grey_box.png';
import checkBox from '../assets/ui/blue_boxCheckmark.png';
import bg from '../assets/red/bkg1_front5.png';


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
    this.load.image('buttonTwo', buttonTwo);
    this.load.image('logo', logo);
    this.load.image('box', box);
    this.load.image('checkedBox', checkBox);
    this.load.audio('bgMusic', ['../src/assets/TownTheme.mp3']);
    
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