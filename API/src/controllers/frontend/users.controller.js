const nodemailer = require("nodemailer")

exports.sendMail = async (request, response) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "gmail",
    // port: 587,
    // secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "naveensainijpr@gmail.com",
      pass: "ihkfaqqvlnpdovcb",
    },
  })

  try {
    const info = await transporter.sendMail({
      from: '"Sandeep Bhati 👻" <naveensainijpr@gmail.com>', // sender address
      to: "naveensainijpr@gmail.com", // list of receivers
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
