import { UserModel } from "../schemas/user"

const User = {
  create: async ({ newUser }) => {
    const createdNewUser = await UserModel.create(newUser)
    return createdNewUser
  },

  findByEmail: async ({ email }) => {
    const user = await UserModel.findOne({ email })
    return user
  },

  findById: async ({ id }) => {
    const user = await UserModel.findOne({ id })
    return user
  },

  findByNickname: async ({ nickname }) => {
    const user = await UserModel.findOne({ nickname })
    return user
  },

  update: async ({ id, updateObject }) => {
    const filter = { id } // 바꿀 대상 찾기
    const update = { $set: updateObject } // 바꿀 내용
    const option = { returnOriginal: false } // 옵션

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option)
    return updatedUser
  },
}

export { User }
