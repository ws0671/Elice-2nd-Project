import { Router } from "express"
import { gameService } from "../services/gameService"

const gameRouter = Router()

gameRouter.get("/list/:page", async function (req, res, next) {
  try {
    const page = req.params.page
    const gamelist = await gameService.getGames({ page })

    res.status(200).send(gamelist)
  } catch (error) {
    next(error)
  }
})

gameRouter.get("/:gameId", async function (req, res, next) {
  try {
    const gameId = req.params.gameId
    const gameInfo = await gameService.getGameInfo({
      gameId,
    })

    res.status(200).send(gameInfo)
  } catch (error) {
    next(error)
  }
})

export { gameRouter }
