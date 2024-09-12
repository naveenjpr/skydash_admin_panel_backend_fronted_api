const express = require("express")
const route = express.Router()
const userController = require("../../controllers/frontend/users.controller")

module.exports = (app) => {
  route.post("/send-mail", userController.sendMail)
  route.post("/register", userController.register)
  route.post("/login", userController.login)
  route.post("/profile", userController.profile)

  app.use("/api/fronted/users", route)
}
// npm install bcrypt --fallback-to-build=false
// npm install -g node-pre-gyp
// npm install bcrypt@5.0.1