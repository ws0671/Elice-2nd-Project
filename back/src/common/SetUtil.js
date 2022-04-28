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
};

export { SetUtil };
