import React from "react"
import logo from "../assets/logo1.png"
import { GrSearch } from "react-icons/gr"
import { FaRegUserCircle } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
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
          <div className="text-3xl cursor-pointer">
            <FaRegUserCircle />
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
            <Link
              to={"/login"}
              className="px-3 py-1  duration-300 bg-yellow-400 rounded-xl hover:bg-yellow-500 transition-all font-bold"
            >
              ورود
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
