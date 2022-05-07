import Swal from "sweetalert2";
import { useEffect } from "react";
import { addKeyObserver, removeKeyObserver } from "../util/keyboard";
import { makeTile, moveTile } from "../util/tile";

let state = {};
const useMoveTile = ({ tileList, setTileList, setScore }) => {
  useEffect(() => {
    const moveAndAdd = ({ x, y }) => {
      // 움직이고 추가까지
      const newTileList = moveTile({ tileList, x, y }); // moveTile은 타일을 움직이고 새로운 타일을 주는 함수
      // 그럼 그대로 움직인 다음에 추가
      const score = newTileList.reduce(
        (acc, item) => (item.isMerged ? acc + item.value : acc),
        0
      );
      setScore((v) => v + score);
      const newTile = makeTile(newTileList);
      if (!newTile) {
        // 더이상 추가할 타일이 없을 때
        return true;
      } else {
        newTile.isNew = true;
        newTileList.push(newTile);
        setTileList(newTileList);
      }
    };

    const moveUp = () => {
      const canNotMove = moveAndAdd({ x: 0, y: -1 });
      if (canNotMove) {
        state["moveUp"] = false;
      }
      if (Object.keys(state).length == 4) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "GAME OVER!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    };
    const moveDown = () => {
      const canNotMove = moveAndAdd({ x: 0, y: 1 });
      if (canNotMove) {
        state["moveDown"] = false;
      }
      if (Object.keys(state).length == 4) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "GAME OVER!",
          text: "다시 시도하려면 New Game 버튼을 눌러주세요.",
          showConfirmButton: true,
          timer: 5000,
        });
      }
    };
    const moveLeft = () => {
      const canNotMove = moveAndAdd({ x: -1, y: 0 });
      if (canNotMove) {
        state["moveLeft"] = false;
      }
      if (Object.keys(state).length == 4) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "GAME OVER!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    };
    const moveRight = () => {
      const canNotMove = moveAndAdd({ x: 1, y: 0 });
      if (canNotMove) {
        state["moveRight"] = false;
      }
      if (Object.keys(state).length == 4) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "GAME OVER!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
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
  }, [tileList, setTileList, setScore, state]);
};

export default useMoveTile;
