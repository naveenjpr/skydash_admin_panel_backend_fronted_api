const express = require("express")
const route = express.Router()
const slidersController = require("../../controllers/backend/slider.controller")
const multer = require("multer")
const path = require("path")
const upload = multer({ dest: "uploads/sliders" })

const storage = multer.diskStorage({
  destination: function (req, file, cba) {
    cba(null, "uploads/sliders")
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
  route.post("/add", uploadImage, slidersController.create)
  route.post("/view", upload.none(), slidersController.view)
  // route.post("/details/:id", upload.none(), slidersController.details)
  // route.put("/update", uploadImage, slidersController.update)
  // route.put("/change-status", upload.none(), slidersController.changeStatus)
  // route.post("/delete", upload.none(), slidersController.delete)
  // route.post(
  //   "/multiple-delete",
  //   upload.none(),
  // slidersController.multipledelete
  // )

  app.use("/api/backend/sliders", route)
}
