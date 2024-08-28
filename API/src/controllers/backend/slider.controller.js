const sliderModel = require("../../models/slider")

exports.create = async (request, response) => {
  console.log(request.body)
  data = new sliderModel({
    Slider_Heading: request.body.Slider_Heading,
    Slider_SubHeading: request.body.Slider_SubHeading,
    // Slider_Image: request.body.Slider_Image,
    status: request.body.status ?? 1,
    order: request.body.order ?? 1,
  })

  if (request.file != undefined) {
    if (request.file.filename != "") {
      data.image = request.file.filename
    }
  }

  await data
    .save()
    .then((result) => {
      var res = {
        status: true,
        message: "Record create succussfully",
        data: result,
      }

      response.send(res)
    })
    .catch((error) => {
      var error_messages = []

      for (let field in error.errors) {
        // console.log(field);
        error_messages.push(error.errors[field].message)
      }

      var res = {
        status: false,
        message: "Something went wrong",
        error_messages: error_messages,
      }

      response.send(res)
    })
}

exports.view = async (request, response) => {
  var condition = {
    deleted_at: null,
  }

  if (request.body.Slider_Heading != undefined) {
    if (request.body.Slider_Heading != "") {
      condition.Slider_Heading = new RegExp(request.body.Slider_Heading, "i")
    }
  }

  if (request.body.Slider_SubHeading != undefined) {
    if (request.body.Slider_SubHeading != "") {
      condition.Slider_SubHeading = request.body.Slider_SubHeading
    }
  }

  // if (request.body.duration != undefined) {
  //   if (request.body.duration != "") {
  //     condition.duration = new RegExp(request.body.duration, "i")
  //   }
  // }

  if (request.body.status != undefined) {
    if (request.body.status != "") {
      condition.status = request.body.status
    }
  }

  console.log(condition)

  await sliderModel
    .find(condition)
    .sort({ order: "asc" }, { _id: "desc" })
    .then((result) => {
      if (result.length > 0) {
        var res = {
          status: true,
          message: "Record found successfully !!",
          imagePath: "http://localhost:5000/uploads/slides/",
          data: result,
        }

        response.send(res)
      } else {
        var res = {
          status: false,
          message: "No Record found !!",
          data: "",
        }

        response.send(res)
      }
    })
    .catch((error) => {
      var res = {
        status: false,
        message: "Something went wrong !!",
      }

      response.send(res)
    })
}
// exports.details = async (request, response) => {
//   var condition = {
//     deleted_at: null,
//   }

//   await sliderModel
//     .findById(request.params.id)
//     .then((result) => {
//       if (result != "") {
//         var res = {
//           status: true,
//           message: "Record found successfully !!",
//           data: result,
//         }

//         response.send(res)
//       } else {
//         var res = {
//           status: false,
//           message: "No Record found !!",
//           data: "",
//         }

//         response.send(res)
//       }
//     })
//     .catch((error) => {
//       var res = {
//         status: false,
//         message: "Something went wrong !!",
//       }

//       response.send(res)
//     })
// }

// exports.update = async (request, response) => {
//   data = {
//     name: request.body.name,
//     price: request.body.price,
//     duration: request.body.duration,
//     description: request.body.description,
//     status: request.body.status ?? 1,
//     order: request.body.order ?? 1,
//   }
//   if (request.file != undefined) {
//     if (request.file.filename != "") {
//       data.image = request.file.filename
//     }
//   }
//   await sliderModel
//     .updateOne(
//       {
//         _id: request.body.id,
//       },
//       {
//         $set: data,
//       }
//     )
//     .then((result) => {
//       var res = {
//         status: true,
//         message: "Record update succussfully",
//         data: result,
//       }

//       response.send(res)
//     })
//     .catch((error) => {
//       var error_messages = []

//       for (let field in error.errors) {
//         // console.log(field);
//         error_messages.push(error.errors[field].message)
//       }

//       var res = {
//         status: false,
//         message: "Something went wrong",
//         error_messages: error_messages,
//       }

//       response.send(res)
//     })
// }

// exports.changeStatus = async (request, response) => {
//   const courseData = await sliderModel.findOne({
//     _id: request.body.id,
//   })

//   // console.log(courseData.length);

//   if (courseData == null) {
//     var res = {
//       status: false,
//       message: "Id not match in the database",
//     }

//     response.send(res)
//   }

//   await sliderModel
//     .updateOne(
//       {
//         _id: request.body.id,
//       },
//       {
//         $set: {
//           status: request.body.status,
//         },
//       }
//     )
//     .then((result) => {
//       var res = {
//         status: true,
//         message: "Record update succussfully",
//         data: result,
//       }

//       response.send(res)
//     })
//     .catch((error) => {
//       var res = {
//         status: false,
//         message: "Something went wrong",
//       }

//       response.send(res)
//     })
// }

// exports.delete = async (request, response) => {
//   const courseData = await sliderModel.findOne({
//     _id: request.body.id,
//     deleted_at: null,
//   })

//   if (courseData == null) {
//     var res = {
//       status: false,
//       message: "Id not match in the database",
//     }

//     response.send(res)
//   }

//   await sliderModel
//     .updateOne(
//       {
//         _id: request.body.id,
//       },
//       {
//         $set: {
//           deleted_at: Date.now(),
//         },
//       }
//     )
//     .then((result) => {
//       var res = {
//         status: true,
//         message: "Record delete succussfully",
//       }

//       response.send(res)
//     })
//     .catch((error) => {
//       var res = {
//         status: false,
//         message: "Something went wrong",
//       }

//       response.send(res)
//     })
// }

// exports.multipledelete = async (request, response) => {
//   console.log(request.body.ids)

//   await sliderModel
//     .updateMany(
//       {
//         _id: { $in: request.body.ids },
//       },
//       {
//         $set: {
//           deleted_at: Date.now(),
//         },
//       }
//     )
//     .then((result) => {
//       var res = {
//         status: true,
//         message: "Record delete succussfully",
//       }

//       response.send(res)
//     })
//     .catch((error) => {
//       var res = {
//         status: false,
//         message: "Something went wrong",
//       }

//       response.send(res)
//     })
// }
