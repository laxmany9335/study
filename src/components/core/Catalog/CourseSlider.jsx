import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import {
  FreeMode,
  Pagination,

} from 'swiper/modules'

import Course_Card from './Course_Card'  // Updated component name

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          loop={true}
          modules={[FreeMode, Pagination]} // Corrected imports
          breakpoints={{
        // Mobile devices
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        // Tablets
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // Desktops
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
          }}
          className="max-w-maxContentTab lg:max-w-maxContent "
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"200"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
