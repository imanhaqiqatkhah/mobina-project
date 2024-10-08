import React, { useContext, useState } from "react"
import loginIcons from "../assets/logo.png"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import SummaryApi from "../common"
import { toast } from "react-toastify"
import Context from "../context"
// import logoIcon from "../assets/logo.svg"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const { fetchUserDetails } = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetails()
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }

  console.log("data login", data)

  return (
    <section dir="rtl" id="login">
      <div className="container p-4 mx-auto font-Koodak">
        <div className="w-full max-w-sm p-5 mx-auto bg-white rounded-md">
          <div className="w-24 h-24 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-3 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="">ایمیل: </label>
              <div className="p-2 rounded-md bg-slate-50">
                <input
                  type="email"
                  placeholder="ایمیل را وارد کنید"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full bg-transparent outline-none "
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
                  className="w-full h-full bg-transparent outline-none "
                />
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block mr-auto w-fit hover:underline text-yellow-950 "
              >
                فراموشی رمز
              </Link>
            </div>
            <button className="px-6 p-2 bg-yellow-400 max-w-[150px] rounded-xl hover:scale-105 transition-all duration-200 mx-auto block mt-6 font-bold">
              ادامه دادن
            </button>
          </form>
          <p className="my-5">
            اگر حساب ندارید؟{" "}
            <Link to={"/sign-up"} className=" text-yellow-950 hover:underline">
              ثبت نام
            </Link>
            <span> کنید</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
