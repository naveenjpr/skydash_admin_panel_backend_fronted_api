const express = require("express")
const route = express.Router()
const courseController = require("../../controllers/frontend/courses.controller")

module.exports = (app) => {
  route.post("/view", courseController.view)

  app.use("/api/fronted/courses", route)
}
