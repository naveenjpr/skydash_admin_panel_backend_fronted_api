const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
const userModel = require("../../models/users")

exports.sendMail = async (request, response) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "gmail",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "naveensainijpr@gmail.com",
      pass: "kaff ized daqt ebrt",
    },
  })

  try {
    const info = await transporter.sendMail({
      from: '"naveen saini 👻" <naveensainijpr@gmail.com>', // sender address
      to: "yoeshsainijpr123@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    })

    var res = {
      status: true,
      message: "Record found successfully !!",
    }

    response.send(res)
  } catch (error) {
    var res = {
      status: false,
      message: "Record found successfully !!",
      error: error,
    }

    response.send(res)
  }
}

exports.register = async (request, response) => {
  var data = new userModel({
    name: request.body.name,
    email: request.body.email,
    mobile_number: request.body.mobile_number,
    password: bcrypt.hashSync(request.body.password, 10),
  })

  await data
    .save()
    .then((result) => {
      var resp = {
        status: true,
        message: "Record create successfully !!",
        result: result,
      }

      response.send(resp)
    })
    .catch((error) => {
      var resp = {
        status: false,
        message: "Something went wrong !!",
      }

      response.send(resp)
    })
}

exports.login = async (request, response) => {
  await userModel
    .findOne({
      email: request.body.email,
    })
    .then((result) => {
      if (result) {
        var compare = bcrypt.compareSync(request.body.password, result.password)

        if (compare) {
          var token = jwt.sign(
            {
              email: result.email,
            },
            secretKey,
            { expiresIn: "1h" }
          )

          var resp = {
            status: true,
            message: "Login successfully !!",
            token: token,
            result: result,
          }
        } else {
          var resp = {
            status: false,
            message: "Incorrect password !!",
          }
        }
      } else {
        var resp = {
          status: false,
          message: "No user found !!",
          result: result,
        }
      }

      response.send(resp)
    })
    .catch((error) => {
      var resp = {
        status: false,
        message: "Something went wrong !!",
      }

      response.send(resp)
    })
}
