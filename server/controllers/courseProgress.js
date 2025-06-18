const mongoose = require("mongoose");
const User = require("../models/User");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {

    const {courseId, subsectionId} = req.body;
    const userId = req.user.id;
    console.log(courseId, subsectionId)
      try{
          //check if the subsection is valid
          const subsection = await SubSection.findById(subsectionId);
          if(!subsection){
            return res.status(404).json({
                sucess: false,
                message: " Invalid Subsection"
            });
          }

          //find the course progess document for the user and course
          let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId
          })

          //if course progess don't exist create a new one
          if(!courseProgress){
                return res.status(404).json({
                    sucess: false,
                    message: "Course Progess Does Not Exist"
                });
          }else{
                //if course progess exists check if the section is already completed
                if(courseProgress.completedVideos.includes(subsectionId)){
                    return res.status.json({
                        success: false,
                        message: "Subsection already completed"
                    })
                }

                //push the subsection into the completed Videos array
                courseProgress.completedVideos.push(subsectionId);
          }

          //Save the updated course progess
          await courseProgress.save();

          //return resposnce
          return res.status(200).json({
            success: true,
            message: "Course progress updated"
          });

      }
      catch(error){
            console.log("Error", error)
            console.log("Error message :", error.message)
            return res.json({
            success: false,
            message: "Something went wrong...",
            });
      }
};