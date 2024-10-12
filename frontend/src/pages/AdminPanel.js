import React from "react"
import { FaRegUserCircle } from "react-icons/fa"
import { useSelector } from "react-redux"

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user)

  return (
    <div dir="rtl" className="min-h-[calc(100vh-120px)] flex">
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
      </aside>

      <main>main</main>
    </div>
  )
}

export default AdminPanel
