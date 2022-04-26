class SetUtil {
  static compareValues(updateData, originData) {
    let updateObject = {};

    Object.entries(updateData).forEach((element) => {
      if (element[1] !== originData[element[0]])
        updateObject[element[0]] = element[1];
    });

    return updateObject;
  }
}

export { SetUtil };
