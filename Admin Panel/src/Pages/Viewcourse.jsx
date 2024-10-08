import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../Context"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar"
import Footer from "../Common/Footer"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { Link } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

function Viewcourse() {
  const [pageNumber, setpageNumber] = useState(1)//pagination
  const [tot, settot] = useState(0)//pagination
  const [limit, setlimit] = useState(5) //pagination
  console.log(tot)
  console.log(pageNumber)
  let { changemenu } = useContext(mainContext)

  let [courses, setCourses] = useState([])
  let [changeStatusValue, setChangeStatus] = useState(false)
  let [courseIds, setCourseIds] = useState([])
  let [imagePath, setImagePath] = useState()

  let changeStatus = (id, status) => {
    const data = {
      id: id,
      status: !status,
    }
    axios
      .put("http://localhost:5000/api/backend/courses/change-status", data)
      .then((result) => {
        if (result.data.status == true) {
          toast.success(result.data.message)
          setChangeStatus(!changeStatusValue)
        } else {
          toast.error(result.data.message)
        }
      })
      .catch((error) => {
        toast.error("Something went wrong")
      })
  }

  let multipleSelect = (id) => {
    let updateCourseIds = [...courseIds]

    if (updateCourseIds.includes(id)) {
      updateCourseIds = updateCourseIds.filter((course_id) => {
        return course_id != id
      })
    } else {
      updateCourseIds.push(id)
    }

    setCourseIds(updateCourseIds)
  }

  let singleDelete = (id) => {
    let data = {
      id: id,
    }
    if (window.confirm("are you sure want delete ")) {
      axios
        .post("http://localhost:5000/api/backend/courses/delete", data)
        .then((result) => {
          console.log(result.data)
          if (result.data.status == true) {
            toast.success(result.data.message)
            setChangeStatus(!changeStatusValue)
          } else {
            toast.error(result.data.message)
          }
        })
        .catch((error) => {
          toast.error("Something went wrong")
        })
    } else {
      axios
        .post("http://localhost:5000/api/backend/courses/view")
        .then((result) => {
          if (result.data.data) {
            settot(result.data.data.length) //pagenation total
            //pagenation total
            setCourses(result.data.data)
          } else {
            setCourses([])
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  let multipleDeleteCourse = () => {
    let data = {
      ids: courseIds,
    }

    axios
      .post("http://localhost:5000/api/backend/courses/multiple-delete", data)
      .then((result) => {
        if (result.data.status == true) {
          toast.success(result.data.message)
          setChangeStatus(!changeStatusValue)
        } else {
          toast.error(result.data.message)
        }
      })
      .catch((error) => {
        toast.error("Something went wrong")
        console.log(error)
      })
  }

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/backend/courses/view/?pageNumber=${2}`)
      .then((result) => {
        if (result.data.status == true) {
          settot(result.data.tot) //pagenation total
          console.log("pagi", result.data.tot) //pagenation total

          setImagePath(result.data.imagePath)

          setCourses(result.data.data)
          console.log(result.data)
        } else {
          setCourses([])
        }
      })
      .catch((error) => {})
  }, [changeStatusValue,pageNumber])
  // pagination logic start
  let ChangePageNumber = (para) => {
    let pNumber
    if (para == "first") {
      pNumber = 1
    }
    else if (para == "Previous") {
      pNumber = pageNumber - 1
    }
    else if(para == "Next") {
      pNumber = pageNumber + 1
    }
    else if(para == "Last") {
      pNumber = (Math.ceil(tot / limit))
    
    }
    setpageNumber(pNumber)
  }
  return (
    <div>
      <Header />
      <ToastContainer />

      <div className="flex  bg-[#F5F7FF]">
        <Sidebar />

        <div
          className={` ${
            changemenu == true ? "w-[95%]" : "w-[84%]"
          } relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}
        >
          <h1 className="text-[25px] font-[500] mb-[10px]">Course Tab </h1>
          <button
            className="text-[25px] font-[500] mb-[10px] bg-[red] text-white px-[10px]"
            onClick={() => multipleDeleteCourse()}
          >
            Multiple delete
          </button>
          <div className="">
            <div className="bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]">
              <table>
                <tr>
                  <th></th>
                  <th width="20">S.no</th>
                  <th>Course Name</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Image</th>
                  <th width="80">Status</th>
                  <th width="80">Action</th>
                </tr>

                {courses.length > 0 ? (
                  courses.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <input
                            type="checkbox"
                            onClick={() => multipleSelect(v._id)}
                          />
                        </td>
                        <td>{((pageNumber - 1) * limit )+ i + 1}</td>
                        <td>{v.name}</td>
                        <td>{v.price}</td>
                        <td>{v.duration}</td>

                        <td>
                          {" "}
                          <img
                            src={imagePath + v.image}
                            width={100}
                            height={100}
                          />
                        </td>
                        <td>
                          {v.status == 1 ? (
                            <button
                              className="px-5 py-1 mr-5 text-white bg-green-500"
                              onClick={() => changeStatus(v._id, v.status)}
                            >
                              Active
                            </button>
                          ) : (
                            <button
                              className="px-5 py-1 text-white bg-red-400"
                              onClick={() => changeStatus(v._id, v.status)}
                            >
                              Inactive
                            </button>
                          )}
                        </td>
                        <td className="text-center">
                          <Link to={`/addcourse/${v._id}`}>
                            <button className="bg-green-500 text-white px-5 mr-5 py-1">
                              Edit
                            </button>
                          </Link>

                          <button
                            className="bg-red-400 text-white px-5 py-1"
                            onClick={() => singleDelete(v._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                  </tr>
                )}
              </table>
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-center ">
                  <button
                    onClick={() => ChangePageNumber("first")}
                  
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    first
                  </button>
                  <button
                    onClick={() => ChangePageNumber("Previous")}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => ChangePageNumber("Next")}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => ChangePageNumber("Last")}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    last
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Viewcourse
