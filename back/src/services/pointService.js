import { Point } from "../db";
import { SetUtil } from "../common/setUtil";
import moment from "moment";

const pointService = {
  addPoint: async ({ newPoint }) => {
    await Point.create({ newPoint });
  },
  checkPoint: async ({ userId, miniGame }) => {
    const date =
      moment().startOf("day").subtract(9, "hours").format(`YYYY-MM-DD`) +
      `T15:00:00.000Z`;

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
