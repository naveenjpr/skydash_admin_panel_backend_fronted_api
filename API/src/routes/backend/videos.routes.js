const express = require("express")
const route = express.Router()
const videosController = require("../../controllers/backend/videos.controller")

module.exports = (app) => {
  route.post("/add", videosController.create)
  route.post("/view", videosController.view)
  route.post("/details/:id", videosController.details)
  route.put("/update", videosController.update)
  route.put("/change-status", videosController.changeStatus)
  route.post("/delete", videosController.delete)
  route.post("/multiple-delete", videosController.multipledelete)

  app.use("/api/backend/videos", route)
}
