// Icons Import
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

// Image and Video Import
import Banner from "../assets/Images/banner.mp4"
// Component Imports
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import CTAButton from "../components/core/HomePage/CTAButton"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Highlightedtext from "../components/core/HomePage/Highlightedtext"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"

import { useState } from "react"

function Home() {
  return (
    <div>
      {/* section 1*/}

      <div className=" relative mx-auto flex flex-col items-center text-white w-11/12 max-w-maxContent">
        <Link to={"/signup"}>
          <div
            className="group mt-10 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
            transition-all duration-200 hover:scale-95 w-fit"
          >
            <div className="flex flex-row items-center rounded-full group-hover:bg-richblack-900 p-2 gap-2">
              <p>Become a Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center mt-4">
          Empower Your Future With
          <Highlightedtext text={"Coding Skills"} />
        </div>
        <div className="text-center max-w-[75%] mt-4 text-sm sm:text-md lg:text-lg font-bold text-richblack-300">
          <p>
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects quizzes, and personalized feedback from
            instructors.
          </p>
        </div>

        <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/signup"}>
                Book a Demo
            </CTAButton>

        </div>

        <div className="relative my-12 mx-3 max-w-[85%] shadow-left-top-blue z-10">
          <div className="relative z-10">
            <video muted autoPlay loop>
              <source src={Banner} />
            </video>
          </div>

          <div className="absolute inset-0 bg-white z-0 transform translate-x-5 translate-y-5">
          </div>
        </div>

        {/* Code Section 1 */}

        <div className="max-w-[90%]">
          <CodeBlocks
            direction={"row"}
            heading={
              <div className="text-3xl font-semibold ">
                Unlock Your
                <Highlightedtext text={"coding potential "}/>
                with our online courses
              </div>
            }

            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }

            ctabtn1={
            {
              text:"Try it yourself",
              linkto:"/signup",
              active:true,
            }

            }

            ctabtn2={
            {
              text:"Learn more",
              linkto:"/login",
              active:false,
            }

            }

            codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>Simple Page</title>\n</head>\n<body>This is a simple HTML5 webpage.\n</body>\n<footer>\n<p>&copy; 2024 Simple Page</p>\n</footer>\n</html>`}

            codeColor={"text-pink-100"}
          />
        </div>  

        {/* Code Section 2 */}

        <div className="max-w-[90%]">
          <CodeBlocks
            direction={"reverse"}
            heading={
              <div className="text-3xl font-semibold">
                Unlock Your
                <Highlightedtext text={"coding potential "}/>
                with our online courses
              </div>
            }

            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }

            ctabtn1={
            {
              text:"Try it yourself",
              linkto:"/signup",
              active:true,
            }

            }

            ctabtn2={
            {
              text:"Learn more",
              linkto:"/login",
              active:false,
            }

            }

            codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>Simple Page</title>\n</head>\n<body>This is a simple HTML5 webpage.\n</body>\n<footer>\n<p>&copy; 2024 Simple Page</p>\n</footer>\n</html>`}

            codeColor={"text-caribbeangreen-100"}
          />
        </div>      

        {/* Explore Section */}
        <ExploreMore />


      </div>

      {/* section 2*/}
      <div className=" bg-pure-greys-5 text-richblack-700">

      <div className="homepage_bg h-[320px]">

            <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto ">

            <div className="flex flex-col lg:flex-row  gap-7 text-white mt-[150px]">

            <CTAButton active={true} linkto={"/signup"}>
            <div className="flex flex-row gap-3 items-center">
              Explore Full Catalog
              <FaArrowRight/>
            </div>
            </CTAButton>

            <CTAButton active={false} linkto={"/signup"}>
              Learn more
            </CTAButton>

            </div>

            </div>

      </div>

      <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto">
      <div className="mb-10  flex flex-col md:flex-row  justify-between gap-7 mt-20  lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <Highlightedtext text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <div className="flex flex-row justify-center w-full">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
              </div>

            </div>
      </div>
          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />

      </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
         <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider /> 
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
