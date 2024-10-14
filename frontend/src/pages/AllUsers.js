import React, { useEffect, useState } from "react"
import SummaryApi from "../common"
import { toast } from "react-toastify"

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
      <table className="w-full bg-white">
        <thead>
          <th className=" font-medium text-base border">Sr.</th>
          <th className=" font-medium text-base border">Name</th>
          <th className=" font-medium text-base border">Email</th>
          <th className=" font-medium text-base border">Role</th>
          <th className=" font-medium text-base border">Created Date</th>
        </thead>
        <tbody>
          {allUser.map((el, index) => {
            return {}
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
