import React, { useEffect } from "react"
import { FaRegUserCircle } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user)

  useEffect(() => {}, [])

  return (
    <div dir="rtl" className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-[292px]">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="h-24 w-24 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold ">{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        {/* navigation */}
        <div>
          <nav className="grid p-4">
            <Link className="px-2 py-1 hover:bg-yellow-50" to={"all-users"}>
              All Users
            </Link>
            <Link className="px-2 py-1 hover:bg-yellow-50" to={"all-products"}>
              All Products
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
