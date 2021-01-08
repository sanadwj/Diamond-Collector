import Phaser from 'phaser';

import config from '../Config/config';
import scoreData from '../score/api';

export default class InputScene extends Phaser.Scene {

  create() {
    this.add.image(config.width / 2, config.height / 2, 'board').setScale(2);
    const text = this.add.text(config.width / 2 - 90, config.height / 2 - 250, 'Please, enter your name', { color: '#5d1512', fontFamily: 'Arial', fontSize: '32px ' });
    text.setScale(0.7);
    const element = document.getElementById('name-form');
    element.style.display = 'block';


    element.addEventListener('click', (event) => {
      if (event.target.name === 'saveNameBtn') {
        const inputName = document.getElementById('name');


        if (inputName.value !== '') {
          element.style.display = 'none';
          scoreData.nameSetter(inputName.value);
          self.scene.start('Game');
        } else {
          const warning = document.getElementById('warning');
          warning.style.display = 'block';

          setInterval(() => {
            warning.style.display = 'none';
          }, 6000);
        }
      } else if (event.target.name === 'back') {
        element.style.display = 'none';
        this.scene.start('Title');
      }
    });
  }
}
