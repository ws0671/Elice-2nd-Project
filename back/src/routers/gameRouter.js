import { Router } from "express"
import { gameAuthService } from "../services/gameService"

const gameAuthRouter = Router()

gameAuthRouter.get("/game/list/:page", async function (req, res, next) {
  try {
    const page = req.params.page
    const gamelist = await gameAuthService.getGames({ page })

    res.status(200).send(gamelist)
  } catch (error) {
    next(error)
  }
})

gameAuthRouter.get("/game/:gameId", async function (req, res, next) {
  try {
    const gameId = req.params.gameId
    const gameInfo = await gameAuthService.getGameInfo({
      gameId,
    })

    res.status(200).send(gameInfo)
  } catch (error) {
    next(error)
  }
})

export { gameAuthRouter }
