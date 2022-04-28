const SetUtil = {
  compareValues: (updateData, originData) => {
    let updateObject = {};

    Object.entries(updateData).forEach((element) => {
      if (element[1] !== originData[element[0]])
        updateObject[element[0]] = element[1];
    });

    const toUpdate = { $set: updateObject };

    return toUpdate;
  },

  validateCategory: (category) => {
    const categoryList = [
      "공지사항",
      "유머",
      "파티 모집",
      "후기",
      "건의사항",
      "꿀팁",
      "선택 안함",
    ];

    return categoryList.includes(category);
  },

  validatePermission: (grade, category) => {
    const categoryPermission = {
      // "공지사항"이랑 "선택 안함"은 권한이 필요 없음
      유머: 0,
      "파티 모집": 1,
      후기: 2,
      건의사항: 3,
      꿀팁: 4,
    };

    // 확인 가능한지를 true, false로 반환
    if (category == "공지사항" || category == "선택 안함") {
      return true;
    } else if (grade >= categoryPermission[category]) {
      return true;
    } else {
      return false;
    }
  },

  setPointAndGrade: (user, point) => {
    let toUpdate;

    if (user.point + point >= 1500 && user.grade < 4) {
      toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 4,
        },
      };
    } else if (user.point + point >= 1000 && user.grade < 3) {
      toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 3,
        },
      };
    } else if (user.point + point >= 600 && user.grade < 2) {
      toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 2,
        },
      };
    } else if (user.point + point >= 300 && user.grade < 1) {
      toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 1,
        },
      };
    } else {
      toUpdate = {
        $inc: {
          point: point,
        },
      };
    }

    return toUpdate;
  },
};

export { SetUtil };
