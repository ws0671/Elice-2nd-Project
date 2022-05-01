export const isGameOver = (board) => {
  if (moveLeft(board) !== board) return false;
  if (moveRight(board) !== board) return false;
  if (moveTop(board) !== board) return false;
  if (moveBottom(board) !== board) return false;
  return true;
};
