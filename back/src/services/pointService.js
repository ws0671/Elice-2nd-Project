import { Point } from "../db";

const pointService = {
  checkPoint: async ({ userId, miniGame, year, month, day }) => {
    // const date = `2022-04-29T15:00:00.000Z` //2014-12-24T00:00:00.000Z
    const date = setUtil.calDate({ year, month, day });

    const filter = { userId, miniGame, createdAt: { $gte: date } };

    let point = await Point.findByFilter(filter);

    if (!point) {
      point = { point: false };
    } else {
      point = { point: point.point };
    }

    return point;
  },
};

export { pointService };
