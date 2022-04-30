import { PointModel } from "../schemas/point";

const Point = {
  create: async ({ newPoint }) => {
    await PointModel.create(newPoint);
  },
  findByFilter: async (filter) => {
    const pointInfo = await PointModel.findOne(filter);
    return pointInfo;
  },
};

export { Point };
