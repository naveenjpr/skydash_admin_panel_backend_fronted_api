const express = require("express")
const route = express.Router()
const videoController = require("../../controllers/frontend/videos.controller")

module.exports = (app) => {
  route.post("/view", videoController.view)

  app.use("/api/fronted/videos", route)
}
