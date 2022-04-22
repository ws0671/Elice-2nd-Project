import { GameModel } from "../schemas/game"

const Game = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameModel.create(newGame)
    return createdNewGame
  },

  findById: async ({ appId }) => {
    const game = await GameModel.findOne({ appId })
    return game
  },

  /*update: async ({ appId, updateObject }) => {
    const filter = { appId } // 바꿀 대상 찾기
    const update = { $set: updateObject } // 바꿀 내용
    const option = { returnOriginal: false } // 옵션

    const updatedGame = await GameModel.findOneAndUpdate(filter, update, option)
    return updatedGame
  },*/
}

export { Game }
