import Phaser from 'phaser';

import config from '../Config/config';
import scoreData from '../score/api';

export default class InputScene extends Phaser.Scene {
  // preload() {
  //   this.load.html('nameform', '../src/assets/form.html');
  // }

  create() {
    const self = this;
    const text = this.add.text(config.width / 3.3, 10, 'Please, enter your name', { color: 'white', fontFamily: 'Arial', fontSize: '32px ' });
    console.log(text)
    const element = document.getElementById('name-form')
    element.style.display = 'block';
    console.log(element)

 
    element.addEventListener('click', (event) => {
      if (event.target.name === 'saveNameBtn') {
        const inputName = document.getElementById('name');
        

        if (inputName.value !== '') {
          element.remove()

          scoreData.nameSetter(inputName.value);
          self.scene.start('Game');
        } else {
          const warning = document.getElementById('warning');
          warning.style.display = 'block';

          setInterval(() => {
            warning.style.display = 'none';
          }, 6000);
        }
      }
    });

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }
}
