import Phaser from 'phaser';
import LeaderBoard from '../scenes/leaderBoard';
import 'jest-expect-subclass';

test('LeaderBoardScene should be a subclass of Phaser.Scene', () => {
  expect(LeaderBoard).toBeSubclassOf(Phaser.Scene);
});