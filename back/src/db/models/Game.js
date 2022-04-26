import { GameModel } from "../schemas/game"

const Game = {
  create: async ({ newGame }) => {
    const createdNewGame = await GameModel.create(newGame)
    return createdNewGame
  },

  findAll: async ({ page, numOfPageSkip = 10, numOfPageLimit = 10 }) => {
    const games = await GameModel.find({})
      .skip((page - 1) * numOfPageSkip)
      .limit(numOfPageLimit)
    return games
  },

  findById: async ({ gameId }) => {
    const game = await GameModel.findOne({ appId: gameId })
    return game
  },

  sortByColumn: async ({ col }) => {
    const games = await GameModel.find({})
      .sort({ [col]: -1 })
      .limit(10)
    return games
  },
}

export { Game }
