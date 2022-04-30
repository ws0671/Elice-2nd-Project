import { PointModel } from "../index";

const Point = {
  findByFilter: async (filter) => {
    const pointInfo = await PointModel.findOne(filter);
    return pointInfo;
  },
};

export { Point };
