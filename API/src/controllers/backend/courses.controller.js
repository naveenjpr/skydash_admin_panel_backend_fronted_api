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
  var res = {
    status: true,
    message: "Record create succussfully",
    data: "",
  }

  response.send(res)
}

exports.update = async (request, response) => {}

exports.delete = async (request, response) => {}
