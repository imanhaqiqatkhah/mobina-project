import React, { useEffect, useState } from "react"
import SummaryApi from "../common"
import { toast } from "react-toastify"
import moment from "moment"

function AllUsers() {
  const [allUser, setAllUsers] = useState([])

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
    <div>
      <table className="w-full bg-white ">
        <thead>
          <tr>
            <th className=" font-medium text-base border">Sr.</th>
            <th className=" font-medium text-base border">Name</th>
            <th className=" font-medium text-base border">Email</th>
            <th className=" font-medium text-base border">Role</th>
            <th className=" font-medium text-base border">Created Date</th>
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
                  {moment(el?.createdAt).format("ll")}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
