const coursesModel = require("../../models/courses")

exports.create = async (request, response) => {
  data = new coursesModel({
    name: request.body.name,
    image: request.body.image,
    price: request.body.price,
    duration: request.body.duration,
    description: request.body.description,
    status: request.body.status ?? 1,
    order: request.body.order ?? 1,
  })

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
exports.details = async (request, response) => {
  var condition = {
    deleted_at: null,
  }

  await coursesModel
    .findById(request.params.id)
    .then((result) => {
      if (result != "") {
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

exports.update = async (request, response) => {
  data = {
    name: request.body.name,
    image: request.body.image,
    price: request.body.price,
    duration: request.body.duration,
    description: request.body.description,
    status: request.body.status ?? 1,
    order: request.body.order ?? 1,
  }

  await coursesModel
    .updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: data,
      }
    )
    .then((result) => {
      var res = {
        status: true,
        message: "Record update succussfully",
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

exports.changeStatus = async (request, response) => {
  const courseData = await coursesModel.findOne({
    _id: request.body.id,
  })

  // console.log(courseData.length);

  if (courseData == null) {
    var res = {
      status: false,
      message: "Id not match in the database",
    }

    response.send(res)
  }

  await coursesModel
    .updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: {
          status: request.body.status,
        },
      }
    )
    .then((result) => {
      var res = {
        status: true,
        message: "Record update succussfully",
        data: result,
      }

      response.send(res)
    })
    .catch((error) => {
      var res = {
        status: false,
        message: "Something went wrong",
      }

      response.send(res)
    })
}

exports.delete = async (request, response) => {
  const courseData = await coursesModel.findOne({
    _id: request.body.id,
    deleted_at: null,
  })

  if (courseData == null) {
    var res = {
      status: false,
      message: "Id not match in the database",
    }

    response.send(res)
  }

  await coursesModel
    .updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: {
          deleted_at: Date.now(),
        },
      }
    )
    .then((result) => {
      var res = {
        status: true,
        message: "Record delete succussfully",
      }

      response.send(res)
    })
    .catch((error) => {
      var res = {
        status: false,
        message: "Something went wrong",
      }

      response.send(res)
    })
}
