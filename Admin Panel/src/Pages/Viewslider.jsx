import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../Context"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar"
import Footer from "../Common/Footer"
import axios from "axios"
import { toast } from "react-toastify"

function Viewslider() {
  let { changemenu } = useContext(mainContext)
  const [APislider, setAPislider] = useState(false)
  let [changeStatusValue, setChangeStatus] = useState(false)
  let [imagePath, setImagePath] = useState()

  let changeStatus = (id, status) => {
    const data = {
      id: id,
      status: !status,
    }
    axios
      .put("http://localhost:5000/api/backend/sliders/change-status", data)
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

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/backend/sliders/view")
      .then((result) => {
        if (result.data.status == true) {
          setImagePath(result.data.imagePath)

          setAPislider(result.data.data)
        } else {
          setAPislider([])
        }
      })
      .catch((error) => {})
  }, [changeStatusValue])
  return (
    <div>
      <Header />

      <div className="flex  bg-[#F5F7FF]">
        <Sidebar />

        <div
          className={` ${
            changemenu == true ? "w-[95%]" : "w-[84%]"
          } relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}
        >
          <h1 className="text-[25px] font-[500] mb-[10px]">Slider Table</h1>
          <div className="">
            <div className="bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]">
              <table>
                <tr>
                  <th>S.no</th>
                  <th>Slider Heading</th>
                  <th>Slider sub-heading</th>
                  {/* <th>Slider Description</th> */}
                  <th>Slider Image</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {APislider.length >= 1
                  ? APislider.map((v, i) => {
                      console.log(v)
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{v.Slider_Heading}</td>
                          <td>{v.Slider_SubHeading}</td>
                          {/* <td>This is new React Course</td> */}
                          <td>
                            <img
                              src={imagePath + v.image}
                              width={150}
                              height={150}
                            />
                          </td>
                          <td>
                            {" "}
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
                            <button className="bg-green-500 text-white px-5 mr-5 py-1">
                              Edit
                            </button>
                            <button className="bg-red-400 text-white px-5 py-1">
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  : ""}
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Viewslider
