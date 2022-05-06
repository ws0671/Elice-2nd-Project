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

  convertCategory: (category) => {
    const categoryList = {
      notice: "공지사항",
      humor: "유머",
      partyRecruitment: "파티 모집",
      postscript: "후기",
      suggestions: "건의사항",
      honeytip: "꿀팁",
      default: "선택 안함",
    };
    const categoryName = categoryList[category];

    return categoryName;
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

    const GRADE_4_THRESHOLD = 1500;
    const GRADE_3_THRESHOLD = 1000;
    const GRADE_2_THRESHOLD = 600;
    const GRADE_1_THRESHOLD = 300;

    if (user.point + point >= GRADE_4_THRESHOLD && user.grade < 4) {
      result.toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 4,
        },
      };
    } else if (user.point + point >= GRADE_3_THRESHOLD && user.grade < 3) {
      result.toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 3,
        },
      };
    } else if (user.point + point >= GRADE_2_THRESHOLD && user.grade < 2) {
      result.toUpdate = {
        $inc: {
          point: point,
        },
        $set: {
          grade: 2,
        },
      };
    } else if (user.point + point >= GRADE_1_THRESHOLD && user.grade < 1) {
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
  randomCode: () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code;
  },
};

export { SetUtil };
