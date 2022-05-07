const CanvasSize = [600, 600];
const SnakeStart = [
  [8, 7],
  [8, 8],
];
const AppleStart = [8, 3];
const Scale = 30;
const Speed = 100;
const Directions = {
  38: [0, -1], // UP
  40: [0, 1], // DOWN
  37: [-1, 0], // LEFT
  39: [1, 0], // RIGHT
};

export { CanvasSize, SnakeStart, AppleStart, Scale, Speed, Directions };
