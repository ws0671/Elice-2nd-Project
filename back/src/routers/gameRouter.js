import { Router } from "express"
import { gameAuthService } from "../services/gameService"

const gameAuthRouter = Router()

gameAuthRouter.get("/game/:gameId", async function (req, res, next) {
  try {
    const gameId = req.params.gameId
    const gameInfo = await gameAuthService.getGameInfo({
      gameId,
    })

    if (gameInfo.errorMessage) {
      throw new Error(gameInfo.errorMessage)
    }

    res.status(200).send(gameInfo)
  } catch (error) {
    next(error)
  }
})
