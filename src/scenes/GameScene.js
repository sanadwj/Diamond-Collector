/* eslint-disable no-unused-vars, no-plusplus, max-len, func-names, class-methods-use-this */
import Phaser from 'phaser';
import config from '../Config/config';
import gameOptions from '../Objects/gameOption';
import score from '../score/api';

window.focus();
let scoreText;
let scored = 0;


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.add.image(config.width / 2, config.height / 2, 'bground');
    this.add.image(config.width / 2, config.height / 2 - 300, 'scoreBoard');


    this.cloudGroup = this.add.group();

    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });


    this.treeGroup = this.add.group({
      removeCallback(tree) {
        tree.scene.treePool.add(tree);
      },
    });

    this.treePool = this.add.group({
      removeCallback(tree) {
        tree.scene.treeGroup.add(tree);
      },
    });


    this.bushGroup = this.add.group({
      removeCallback(bush) {
        bush.scene.bushPool.add(bush);
      },
    });

    this.bushPool = this.add.group({
      removeCallback(bush) {
        bush.scene.bushGroup.add(bush);
      },
    });

    this.stoneGroup = this.add.group({
      removeCallback(stone) {
        stone.scene.stonePool.add(stone);
      },
    });

    this.stonePool = this.add.group({
      removeCallback(stone) {
        stone.scene.stoneGroup.add(stone);
      },
    });


    this.mashroomGroup = this.add.group({
      removeCallback(mashroom) {
        mashroom.scene.mashroomPool.add(mashroom);
      },
    });

    this.mashroomPool = this.add.group({
      removeCallback(mashroom) {
        mashroom.scene.mashroomGroup.add(mashroom);
      },
    });

    this.dimGroup = this.add.group({
      removeCallback(dim) {
        dim.scene.dimPool.add(dim);
      },
    });

    this.dimPool = this.add.group({
      removeCallback(dim) {
        dim.scene.dimGroup.add(dim);
      },
    });

    this.fireGroup = this.add.group({
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });

    this.firePool = this.add.group({
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });

    this.addedPlatforms = 0;

    this.playerJumps = 0;

    this.addPlatform(config.width, config.width / 2, config.height * gameOptions().platformVerticalLimit[1]);

    scoreText = this.add.text(config.width / 2 - 50, config.height / 2 - 315, '0', { fontSize: '32px', fill: '#ffffff', textalign: 'center' }).setDepth(2);

    this.player = this.physics.add.sprite(gameOptions().playerStartPosition, config.height * 0.7, 'robo');
    this.player.scaleX = 0.25;
    this.player.scaleY = 0.25;
    this.player.setGravityY(gameOptions().playerGravity);
    this.player.setDepth(2);

    this.dying = false;

    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function () {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.dimGroup, function (player, dim) {
      this.tweens.add({
        targets: dim,
        y: dim.y - 74,
        alpha: 0,
        duration: 800,
        ease: 'Cubic.easeOut',
        callbackScope: this,
        onComplete() {
          this.dimGroup.killAndHide(dim);
          this.dimGroup.remove(dim);
        },
      });
      this.collectStar(player, dim);
    }, null, this);

    this.physics.add.overlap(this.player, this.fireGroup, function () {
      this.dying = true;
      this.player.anims.play('died');
      this.player.scaleX = 0.25;
      this.player.anims.stop();
      this.player.setFrame(2);
      this.player.body.setVelocityY(-200);
      this.physics.world.removeCollider(this.platformCollider);
    }, null, this);

    this.physics.add.overlap(this.player, this.treeGroup, () => {

    }, null, this);

    this.physics.add.overlap(this.player, this.bushGroup, () => {

    }, null, this);

    this.physics.add.overlap(this.player, this.stoneGroup, () => {

    }, null, this);

    this.physics.add.overlap(this.player, this.stoneGroup, () => {

    }, null, this);

    this.input.keyboard.on('keydown-SPACE', this.jump, this);
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms++;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 80, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(gameOptions().platformSpeedRange[0], gameOptions().platformSpeedRange[1]) * -1);
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions().spawnRange[0], gameOptions().spawnRange[1]);

    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions().dimPercent) {
        if (this.dimPool.getLength()) {
          const dim = this.dimPool.getFirst();
          dim.x = posX;
          dim.y = posY - 80;
          dim.alpha = 1;
          dim.active = true;
          dim.visible = true;
          this.dimPool.remove(dim);
        } else {
          const dim = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 80, 'dim');
          dim.setImmovable(true);
          dim.setVelocityX(platform.body.velocity.x);
          dim.setDepth(2);
          this.dimGroup.add(dim);
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameOptions().firePercent) {
        if (this.firePool.getLength()) {
          const fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth / 2);
          fire.y = posY - 70;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 70, 'fire');
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(6, 2, true);
          fire.anims.play('burn');
          fire.setDepth(1);
          this.fireGroup.add(fire);
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameOptions().treePercent) {
        if (this.treePool.getLength()) {
          const tree = this.treePool.getFirst();
          tree.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth / 2);
          tree.y = posY - 115;
          tree.setScale(0.5);
          this.treePool.remove(tree);
        } else {
          const tree = this.physics.add.sprite(posX, posY - 115, 'tree');
          tree.setImmovable(true);
          tree.setVelocityX(platform.body.velocity.x);
          tree.setDepth(0);
          tree.setScale(0.5);
          this.treeGroup.add(tree);
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameOptions().bushPercent) {
        if (this.bushPool.getLength()) {
          const bush = this.bushPool.getFirst();
          bush.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth / 2) - 30;
          bush.y = posY - 50;
          bush.setScale(0.6);
          this.bushPool.remove(bush);
        } else {
          const bush = this.physics.add.sprite(posX - 30, posY - 50, 'bush');
          bush.setImmovable(true);
          bush.setVelocityX(platform.body.velocity.x);
          bush.setDepth(0);
          bush.setScale(0.6);
          this.bushGroup.add(bush);
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameOptions().stonePercent) {
        if (this.stonePool.getLength()) {
          const stone = this.stonePool.getFirst();
          stone.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth / 2) - 30;
          stone.y = posY - 50;
          stone.setScale(0.6);
          this.stonePool.remove(stone);
        } else {
          const stone = this.physics.add.sprite(posX + 20, posY - 50, 'stone');
          stone.setImmovable(true);
          stone.setVelocityX(platform.body.velocity.x);
          stone.setDepth(0);
          stone.setScale(0.6);
          this.stoneGroup.add(stone);
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameOptions().mashroomPercent) {
        if (this.mashroomPool.getLength()) {
          const mashroom = this.mashroomPool.getFirst();
          mashroom.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth / 2) - 30;
          mashroom.y = posY - 50;
          mashroom.setScale(0.6);
          this.mashroomPool.remove(mashroom);
        } else {
          const mashroom = this.physics.add.sprite(posX - 20, posY - 50, 'mashroom');
          mashroom.setImmovable(true);
          mashroom.setVelocityX(platform.body.velocity.x);
          mashroom.setDepth(0);
          mashroom.setScale(0.6);
          this.mashroomGroup.add(mashroom);
        }
      }
    }
  }

  jump() {
    if ((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions().jumps))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.anims.play('jumping');
      this.player.setVelocityY(gameOptions().jumpForce * -1);
      this.playerJumps++;

      this.player.anims.stop();
    }
  }

  update() {
    if (this.player.y > config.height) {
      const final = scored;
      score.scoreSetter(final);
      score.postScores();
      this.scene.start('GameOver');
    }


    this.player.x = gameOptions().playerStartPosition;

    let minDistance = config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function (platform) {
      const platformDistance = config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    this.dimGroup.getChildren().forEach(function (dim) {
      if (dim.x < -dim.displayWidth / 2) {
        this.dimGroup.killAndHide(dim);
        this.dimGroup.remove(dim);
      }
    }, this);

    this.treeGroup.getChildren().forEach(function (tree) {
      if (tree.x < -tree.displayWidth / 2) {
        this.treeGroup.killAndHide(tree);
        this.treeGroup.remove(tree);
      }
    }, this);

    this.fireGroup.getChildren().forEach(function (fire) {
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

    this.bushGroup.getChildren().forEach(function (bush) {
      if (bush.x < -bush.displayWidth / 2) {
        this.bushGroup.killAndHide(bush);
        this.bushGroup.remove(bush);
      }
    }, this);

    this.stoneGroup.getChildren().forEach(function (stone) {
      if (stone.x < -stone.displayWidth / 2) {
        this.stoneGroup.killAndHide(stone);
        this.stoneGroup.remove(stone);
      }
    }, this);


    this.mashroomGroup.getChildren().forEach(function (mashroom) {
      if (mashroom.x < -mashroom.displayWidth / 2) {
        this.mashroomGroup.killAndHide(mashroom);
        this.mashroomGroup.remove(mashroom);
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions().platformSizeRange[0], gameOptions().platformSizeRange[1]);
      const platformRandomHeight = gameOptions().platformHeighScale * Phaser.Math.Between(gameOptions().platformHeightRange[0], gameOptions().platformHeightRange[1]);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = config.height * gameOptions().platformVerticalLimit[0];
      const maxPlatformHeight = config.height * gameOptions().platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }

  collectStar(player, dim) {
    dim.disableBody(true, true);
    scored += 10;
    scoreText.setText(`${scored}`);
  }
}
