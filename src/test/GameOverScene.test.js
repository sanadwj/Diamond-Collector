import Phaser from 'phaser';
import GameOverScene from '../scenes/GameOverScene';
import 'jest-expect-subclass';

test('GameOverScene should be a subclass of Phaser.Scene', () => {
  expect(GameOverScene).toBeSubclassOf(Phaser.Scene);
});