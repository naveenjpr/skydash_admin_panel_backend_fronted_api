const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const server = express()
server.use(cors())

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use("/uploads/courses", express.static("uploads/courses"))
server.use("/uploads/videos", express.static("uploads/videos"))
server.use("/uploads/sliders", express.static("uploads/sliders"))

server.get("/", (request, response) => {
  response.send("Server Working Fine.....")
})

// backend url
require("./src/routes/backend/categories.routes")(server)
require("./src/routes/backend/courses.routes")(server)
require("./src/routes/backend/videos.routes")(server)
require("./src/routes/backend/sliders.routes")(server)
require("./src/routes/backend/admin.user.routes")(server)

// fronted url
require("./src/routes/frontend/courses.routes")(server)
require("./src/routes/frontend/videos.routes")(server)
require("./src/routes/frontend/sliders.routes")(server)
require("./src/routes/frontend/user.routes")(server)

server.get("*", (request, response) => {
  response.send("Page not found.....")
})

mongoose
  .connect("mongodb://127.0.0.1:27017/skydash")
  .then(() => {
    server.listen("5000", () => {
      console.log("Database Connected!")
    })
  })
  .catch((error) => {
    console.log("Database Not Connected!" + error)
  })
