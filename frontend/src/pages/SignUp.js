import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import loginIcons from "../assets/logo2.png"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import imageTobase64 from "../helpers/imageTobase64"
import SummaryApi from "../common"
import { toast } from "react-toastify"
// import logoIcon from "../assets/logo.svg"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const dataApi = await dataResponse.json()

      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      }
      if (dataApi.error) {
        toast.error(dataApi.message)
      }
    } else {
      toast.error("لطفا پسورد ها را بررسی نمایید")
    }
  }

  return (
    <section dir="rtl" id="signup">
      <div className="container p-4 mx-auto font-Koodak">
        <div className="w-full max-w-sm p-5 mx-auto bg-white rounded-md">
          <div className="w-20 h-[117px] mx-auto relative overflow-hidden rounded-full">
            <div>
              <img
                src={data.profilePic || loginIcons}
                alt="login icons"
                className="mt-8"
              />
              <form action="">
                <label>
                  <div className="text-xs py-2  text-center bg-opacity-40 bg-amber-300 cursor-pointer text-gray-500 absolute bottom-0 w-full">
                    آپلود عکس
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>
          </div>

          <form className="flex flex-col gap-2 pt-6" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="">نام: </label>
              <div className="p-2 rounded-md bg-slate-50">
                <input
                  type="text"
                  placeholder="نام را وارد کنید"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none "
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="">ایمیل: </label>
              <div className="p-2 rounded-md bg-slate-50">
                <input
                  type="email"
                  placeholder="ایمیل را وارد کنید"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none font-sans"
                />
              </div>
            </div>
            <div>
              <label htmlFor="">رمز عبور: </label>
              <div className="flex p-2 rounded-md bg-slate-50">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور را وارد کنید"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none font-sans"
                />
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="">رمز عبور مجدد: </label>
              <div className="flex p-2 rounded-md bg-slate-50">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="رمز عبور را مجدد وارد کنید"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full bg-transparent outline-none font-sans"
                />
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="px-6 py-2 bg-yellow-400  max-w-[150px] rounded-xl hover:scale-105 transition-all duration-200 mx-auto block mt-6 font-bold">
              ثبت نام
            </button>
          </form>
          <p className="my-5">
            آیا حساب از قبل داشتید؟{" "}
            <Link to={"/login"} className=" text-yellow-950 hover:underline">
              ورود
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
