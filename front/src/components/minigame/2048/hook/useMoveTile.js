import { useEffect } from "react";
import { addKeyObserver, removeKeyObserver } from "../util/keyboard";
import { makeTile, moveTile } from "../util/tile";

const useMoveTile = ({ tileList, setTileList, setScore }) => {
  useEffect(() => {
    const moveAndAdd = ({ x, y }) => {
      // 움직이고 추가까지
      const { isChanged, newTileList } = moveTile({ tileList, x, y }); // 타일을 움직여서 새로운 타일을 주는
      console.log(isChanged);
      // 움직인 다음에 추가
      const score = newTileList.reduce(
        (acc, item) => (item.isMerged ? acc + item.value : acc),
        0
      );
      setScore((v) => v + score);
      const newTile = makeTile(newTileList);
      newTile.isNew = true;
      newTileList.push(newTile);
      setTileList(newTileList);
    };

    // const ableToMove = ({ x, y }) => {
    //   // 움직여보고 이전과 같은지 확인
    //   let isChanged;
    //   const { newTileList } = moveTile({ tileList, x, y }); // 타일을 움직여서 새로운 타일을 주는
    //   if (newTileList === tileList) {
    //     isChanged = false;
    //   } else {
    //     isChanged = true;
    //   }
    // }
    const moveUp = () => {
      moveAndAdd({ x: 0, y: -1 });
    };
    const moveDown = () => {
      moveAndAdd({ x: 0, y: 1 });
    };
    const moveLeft = () => {
      moveAndAdd({ x: -1, y: 0 });
    };
    const moveRight = () => {
      moveAndAdd({ x: 1, y: 0 });
    };
    addKeyObserver("up", moveUp);
    addKeyObserver("down", moveDown);
    addKeyObserver("left", moveLeft);
    addKeyObserver("right", moveRight);

    return () => {
      removeKeyObserver("up", moveUp);
      removeKeyObserver("down", moveDown);
      removeKeyObserver("left", moveLeft);
      removeKeyObserver("right", moveRight);
    };
  }, [tileList, setTileList, setScore]);
};

// 게임 끝났는지 확인
// export const isGameOver = (board) => {
//   if (moveLeft(board) !== board) return false;
//   if (moveRight(board) !== board) return false;
//   if (moveTop(board) !== board) return false;
//   if (moveBottom(board) !== board) return false;
//   return true;
// };

export default useMoveTile;
