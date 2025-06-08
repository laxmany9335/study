import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

export default function Instructor() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])
  
    useEffect(() => {
      ;(async () => {
        setLoading(true)
        const instructorApiData = await getInstructorData(token)
        const result = await fetchInstructorCourses(token)
        console.log(instructorApiData)
        if (instructorApiData.length) setInstructorData(instructorApiData)
        if (result) {
          setCourses(result)
        }
        setLoading(false)
      })()
    }, [])
  
    const totalAmount = instructorData?.reduce(
      (acc, curr) => acc + curr.totalAmountGenerated,
      0
    )
  
    const totalStudents = instructorData?.reduce(
      (acc, curr) => acc + curr.totalStudentsEnrolled,
      0
    )
  
    return (
      <div className=''>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
        </div>
        {loading ? (
          <div className="spinner"></div>
        ) : courses.length > 0 ? (
          <div>
            <div className="my-4 flex flex-col lg:flex-row h-[450px] gap-3">
              {/* Render chart / graph */}
              <div className='lg:w-[80%] w-full'>
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex-1 rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-richblack-50">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
              </div>

              {/* Total Statistics */}
              <div className="flex w-full lg:w-[20%] max-lg:text-center flex-col rounded-md bg-richblack-800 p-6">
                <p className="text-base lg:text-lg font-bold text-richblack-5">Statistics</p>
                <div className="  lg:space-y-4 flex flex-col max-lg:flex-row item-center justify-between">
                  <div>
                    <p className="text-sm lg:text-lg text-richblack-200">Total Courses</p>
                    <p className="text-xs lg:text-base font-semibold text-richblack-50">
                      {courses.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm lg:text-lg text-richblack-200">Total Students</p>
                    <p className="text-xs lg:text-base font-semibold text-richblack-50">
                      {totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm lg:text-lg text-richblack-200">Total Income</p>
                    <p className="text-xs lg:text-base font-semibold text-richblack-50">
                      Rs. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-richblack-800 p-6 max-lg:mt-[165px]">
              {/* Render 3 courses */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-xs font-semibold text-yellow-50">View All</p>
                </Link>
              </div>
              <div className="my-4 flex lg:flex-row flex-col gap-4 items-center lg:justify-between lg:items-start ">
                {courses.slice(0, 3).map((course) => (
                  <div key={course._id} className="lg:w-1/3 w-full flex flex-col justify-center items-start gap-2">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="lg:h-[201px] w-full rounded-md object-cover"
                    />
                    <div className=" w-full">
                      <p className="text-sm font-medium text-richblack-50">
                        {course.courseName}
                      </p>
                      <div className=" flex items-center space-x-2">
                        <p className="text-xs font-medium text-richblack-300">
                          {course.studentsEnrolled.length} students
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          |
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          Rs. {course.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
            <p className="text-center text-2xl font-bold text-richblack-5">
              You have not created any courses yet
            </p>
            <Link to="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Create a course
              </p>
            </Link>
          </div>
        )}
      </div>
    )
  }