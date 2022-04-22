import { Game } from "../db" // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid"

const gameAuthService = {
  getGameInfo: async ({ gameId }) => {
    const game = await Game.findById({ gameId })
    if (!game) {
      throw new Error("해당 게임이 없습니다. 다시 한 번 확인해 주세요.")
    }
    return game
  },

  getGames: async () => {
    const games = await Game.findAll()
    return games
  },
}

export { gameAuthService }
