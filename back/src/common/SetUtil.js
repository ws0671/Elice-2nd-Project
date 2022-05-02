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
      "notice", // 공지사항
      "humor", // 유머
      "partyRecruitment", // 파티 모집
      "postscript", // 후기
      "suggestions", // 건의사항
      "honeytip", // 꿀팁
      "default", // 선택 안함
    ];

    return categoryList.includes(category);
  },

  validatePermission: (grade, category) => {
    const categoryPermission = {
      // "notice"랑 "default"는 권한이 필요 없음
      humor: 0,
      partyRecruitment: 1,
      postscript: 2,
      suggestions: 3,
      honeytip: 4,
    };

    // 확인 가능한지를 true, false로 반환
    if (category == "notice" || category == "default") {
      return true;
    } else if (grade >= categoryPermission[category]) {
      return true;
    } else {
      return false;
    }
  },

  setPointAndGrade: (user, point) => {
    let result = {};
    result.isUpgraded = true;

    if (user.point + point >= 1500 && user.grade < 4) {
      result.toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 4,
        },
      };
    } else if (user.point + point >= 1000 && user.grade < 3) {
      result.toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 3,
        },
      };
    } else if (user.point + point >= 600 && user.grade < 2) {
      result.toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 2,
        },
      };
    } else if (user.point + point >= 300 && user.grade < 1) {
      result.toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 1,
        },
      };
    } else {
      result.toUpdate = {
        $inc: {
          point: point,
        },
      };
      result.isUpgraded = false;
    }

    return result;
  },

  calDate: ({ year, month, day }) => {
    const month31 = [1, 3, 5, 7, 8, 10, 12];
    const month30 = [4, 6, 9, 11];
    day -= 1;
    if (day === 0) {
      month -= 1;
      if (month === 0) {
        year -= 1;
        month = 12;
        day = 31;
      } else if (month31.indexOf(month) !== -1) {
        day = 31;
      } else if (month30.indexOf(month) !== -1) {
        day = 30;
      } else {
        if (year % 4 == 0) {
          day = 29;
        } else {
          day = 28;
        }
      }
    }

    if (month.toString().length === 1) {
      month = "0" + month;
    }

    if (day.toString().length === 1) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}T15:00:00.000Z`;
  },
};

export { SetUtil };
