
const option = () => {
  const gameOptions = {

    // platform speed range, in pixels per second
    platformSpeedRange: [300, 300],

    // mountain speed, in pixels per second
    cloudSpeed: 40,

    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],

    // platform width range, in pixels
    platformSizeRange: [90, 300],

    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-5, 5],

    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 20,

    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],

    // player gravity
    playerGravity: 900,

    // player jump force
    jumpForce: 400,

    // player starting X position
    playerStartPosition: 200,

    // consecutive jumps allowed
    jumps: 2,

    // % of probability a coin appears on the platform
    dimPercent: 25,

    // % of probability a fire appears on the platform
    firePercent: 20,

    treePercent: 20,

    bushPercent: 20,

    rockPercent: 10,

    mashroomPercent: 10,

    waterPercent: 100,

    platforms: ['platform', 'platform3', 'platform4', 'platform5', 'platform6']
  };

  return gameOptions;
};


export default option;