/* eslint-disable no-undef */
import 'phaser';


export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    this.scene.start('Preloader');
  }
}