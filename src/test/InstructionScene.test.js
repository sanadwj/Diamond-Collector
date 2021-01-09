import Phaser from 'phaser';
import InstructionScene from '../scenes/InstructionScene';
import 'jest-expect-subclass';

test('Bootscene should be a subclass of Phaser.Scene', () => {
  expect(InstructionScene).toBeSubclassOf(Phaser.Scene);
});