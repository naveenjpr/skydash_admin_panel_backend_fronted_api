import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import "./slider.css"
import axios from "axios"
function HomeSlider() {
  const [sliderdate, setsliderdate] = useState([])
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  // const sliderdata = [
  //     {
  //         bg:"https://demo.createdbycocoon.com/moodle/edumy/11/pluginfile.php/452/block_cocoon_slider_6/slides/1/h2flip.jpg"
  //     },
  //     {
  //         bg:"https://demo.createdbycocoon.com/moodle/edumy/11/pluginfile.php/452/block_cocoon_slider_6/slides/2/4.jpg"
  //     },
  //     {
  //         bg:"https://demo.createdbycocoon.com/moodle/edumy/11/pluginfile.php/452/block_cocoon_slider_6/slides/2/4.jpg"
  //     },
  //     {
  //         bg:"https://demo.createdbycocoon.com/moodle/edumy/11/pluginfile.php/452/block_cocoon_slider_6/slides/4/h3.jpg"
  //     },

  // ]

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/fronted/sliders/view")
      .then((result) => {
        setsliderdate(result.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [sliderdate])

  return (
    <>
      <Slider {...settings} className="w-full h-full">
        {sliderdate.length > 0 ? (
          sliderdate.map((v, i) => {
            // console.log(v.bg)
            return (
              <div>
                <div
                  style={{
                    backgroundImage: `url('${
                      "http://localhost:5000/uploads/sliders/" + v.image
                    }')`,
                  }}
                  className={`relative h-[30vh] lg:h-[100vh] w-full  bg-cover bg-center`}
                >
                  <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full">
                    <div className="w-full text-center lg:text-left lg:translate-y-[-50%]  lg:w-[50%] static text-white lg:border-blue-600 absolute lg:top-[50%] lg:left-[5%] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]   py-4 lg:translate-y-[-50%] lg:translate-x-[0%]   lg:border-l-4 lg:pl-[50px] ">
                      <h1 className='lg:text-[60px] font-["Nunito"]'>
                        {v.Slider_Heading}
                      </h1>
                      <h2 className='lg:text-[60px] font-["Nunito"] font-bold'>
                        {v.Slider_SubHeading}
                      </h2>
                    </div>
                  </div>
                </div>
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
      </Slider>
    </>
  )
}

export default HomeSlider
