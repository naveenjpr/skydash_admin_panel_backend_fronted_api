const express = require("express")
const route = express.Router()
const slidersController = require("../../controllers/frontend/sliders.controller")

module.exports = (app) => {
  route.post("/view", slidersController.view)

  app.use("/api/fronted/sliders", route)
}
