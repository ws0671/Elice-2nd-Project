import { Router } from "express"
import res from "express/lib/response"
import { restart } from "nodemon"
import { gameAuthService } from "../services/gameService"

const gameAuthRouter = Router()

gameAuthRouter.get("/game/list/:page", async function (req, res, next) {
  try {
    const page = req.params.page
    const gamelist = await gameAuthService.getGames({ page })

    if (gamelist.errorMessage) {
      throw new Error(gamelist.errorMessage)
    }

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

    if (gameInfo.errorMessage) {
      throw new Error(gameInfo.errorMessage)
    }

    res.status(200).send(gameInfo)
  } catch (error) {
    next(error)
  }
})

export { gameAuthRouter }
