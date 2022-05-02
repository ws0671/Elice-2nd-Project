import { Point } from "../db";
import { SetUtil } from "../common/setUtil";
import moment from "moment";

const pointService = {
  addPoint: async ({ newPoint }) => {
    await Point.create({ newPoint });
  },
  checkPoint: async ({ userId, miniGame }) => {
    // const date = `2022-04-29T15:00:00.000Z`
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const date = SetUtil.calDate({ year, month, day });

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
