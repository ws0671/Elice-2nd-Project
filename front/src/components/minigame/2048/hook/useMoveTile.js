import { useEffect } from "react";
import { addKeyObserver, removeKeyObserver } from "../util/keyboard";
import { makeTile, moveTile } from "../util/tile";

let tried = 0;
const useMoveTile = ({ tileList, setTileList, setScore }) => {
  useEffect(() => {
    const moveAndAdd = ({ x, y }) => {
      try {
        // 움직이고 추가까지
        console.log("moveAndAdd 실행");
        const newTileList = moveTile({ tileList, x, y }); // moveTile은 타일을 움직이고 새로운 타일을 주는 함수
        // 그럼 그대로 움직인 다음에 추가
        const score = newTileList.reduce(
          (acc, item) => (item.isMerged ? acc + item.value : acc),
          0
        );
        setScore((v) => v + score);
        const newTile = makeTile(newTileList);
        if (!newTile) {
          tried += 1;
          console.log(tried);
          if (tried == 4) {
            alert("!!! You Lose !!!");
          }
        } else {
          newTile.isNew = true;
          newTileList.push(newTile);
          setTileList(newTileList);
        }
      } catch (err) {
        console.log("moveAndAdd 에러");
        console.log(err);
      }
    };

    const moveUp = () => {
      moveAndAdd({ x: 0, y: -1 });
      console.log("moveUp 실행");
    };
    const moveDown = () => {
      moveAndAdd({ x: 0, y: 1 });
      console.log("moveDown 실행");
    };
    const moveLeft = () => {
      moveAndAdd({ x: -1, y: 0 });
      console.log("moveLeft 실행");
    };
    const moveRight = () => {
      moveAndAdd({ x: 1, y: 0 });
      console.log("moveRight 실행");
    };
    try {
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
    } catch (err) {
      console.log("return쪽 에러");
    }
  }, [tileList, setTileList, setScore]);
};

export default useMoveTile;
