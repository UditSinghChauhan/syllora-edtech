const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//createCourse handler function

exports.createCourse = async (req, res) => {
  try {

    //fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
    } = req.body;

    //get thumbnail

    const thumbnail = req.files?.thumbnail;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check for instructor
    const instructorDetails = await User.findById(req.user.id);
    console.log("Instructor Details:",instructorDetails);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // Fetch tag BEFORE using it
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
      });
    }

    // Upload Image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // Add the new course to the user schema of instructor
    await User.findByIdAndUpdate(instructorDetails._id, {
      $push: { courses: newCourse._id },
    
    },
     {new:true,});

    // ✅ HW: Add course to tag
    await Tag.findByIdAndUpdate(tagDetails._id, {
      $push: { courses: newCourse._id },
    },
     {new:true});

     //return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } 
  
  catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};


//getAllCourses handler function

exports.showAllCourses = async (req,res) =>
{
    try{
        const allCourses = await Course.find({}, {courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReview:true,
            studentsEnrolled:true,
        }).populate("instructor")
        .exec();

        return res.status(200).json({
            success:true,
            message:'Data fetched successfully',
            data:allCourses,
        })
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch course data',
            error:error.message,
        })
    }
}

