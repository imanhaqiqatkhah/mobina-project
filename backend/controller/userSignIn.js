const bcrypt = require("bcryptjs")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body
    if (!email) {
      throw new Error("لطفا ایمیل را به درستی وارد کنید")
    }
    if (!password) {
      throw new Error("لطفا پسورد را به درستی وارد کنید")
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      throw new Error("کاربری با این ایمیل وجود ندارد")
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    console.log("checkPassword", checkPassword)

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      }

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      })

      const tokenOption = {
        httpOnly: true,
        secure: true,
      }

      res.cookie("token", token, tokenOption).json({
        message: "با موفقیت وارد شدید",
        data: token,
        success: true,
        error: false,
      })
    } else {
      throw new Error("لطفا پسورد را بررسی کنید")
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

module.exports = userSignInController
