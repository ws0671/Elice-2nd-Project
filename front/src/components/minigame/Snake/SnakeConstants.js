const CanvasSize = [800, 800];
const SnakeStart = [
  [8, 7],
  [8, 8],
];
const AppleStart = [8, 3];
const Scale = 40;
const Speed = 200;
const Directions = {
  38: [0, -1], // UP
  40: [0, 1], // DOWN
  37: [-1, 0], // LEFT
  39: [1, 0], // RIGHT
};

export { CanvasSize, SnakeStart, AppleStart, Scale, Speed, Directions };
