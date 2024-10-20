import React, { useEffect, useState } from "react"
import SummaryApi from "../common"
import { toast } from "react-toastify"
import { MdModeEdit } from "react-icons/md"
import ChangeUserRole from "../components/ChangeUserRole"

var moment = require("jalali-moment")

function AllUsers() {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className="bg-white">
      <table className="w-full bg-white ">
        <thead>
          <tr className="bg-black text-white">
            <th className=" font-medium text-base border">id</th>
            <th className=" font-medium text-base border">نام</th>
            <th className=" font-medium text-base border">ایمیل</th>
            <th className=" font-medium text-base border">نقش</th>
            <th className=" font-medium text-base border">تاریخ عضویت</th>
            <th className=" font-medium text-base border">عملکرد</th>
          </tr>
        </thead>
        <tbody className="">
          {allUser.map((el, index) => {
            return (
              <tr className="text-center text-base border">
                <td className="text-center text-base border">{index + 1}</td>
                <td className="text-center text-base border">{el?.name}</td>
                <td className="text-center text-base border">{el?.email}</td>
                <td className="text-center text-base border">{el?.role}</td>
                <td className="text-center text-base border">
                  {moment(el?.createdAt).locale("fa").format("YYYY/M/D")}
                </td>
                <td>
                  <button
                    className="p-2 bg-yellow-100 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white transition-all duration-100"
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  )
}

export default AllUsers
