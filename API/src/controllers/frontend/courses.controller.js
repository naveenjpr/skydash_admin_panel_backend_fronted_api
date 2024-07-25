const coursesModel = require("../../models/courses")

exports.view = async (request, response) => {
  var condition = {
    deleted_at: null,
    status: 1,
  }

  if (request.body.name != undefined) {
    if (request.body.name != "") {
      condition.name = new RegExp(request.body.name, "i")
    }
  }

  if (request.body.price != undefined) {
    if (request.body.price != "") {
      condition.price = request.body.price
    }
  }

  if (request.body.duration != undefined) {
    if (request.body.duration != "") {
      condition.duration = new RegExp(request.body.duration, "i")
    }
  }

  if (request.body.status != undefined) {
    if (request.body.status != "") {
      condition.status = request.body.status
    }
  }

  console.log(condition)

  await coursesModel
    .find(condition)
    .sort({ order: "asc" }, { _id: "desc" })
    .then((result) => {
      if (result.length > 0) {
        var res = {
          status: true,
          message: "Record found successfully !!",
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
