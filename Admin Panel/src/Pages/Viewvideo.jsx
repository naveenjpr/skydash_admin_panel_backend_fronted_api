import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../Context"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar"
import Footer from "../Common/Footer"
import axios from "axios"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

function Viewvideo() {
  let { changemenu } = useContext(mainContext)
  let [videoshow, setvideoshow] = useState([])
  let [changeStatusValue, setChangeStatus] = useState(false)
  let [courseIds, setCourseIds] = useState([])

  let changeStatus = (id, status) => {
    const data = {
      id: id,
      status: !status,
    }
    axios
      .put("http://localhost:5000/api/backend/videos/change-status", data)
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
    console.log(id)
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
    if (window.confirm("Are you sure want delete th")) {
      axios
        .post("http://localhost:5000/api/backend/videos/delete", data)
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
    } else {
      axios
        .post("http://localhost:5000/api/backend/videos/view")
        .then((result) => {
          if (result.data.data) {
            setvideoshow(result.data.data)
          } else {
            setvideoshow([])
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
      .post("http://localhost:5000/api/backend/videos/multiple-delete", data)
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
      .post("http://localhost:5000/api/backend/videos/view")
      .then((result) => {
        if (result.data.status == true) {
          console.log(result.data.data)
          setvideoshow(result.data.data)
        } else {
          setvideoshow([])
        }
      })
      .catch((error) => {
        console.log(error)
      })
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
          <h1 className="text-[25px] font-[500] mb-[10px]">
            Welcome To Admin Panel
          </h1>

          <button
            className="text-[25px] font-[500] mb-[10px] bg-[#0f0e0e] hover:bg-[red] text-white px-[10px]"
            onClick={() => multipleDeleteCourse()}
          >
            Multiple delete
          </button>

          <div className="">
            <div className="bg-white w-[100%] mb-[50px]  h-full rounded-[20px]">
              <table>
                <tr className="">
                  <th></th>
                  <th>S.no</th>
                  <th>VIDEO Category</th>
                  <th>Video Topic</th>
                  <th width="100">Video Link</th>
                  <th width="80">Status</th>
                  <th width="80">Action</th>
                </tr>
                {videoshow.length >= 1
                  ? videoshow.map((v, i) => {
                      return (
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              onClick={() => multipleSelect(v._id)}
                            />
                          </td>
                          <td>{i + 1}</td>
                          <td>{v.name}</td>
                          <td>{v.topic}</td>
                          <Link to={v.link} target="_blank">
                            <td className="hover:text-[blue]">{v.link}</td>
                          </Link>

                          <td>
                            {v.status == 1 ? (
                              <button
                                className="px-1 py-1 mr-1 text-white bg-green-500"
                                onClick={() => changeStatus(v._id, v.status)}
                              >
                                Active
                              </button>
                            ) : (
                              <button
                                className="px-1 py-1 text-white bg-red-400"
                                onClick={() => changeStatus(v._id, v.status)}
                              >
                                Inactive
                              </button>
                            )}
                          </td>
                          <td className="text-center w-[100px]">
                            <Link to={`/addvideo/${v._id}`}>
                              <button className="bg-green-500 text-white px-1 mr-1 py-1 w-[100%]">
                                Edit
                              </button>
                            </Link>

                            <button
                              className="bg-red-400 text-white px-1 py-1 w-[100%]"
                              onClick={() => singleDelete(v._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  : "api data not show"}
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Viewvideo
