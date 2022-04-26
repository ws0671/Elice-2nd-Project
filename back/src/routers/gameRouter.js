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

gameRouter.get("/rankedList/:colName", async function (req, res, next) {
  try {
    const colName = req.params.colName
    const rankedList = await gameService.getRankedList({
      colName,
    })

    if (rankedList.errorMessage) {
      throw new Error(rankedList.errorMessage)
    }

    res.status(200).send(topTen)
  } catch (error) {
    next(error)
  }
})
export { gameRouter }
