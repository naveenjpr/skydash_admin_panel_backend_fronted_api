import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../Context"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar"
import Footer from "../Common/Footer"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { Link } from "react-router-dom"

function Viewcourse() {
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
    console.log(data)
  }

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/backend/courses/view")
      .then((result) => {
        if (result.data.status == true) {
          setImagePath(result.data.imagePath)

          setCourses(result.data.data)
        } else {
          setCourses([])
        }
      })
      .catch((error) => {})
  }, [changeStatusValue])
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
                        <td>{i + 1}</td>
                        <td>{v.name}</td>
                        <td>{v.price}</td>
                        <td>{v.duration}</td>

                        <td>
                          {" "}
                          <img
                            src={imagePath + v.image}
                            width={150}
                            height={150}
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
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Viewcourse
