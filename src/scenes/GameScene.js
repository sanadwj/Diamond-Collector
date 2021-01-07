/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
import 'phaser';
import config from '../Config/config';
// import addPlatform from '../Objects/addPlatform';
import gameOptions from '../Objects/gameOption';

let game;
let cursors;
let player;
let jumpButton;

// global game options

window.focus();
// resize();
// window.addEventListener('resize', resize, false);


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {

    this.add.image(config.width / 2, config.height / 2, 'bground');

    // this.add.image(config.width * 2, config.height / 2 + 320, 'water');

    // group with all active mountains.
    this.cloudGroup = this.add.group();

    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // platform pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });


    this.treeGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(tree) {
        tree.scene.treePool.add(tree);
      },
    });

    this.treePool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(tree) {
        tree.scene.treeGroup.add(tree);
      },
    });


    this.bushGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(bush) {
        bush.scene.bushPool.add(bush);
      },
    });

    this.bushPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(bush) {
        bush.scene.bushGroup.add(bush);
      },
    });

    this.stoneGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(stone) {
        stone.scene.stonePool.add(stone);
      },
    });

    this.stonePool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(stone) {
        stone.scene.stoneGroup.add(stone);
      },
    });


    this.mashroomGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(mashroom) {
        mashroom.scene.mashroomPool.add(mashroom);
      },
    });

    this.mashroomPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(mashroom) {
        mashroom.scene.mashroomGroup.add(mashroom);
      },
    });

    // group with all active coins.
    this.dimGroup = this.add.group({

      // once a coin is removed, it's added to the pool
      removeCallback(dim) {
        dim.scene.dimPool.add(dim);
      },
    });

    // coin pool
    this.dimPool = this.add.group({

      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback(dim) {
        dim.scene.dimGroup.add(dim);
      },
    });

    // group with all active firecamps.
    this.fireGroup = this.add.group({

      // once a firecamp is removed, it's added to the pool
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });

    // fire pool
    this.firePool = this.add.group({

      // once a fire is removed from the pool, it's added to the active fire group
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });

    // keeping track of added platforms
    this.addedPlatforms = 0;

    // number of consecutive jumps made by the player so far
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width, x position and y position
    this.addPlatform(config.width, config.width / 2, config.height * gameOptions().platformVerticalLimit[1]);

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions().playerStartPosition, config.height * 0.7, 'robo');
    this.player.scaleX = 0.25;
    this.player.scaleY = 0.25;
    this.player.setGravityY(gameOptions().playerGravity);
    this.player.setDepth(2);

    // the player is not dying
    this.dying = false;

    // setting collisions between the player and the platform group
    this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function () {
      // play "run" animation if the player is on a platform
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    // setting collisions between the player and the coin group
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
    }, null, this);

    // setting collisions between the player and the fire group
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

    this.physics.add.overlap(this.player, this.waterGroup, () => {

    }, null, this);


    // checking for input
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
    // if this is not the starting platform...
    if (this.addedPlatforms > 1) {
      // is there a coin over the platform?
      if (Phaser.Math.Between(1, 100) <= gameOptions().dimPercent) {
        if (this.dimPool.getLength()) {
          const dim = this.dimPool.getFirst();
          dim.x = posX;
          dim.y = posY - 74;
          dim.alpha = 1;
          dim.active = true;
          dim.visible = true;
          this.dimPool.remove(dim);
        } else {
          const dim = this.physics.add.sprite(posX, posY - 60, 'dim');
          dim.setImmovable(true);
          dim.setVelocityX(platform.body.velocity.x);
          dim.setDepth(2);
          this.dimGroup.add(dim);
        }
      }

      // is there a fire over the platform?
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
          tree.x = posX;
          tree.y = posY - 115;
          tree.alpha = 1;
          tree.active = true;
          tree.visible = true;
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
    }
  }

  jump() {
    if ((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions().jumps))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.anims.play('jumping');
      this.player.setVelocityY(gameOptions().jumpForce * -1);
      this.playerJumps ++;

      // stops animation
      this.player.anims.stop();
    }
  }

  update() {
    // game over
    if (this.player.y > config.height) {
      this.scene.start('Game');
    }

    this.player.x = gameOptions().playerStartPosition;

    // recycling platforms
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

    // recycling coins
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

    // recycling fire
    this.fireGroup.getChildren().forEach(function (fire) {
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

    // adding new platforms
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
}
