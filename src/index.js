import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'phaser';
import Model from './Model';
import config from './Config/config';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import Board from './scenes/leaderBoard';
import GameScene from './scenes/GameScene';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Board', Board);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();