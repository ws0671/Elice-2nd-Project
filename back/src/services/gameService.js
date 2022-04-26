import { Game } from "../db" // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid"

const gameService = {
  getGameInfo: async ({ gameId }) => {
    const game = await Game.findById({ gameId })
    if (!game) {
      throw new Error("해당 게임이 없습니다. 다시 한 번 확인해 주세요.")
    }
    return game
  },

  getGames: async ({ page }) => {
    const games = await Game.findAll({ page })
    return games
  },

    getTopTen: async ({ col }) => {
    const games = await Game.sortByColumn({ col })
    return games
  },
}

export { gameService }