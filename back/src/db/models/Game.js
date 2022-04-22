import { GameModel } from "../schemas/game"

const Game = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameModel.create(newGame)
    return createdNewGame
  },

  findAll: async ({ lastGameId }) => {
    const games = await GameModel.find({ appId: { $gt: lastGameId } }).limit(10)
    return games
  },

  findById: async ({ gameId }) => {
    const game = await GameModel.findOne({ appId: gameId })
    return game
  },
}

export { Game }
