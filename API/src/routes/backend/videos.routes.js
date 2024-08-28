const express = require("express")
const route = express.Router()
const videosController = require("../../controllers/backend/videos.controller")
const multer = require("multer")
const path = require("path")
const upload = multer({ dest: "uploads/videos" })

const storage = multer.diskStorage({
  destination: function (req, file, cba) {
    cba(null, "uploads/videos")
  },
  filename: function (req, file, cba) {
    const uniqueSuffix = Date.now()
    var imagepath = path.extname(file.originalname)
    console.log(file.fieldname + "-" + uniqueSuffix + imagepath)
    cba(null, file.fieldname + "-" + uniqueSuffix + imagepath)
    // cba (null,file.originalname)
  },
})

const uploadImage = multer({ storage: storage }).single("image")

module.exports = (app) => {
  route.post("/add", uploadImage, videosController.create)
  route.post("/view", upload.none(), videosController.view)
  route.post("/details/:id", upload.none(), videosController.details)
  route.put("/update", uploadImage, videosController.update)
  route.put("/change-status", upload.none(), videosController.changeStatus)
  route.post("/delete", upload.none(), videosController.delete)
  route.post("/multiple-delete", upload.none(), videosController.multipledelete)

  app.use("/api/backend/videos", route)
}
