const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create subSection

exports.createSubSection = async (req,res) =>
{
    try{
        //fetch data
        const {sectionId, title, timeDuration, description} = req.body;

        //extract file/video
        const video = req.files.videoFile;
        //validation 
        if(!sectionId|| !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //upload video to cloudinary

        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //create a sub-section
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });
        //update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                     { $push:{
                                                        subSection:SubSectionDetails._id,
                                                     }},
                                                     {new:true})
                                                     .populate("subSection")
                                                     .exec();

        //HW: log updated section here , after adding populate query
        //return response
        return res.status(200).json({
            success:true,
            message:'Sub Section Created Successfully',
            updatedSection,
        })

    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        });

    }
};

//HW:updateSubSection
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, timeDuration, description } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID is required",
      });
    }

    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      { title, timeDuration, description },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSubSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update SubSection",
      error: error.message,
    });
  }
};


//HW:deleteSubSection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Remove reference from Section
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    // Delete SubSection
    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete SubSection",
      error: error.message,
    });
  }
};



   