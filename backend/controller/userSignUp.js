const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

async function userSignUpController(req, res) {
  try {
    const { name, email, password } = req.body

    const user = await userModel.findOne({ email })

    console.log("user", user)

    if (user) {
      throw new Error("از قبل حساب دارید")
    }

    if (!email) {
      throw new Error("لطفا ایمیل را به درستی وارد کنید")
    }
    if (!password) {
      throw new Error("لطفا پسورد را به درستی وارد کنید")
    }
    if (!name) {
      throw new Error("لطفا نام را به درستی وارد کنید")
    }

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hashSync(password, salt)

    if (!hashPassword) {
      throw new Error("اشتباه تایپی صورت گرفته")
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    }

    const userData = new userModel(payload)
    const saveUser = await userData.save()

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "کابر با موفقیت ایجاد شد",
    })
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

module.exports = userSignUpController
