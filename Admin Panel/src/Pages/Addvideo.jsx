import React, { useContext, useEffect, useState } from "react"
import { mainContext } from "../Context"
import Header from "../Common/Header"
import Sidebar from "../Common/Sidebar"
import Footer from "../Common/Footer"
import prev from "../img/generic-image-file-icon-hi.png"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate, useParams } from "react-router"

function Addvideo() {
  let { changemenu } = useContext(mainContext)
  let navigation = useNavigate()

  const [selectedvideo, setSelectedvideo] = useState(false)
  let params = useParams()
  console.log(params.video_id)
  let [input, setInput] = useState({
    Video_category: "",
    Video_topic: "",
    Video_Link: "",

    Video_Stauts: "",
    Video_order: "",
  })
  useEffect(() => {
    if (params.video_id != undefined) {
      axios
        .post(
          "http://localhost:5000/api/backend/videos/details/" + params.video_id
        )
        .then((result) => {
          console.log(result.data.data)
          setInput({
            Video_category: result.data.data.name,
            Video_topic: result.data.data.topic,
            Video_Link: result.data.data.link,
            Video_Stauts: result.data.data.status,
            video_order: result.data.data.order,
          })
        })
        .catch((error) => {
          toast.error("something want wrong")
        })
    }
  }, [])

  let inputHander = (event) => {
    let data = { ...input }
    data[event.target.name] = event.target.value
    setInput(data)
  }

  let VideoHandler = (event) => {
    event.preventDefault()
    // if (event.target.video_order.value == "") {
    //   var order = 1
    // } else {
    //   var order = event.target.Video_order.value
    // }

    if (event.target.Video_Stauts.value == "") {
      var status = 1
    } else {
      var status = event.target.Video_Stauts.value
    }
    // let form = new FormData(event.target)

    let dataSave = {
      name: event.target.Video_category.value,
      link: event.target.Video_Link.value,
      topic: event.target.Video_topic.value,
      status: status,
    }

    if (params.video_id == undefined) {
      axios
        .post("http://localhost:5000/api/backend/videos/add", dataSave)
        .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message)
            setSelectedvideo(true)
          } else {
            toast.error(result.data.message)
          }
          console.log(result.data)
        })
        .catch((error) => {
          toast.error("something went wrong")
          console.log(error)
        })
    } else {
      dataSave.id = params.video_id
      console.log(dataSave.id)
      axios
        .put("http://localhost:5000/api/backend/videos/update", dataSave)
        .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message)
            setSelectedvideo(true)
          } else {
            toast.error(result.data.message)
          }
          console.log(result.data)
        })
        .catch((error) => {
          toast.error("something went wrong")
          console.log("something went wrong")
        })
    }
  }

  useEffect(() => {
    if (selectedvideo == true) {
      navigation("/viewvideo")
    }
  }, [selectedvideo])
  return (
    <div>
      <Header />

      <div className="flex  bg-[#F5F7FF]">
        <Sidebar />

        <div
          className={` ${
            changemenu == true ? "w-[95%]" : "w-[84%]"
          } relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}
        >
          <h1 className="text-[25px] font-[500] mb-[10px]">Video</h1>
          <div className="">
            <div className="bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]">
              <form onSubmit={VideoHandler}>
                VIDEO Category
                {/* <input
                  type="text"
                  name="Video_category"
                  className="border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 "
                  // value={input.course_name}
                  // onChange={inputHander}
                /> */}
                <select
                  name="Video_category"
                  id="video"
                  value={input.Video_category}
                  onChange={inputHander}
                  className="w-full border my-3 border-gray-400 h-[50px]"
                >
                  <option value="" className="">
                    select video category
                  </option>
                  <option value="php" className="">
                    php
                  </option>
                  <option value="node js" className="">
                    node js
                  </option>
                  <option value="react" className="">
                    react
                  </option>
                  <option value="share market" className="">
                    share market
                  </option>
                  <option value="Cartoon" className="">
                    Cartoon
                  </option>
                </select>
                Video Topic
                <input
                  type="text"
                  name="Video_topic"
                  onChange={inputHander}
                  value={input.Video_topic}
                  className="border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4 "
                />
                Video Link
                <input
                  type="text"
                  name="Video_Link"
                  value={input.Video_Link}
                  onChange={inputHander}
                  className="border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4"
                />
                Video Stauts
                <div className="flex items-center mt-5  mb-8 gap-2">
                  <input
                    type="radio"
                    name="Video_Stauts"
                    value="1"
                    className="mx-2 w-[20px] h-[20px] text-[20px]"
                    onChange={inputHander}
                    checked={input.Video_Stauts == 1 ? "checked" : ""}
                  />{" "}
                  Active
                  <input
                    type="radio"
                    value="0"
                    name="Video_Stauts"
                    className="mx-2 w-[20px] h-[20px] text-[20px]"
                    onChange={inputHander}
                    checked={input.Video_Stauts == 0 ? "checked" : ""}
                  />{" "}
                  Deactive
                </div>
                <input
                  type="submit"
                  className="bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white"
                  value={params.video_id == undefined ? "Submit" : "Update"}
                />
                <input
                  type="reset"
                  value="Cancel"
                  className="bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black"
                />
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Addvideo
