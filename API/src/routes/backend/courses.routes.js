const express = require("express")
const route = express.Router()
const coursesController = require("../../controllers/backend/courses.controller")
const multer = require("multer")
const path = require("path")
const upload = multer({ dest: "uploads/courses" })

const storage = multer.diskStorage({
  destination: function (req, file, cba) {
    cba(null, "uploads/courses")
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
  //   route.post("/add", upload.single("image"), coursesController.create)
  //   route.post("/add", upload.array("images", 12), coursesController.create)
  route.post("/add", uploadImage, coursesController.create)

  route.post("/view", upload.none(), coursesController.view)

  route.post("/details/:id", upload.none(), coursesController.details)

  route.put("/update", uploadImage, coursesController.update)

  route.put("/change-status", upload.none(), coursesController.changeStatus)

  route.post("/delete", upload.none(), coursesController.delete)
  route.post(
    "/multiple-delete",
    upload.none(),
    coursesController.multipledelete
  )

  app.use("/api/backend/courses", route)
}
