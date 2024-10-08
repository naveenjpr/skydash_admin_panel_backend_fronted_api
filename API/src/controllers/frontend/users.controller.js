const nodemailer = require("nodemailer")
var bcrypt = require("bcryptjs")
const userModel = require("../../models/users")
var jwt = require("jsonwebtoken")

var secretKey = "123456789"

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
    // password: request.body.password,
  })

  await data
    .save()
    .then((result) => {
      var token = jwt.sign(
        {
          userData: result,
        },
        secretKey,
        { expiresIn: "1h" }
      )

      var resp = {
        status: true,
        message: "Record create successfully !!",
        token: token,
      }

      response.send(resp)
    })
    .catch((error) => {
      var resp;
      if(error.keyPattern.email==1){
        resp = {
          status: false,
          message: "email id allready use",
        }
  
      }
      else if(error.keyPattern.mobile_number==1){
        resp = {
          status: false,
          message: "mobile_number  allready ",
        }
  
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
              userData: result,
            },
            secretKey,
            { expiresIn: "1d" }
          )

          var resp = {
            status: true,
            message: "Login successfully !!",
            token: token,
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

exports.profile = async (request, response) => {
  console.log(request.headers.authorization)

  if (request.headers.authorization == undefined) {
    var res = {
      status: false,
      token_error: true,
      message: "token required",
    }
    response.send(res)
  }

  if (request.headers.authorization == "") {
    var res = {
      status: false,
      token_error: true,
      message: "Invalid token required",
    }

    response.send(res)
  }

  // verify a token symmetric
  jwt.verify(
    request.headers.authorization,
    secretKey,
    function (error, result) {
      if (error) {
        var res = {
          status: false,
          token_error: true,
          message: "Incorrect token",
        }

        response.send(res)
      } else {
        var res = {
          status: true,
          message: "Profile found.",
          data: result,
        }

        response.send(res)
      }
    }
  )

  // console.log(request.query);

  // var resp = {
  //     status : false,
  //     message : 'Something went wrong !!'
  // }

  // response.send(resp);

  // await userModel.findOne(
  //     {
  //         email : request.body.email
  //     }
  // ).then((result) => {

  //     if(result){

  //         var compare = bcrypt.compareSync(request.body.password,result.password);

  //         if(compare){

  //             var token = jwt.sign(
  //                 {
  //                     userData: result
  //                 },
  //                 secretKey,
  //                 { expiresIn: '1h' });

  //             var resp = {
  //                 status : true,
  //                 message : 'Login successfully !!',
  //                 token : token,
  //             }
  //         } else {
  //             var resp = {
  //                 status : false,
  //                 message : 'Incorrect password !!'
  //             }
  //         }
  //     } else {
  //         var resp = {
  //             status : false,
  //             message : 'No user found !!',
  //             result : result
  //         }
  //     }

  //     response.send(resp);

  // }).catch((error) => {

  //     var resp = {
  //         status : false,
  //         message : 'Something went wrong !!'
  //     }

  //     response.send(resp);

  // });
}
