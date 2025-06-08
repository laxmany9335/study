const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//createRating
exports.createRating = async(req,res) => {
     try{
        //get user id
        const userId = req.user?._id || req.user?.id;
        console.log(userId)
        // fetch data from request ki body
        const {rating, review, courseId} = req.body;
          console.log(rating, review, courseId);
        //check if user is enrolled or not 
        const coursreDetails = await Course.findOne(
            {_id: courseId, 
                studentsEnrolled: {$elemMatch: {$eq: userId}},
            });

        if(!coursreDetails){
            return res.status(404).json({
                success: false,
                message: "Student is not Enrolled in this course"
            });
        }

        //check if user already reveiewed the course 
        const alreadyReviewed = await RatingAndReview.findOne(
                                                   {  user: userId,
                                                    course: courseId}
                                                  );

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "User already the review the course",
            });
        }

        //create rating and review
        const ratingReview =  await RatingAndReview.create({
                                        rating, review, 
                                        user: userId,
                                        course : courseId, 
        });
        
        //update course with this rating and review 
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId},
                                        {
                                            $push: {
                                                ratingAndReviews: ratingReview._id,
                                            }
                                        },
                                        {new: true});

                           
      console.log(updatedCourseDetails);
        
        // return Response
        return res.status(200).json({
                success: true,
                message: "Course rating and review successfully"
        });
     }
     catch(error){
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
     }
};

//getAverageRating
exports.getAverageRating = async(req, res) => {
    try{
        // get course  id
        const courseId = req.body.courseId;

        //calculate average rating
       const result = await RatingAndReview.aggregate([
                            {
                                $match:{
                                    course: new mongoose.Types.ObjectId(courseId),
                                },
                            },
                            {
                                $group:{
                                    _id: null,
                                    averageRating: {$avg: "$rating"},
                                }
                            }
       ]);
        //return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                message: "Average rating fetched successfully",
                averageRating: result[0].averageRating,
            });
        }
        //if no ratinhg/reviews exist
        return res.status(200).json({
            success: true,
            message: "No  rating and reviews given till now",
            averageRating: 0,
        });

    }catch(error){
         return res.status(500).json({
            success:  false,
            message: error.message,
         });
    }
};

//getAllRating and reviews
exports.getAllRating = async(req, res) =>  {
    try{
        const allReviews = await RatingAndReview.find({})
                                  .sort({rating: "desc"})
                                  .populate({
                                    path: "user",
                                    select:"firstName lastName email image",
                                  })
                                  .populate({
                                    path: "course",
                                    select: "courseName",
                                  })
                                  .exec();
        //return response
        return res.status(200).json({
            success: true,
            message: "All rating and reviews fetched successfully",
            data: allReviews,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};