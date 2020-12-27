/* eslint-disable no-undef */
import 'phaser';
import logo from '../assets/zenva_logo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', logo);
    this.add.image(400, 300, 'logo');
  }

  create() {
    this.scene.start('Preloader');
  }
}