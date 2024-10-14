import React, { useState } from "react"
import logo from "../assets/logo1.png"
import { GrSearch } from "react-icons/gr"
import { FaRegUserCircle } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import SummaryApi from "../common"
import { toast } from "react-toastify"
import { setUserDetails } from "../store/userSlice"

const Header = () => {
  const user = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if (data.error) {
      toast.error(data.message)
    }
  }
  return (
    <header dir="rtl" className="h-16 shadow-md bg-white font-Koodak">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        <div className="md:w-72">
          <Link to={"/"}>
            <img src={logo} alt="logo" width={120} height={50} />
          </Link>
        </div>

        <div className="items-center justify-between hidden w-full max-w-xl pl-2 xl:ml-96 md:ml-60 border rounded-xl md:flex focus-within:shadow">
          <div className="min-w-[50px] h-8 text-lg bg-yellow-400 flex items-center justify-center rounded-r-xl  cursor-pointer">
            <GrSearch />
          </div>
          <input
            type="text"
            placeholder="جستجوی کالا"
            className="w-full pr-2 outline-none"
          />
        </div>
        <div dir="ltr" className="flex items-center gap-x-5">
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="mx-auto h-10 w-10  sm:h-11 md:w-96 lg:w-60 md:h-22 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>

            {menuDisplay && (
              <div className="bg-white bottom-0 absolute top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  <Link
                    to={"admin-panel"}
                    className="whitespace-nowrap hidden md:block hover:bg-yellow-50 p-2"
                    onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                    پروفایل
                  </Link>
                </nav>
              </div>
            )}
          </div>
          <div className="relative text-2xl">
            <span>
              <FaShoppingCart />
            </span>
            <div className="absolute flex items-center justify-center w-5 h-5 p-1 text-black bg-yellow-400 rounded-full -top-2 -right-3">
              <p className="text-xs ">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1  duration-300 bg-yellow-400 rounded-xl hover:bg-yellow-500 transition-all font-bold"
              >
                خروج
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1  duration-300 bg-yellow-400 rounded-xl hover:bg-yellow-500 transition-all font-bold"
              >
                ورود
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
