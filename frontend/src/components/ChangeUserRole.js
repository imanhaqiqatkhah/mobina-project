import React, { useState } from "react"
import ROLE from "../common/role"
import { IoMdClose } from "react-icons/io"
import SummaryApi from "../common"
import { toast } from "react-toastify"

const ChangeUserRole = ({ name, email, role, onClose, userId, callFunc }) => {
  const [userRole, setUserRole] = useState(role)

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value)

    console.log("handleOnChangeSelect", e.target.value)
  }

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    })

    const responseData = await fetchResponse.json()

    if (responseData.success) {
      toast.success(responseData.message)
      onClose()
      callFunc()
    }

    console.log("role updated", responseData)
  }

  return (
    <div className="fixed w-full h-full top-0 bottom-0 left-0 right-0 z-10 flex justify-between items-center bg-slate-300 bg-opacity-50">
      <div className="w-full mx-auto bg-white shadow-md p-4 max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium ">تغییر وضعیت کاربر</h1>
        <p>کاربر: {name}</p>
        <p>ایمیل: {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>وضعیت کاربر: </p>
          <select
            dir="ltr"
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option dir="rtl" value={el} key={el}>
                  {el}
                </option>
              )
            })}
          </select>
        </div>
        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-yellow-400 hover:scale-105  transition-all duration-150"
        >
          ثبت وضعیت
        </button>
      </div>
    </div>
  )
}

export default ChangeUserRole
