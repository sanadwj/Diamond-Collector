import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';


export default class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'board').setScale(2);

    this.add.text(config.width / 2 - 90, config.height / 2 - 300, 'Instruction', { color: '#5d1512', fontFamily: 'Arial', fontSize: '32px ' });

    this.add.text(config.width / 2 - 220, config.height / 2 - 200, 'Welcome To the Game', { color: 'white', fontFamily: 'Arial', fontSize: '24px ' });

    this.add.text(config.width / 2 - 220, config.height / 2 - 150, 'The Instruction are simple:\n \n Click Play Enter your name and hit play. \n \n Use SpaceBar to jamp between Platforms.\n \n When you lose Yor score will be Saved on LeaderBoard API.\n ', { color: 'white', fontFamily: 'Arial', fontSize: '18px ' });

    this.backtButton = new Button(this, config.width / 2, config.height / 2 + 130, 'backBtnOne', 'backBtnTwo', '', 'Title').setScale(0.5);
  }
}