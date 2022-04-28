const SetUtil = {
  compareValues: async (updateData, originData) => {
    let updateObject = {};

    Object.entries(updateData).forEach((element) => {
      if (element[1] !== originData[element[0]])
        updateObject[element[0]] = element[1];
    });

    const toUpdate = { $set: updateObject };

    return toUpdate;
  },

  validateCategory: async (category) => {
    const categoryList = [
      "공지사항",
      "유머",
      "파티 모집",
      "건의사항",
      "후기",
      "꿀팁",
      "선택 안함",
    ];

    return categoryList.includes(category);
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
