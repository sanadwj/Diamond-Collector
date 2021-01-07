import Phaser from 'phaser';

import config from '../Config/config';
import scoreData from '../score/api';
import Button from '../Objects/Button';

export default class InputScene extends Phaser.Scene {
  // preload() {
  //   this.load.html('nameform', '../src/assets/form.html');
  // }

  create() {
    const self = this;
    const text = this.add.text(config.width / 2 - 80, config.height / 2 - 200, 'Please, enter your name', { color: 'white', fontFamily: 'Arial', fontSize: '32px ' });
    text.setScale(0.7);
    const element = document.getElementById('name-form');
    element.style.display = 'block';


    element.addEventListener('click', (event) => {
      if (event.target.name === 'saveNameBtn') {
        const inputName = document.getElementById('name');


        if (inputName.value !== '') {
          element.remove();
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
