const { request } = require("express")
const videosModel = require("../../models/video")

exports.create = async (request, response) => {
  console.log(request.body)

  data = new videosModel({
    name: request.body.name,
    topic: request.body.topic,
    link: request.body.link,
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
  var videocondition = {
    deleted_at: null,
  }
  if (request.body.name != undefined) {
    if (request.body.name != "") {
      videocondition.name = new RegExp(request.body.name, "i")
    }
  }

  if (request.body.topic != undefined) {
    if (request.body.topic != "") {
      videocondition.price = request.body.price
    }
  }

  if (request.body.link != undefined) {
    if (request.body.link != "") {
      videocondition.link = new RegExp(request.body.link, "i")
    }
  }

  if (request.body.status != undefined) {
    if (request.body.status != "") {
      videocondition.status = request.body.status
    }
  }

  await videosModel
    .find(videocondition)
    .sort({ order: "asc" }, { _id: "desc" })
    .then((result) => {
      if (result.length > 0) {
        var res = {
          status: true,
          message: "Record create succussfully",
          data: result,
        }
        response.send(res)
      } else {
        var res = {
          status: false,
          message: "no record found ",
          data: "",
        }
        response.send(res)
      }
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
exports.details = async (request, response) => {
  var videocondition = {
    deleted_at: null,
  }

  await videosModel
    .findById(request.params.id)
    .then((result) => {
      if (result != "") {
        var res = {
          status: true,
          message: "Record create succussfully",
          data: result,
        }
        response.send(res)
      } else {
        var res = {
          status: false,
          message: "no record found ",
          data: "",
        }
        response.send(res)
      }
    })
    .catch((error) => {
      var res = {
        status: false,
        message: "Something went wrong",
        error_messages: error_messages,
      }

      response.send(res)
    })
}
exports.update = async (request, response) => {
  data = {
    name: request.body.name,
    topic: request.body.topic,
    link: request.body.link,
    status: request.body.status ?? 1,
    order: request.body.order ?? 1,
  }

  await videosModel
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
  const videoData = await videosModel.findOne({
    _id: request.body.id,
  })

  // console.log(courseData.length);

  if (videoData == null) {
    var res = {
      status: false,
      message: "Id not match in the database",
    }

    response.send(res)
  }

  await videosModel
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
  const videoData = await videosModel.findOne({
    _id: request.body.id,
    deleted_at: null,
  })

  if (videoData == null) {
    var res = {
      status: false,
      message: "Id not match in the database",
    }

    response.send(res)
  }

  await videosModel
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
exports.multipledelete = async (request, response) => {
  console.log(request.body.ids)

  await videosModel
    .updateMany(
      {
        _id: { $in: request.body.ids },
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
