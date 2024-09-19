const coursesModel = require("../../models/courses")
var jwt = require("jsonwebtoken")
var secretKey = "123456789"

exports.view = async (request, response) => {
  console.log("first")
  console.log(request.headers.authorization)

  // if (!request.headers.authorization)
    // return response.status(401).json({ message: "please provoide a token" })

  if (request.headers.authorization.split(" ")[1] == undefined) {
    var res = {
      status: false,
      token_error: true,

      message: "token required",
    }
    response.send(res)
  }

  if (request.headers.authorization.split(" ")[1] == "") {
    var res = {
      status: false,
      token_error: true,

      message: "Invalid token required",
    }

    response.send(res)
  }

  // verify a token symmetric
  jwt.verify(
    request.headers.authorization.split(" ")[1],
    secretKey,
    function (error, result) {
      if (error) {
        var res = {
          status: false,
          message: "Incorrect token",
        }

        response.send(res)
      } else {
        var userDetails = result
        console.log(result)
      }
      // console.log(decoded.foo) // bar
    }
  )

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
      console.log(error)

      response.send(res)
    })
}
