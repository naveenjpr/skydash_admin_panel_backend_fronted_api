const express = require("express")
const route = express.Router()
const videosController = require("../../controllers/backend/videos.controller")

module.exports = (app) => {
  route.post("/add", videosController.create)
  route.post("/view", videosController.view)
  route.post("/details/:id", videosController.details)
  route.put("/update", videosController.update)
  // route.put("/change-status", videosController.changestatus)
  // route.delete("/delete", videosController.delete)

  app.use("/api/backend/videos", route)
}
