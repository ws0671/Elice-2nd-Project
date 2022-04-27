class SetUtil {
  static compareValues(updateData, originData) {
    let updateObject = {};

    Object.entries(updateData).forEach((element) => {
      if (element[1] !== originData[element[0]])
        updateObject[element[0]] = element[1];
    });

    const toUpdate = { $set: updateObject };

    return toUpdate;
  }

  static validateCategory(category) {
    const categoryList = [
      "공지사항",
      "자유",
      "꿀팁",
      "건의사항",
      "리뷰",
      "선택 안함",
    ];

    return categoryList.includes(category);
  }
}

export { SetUtil };
