import { GameModel } from "../schemas/game"

const Game = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameModel.create(newGame)
    return createdNewGame
  },

  findAll: async ({ page }) => {
    const games = await GameModel.find({})
      .skip((page - 1) * 10)
      .limit(10)
    return games
  },

  findById: async ({ gameId }) => {
    const game = await GameModel.findOne({ appId: gameId })
    return game
  },
}

export { Game }
