import Phaser from 'phaser';
import CreditsScene from '../scenes/CreditsScene';
import 'jest-expect-subclass';

test('CreditScene should be a subclass of Phaser.Scene', () => {
  expect(CreditsScene).toBeSubclassOf(Phaser.Scene);
});