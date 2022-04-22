import { GameModel } from "../schemas/game"

const Game = {
  create: async ({ newGame }) => {
    const createdNewGame = await UserModel.create(newGame)
    return createdNewGame
  },

  findAll: async () => {
    const games = await GameModel.find({})
    return games
  },
}

export { Game }
