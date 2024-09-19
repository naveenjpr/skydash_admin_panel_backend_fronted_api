import React, { useEffect, useState } from "react"
// import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

import axios from "axios"
import { Cookies } from "react-cookie"

function Cards() {
  let [cardData, setcardData] = useState([])
  console.log(cardData)
  let cookies = new Cookies()

  useEffect(() => {
    var token = cookies.get("token")

    axios
      .post("http://localhost:5000/api/fronted/courses/view", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        // console.log(result.data.data)
        setcardData(result.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  //  let cardData = [

  //      {
  //         icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
  //         head:"Design",
  //         para:"Over 800 Courses"
  //      },
  //      {
  //          icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
  //          head:"Design",
  //          para:"Over 800 Courses"
  //       },
  //       {
  //          icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
  //          head:"Design",
  //          para:"Over 800 Courses"
  //       },
  //       {
  //          icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
  //          head:"Design",
  //          para:"Over 800 Courses"
  //       },
  //       {
  //          icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
  //          head:"Design",
  //          para:"Over 800 Courses"
  //       },
  //       {
  //          icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
  //          head:"Design",
  //          para:"Over 800 Courses"
  //       },
  //       {
  //          icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
  //          head:"Design",
  //          para:"Over 800 Courses"
  //       },
  //       {
  //          icon: <FontAwesomeIcon icon={faPenToSquare} className='text-[40px] text-[#2441E7] mb-6'/>,
  //          head:"Design",
  //          para:"Over 800 Courses"
  //       },
  //  ]
  return (
    <>
      {cardData.length > 0 ? (
        cardData.map((v, i) => {
          return (
            <div
              className='w-full hover:border-blue-600 duration-[1s] border rounded-[5px] py-[40px] font-["Nunito]'
              key={i}
            >
              <img
                src={`http://localhost:5000/uploads/courses/${v.image}`}
                alt="A description of the image"
                className="w-[100%] h-[100px] "
              />
              <h1 className="mb-2 font-bold text-[17px] text-[#2441E7]">
                {v.name}
              </h1>
              <p className="text-[15px] font-[400]">duration:{v.duration}</p>
              <p className="text-[15px] font-[400]">price:{v.price}</p>
            </div>
          )
        })
      ) : (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </>
  )
}

export default Cards
