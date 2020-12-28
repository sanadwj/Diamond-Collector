/* eslint-disable no-undef */
import 'phaser';
import logo from '../assets/zenva_logo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    this.scene.start('Preloader');
  }
}