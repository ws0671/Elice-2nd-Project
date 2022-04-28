import { UserModel } from "../schemas/user";

const User = {
  create: async ({ newUser }) => {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  },

  findByEmail: async ({ email }) => {
    const user = await UserModel.findOne({ email });
    return user;
  },

  findById: async ({ userId }) => {
    const user = await UserModel.findOne({ userId });
    return user;
  },

  findByNickname: async ({ nickname }) => {
    const user = await UserModel.findOne({ nickname });
    return user;
  },

  update: async ({ userId, toUpdate }) => {
    const filter = { userId }; // 바꿀 대상 찾기
    const update = toUpdate; // 바꿀 내용
    const option = { returnOriginal: false }; // 옵션

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  },

  deleteById: async ({ userId }) => {
    const deleteResult = await UserModel.deleteOne({ userId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  },
};

export { User };
