const mongoose = require('mongoose');
const Category = require('./Category');

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
    },
    courseDescription:{
        type:String,
    },

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    whatYouWillLearn: {
        type:String,
    },

    courseContent: [ {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    },],

    ratingAndReviews: [ { 
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReveiws",
    },],
 
    price:{
        type:Number,
    },
    thumbnail:{ 
        type:String,

    },
    category :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled: [{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },],
 
    tag:{
        type:[String],
        required: true,
    },

    instructions:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft", "Published"],
    },
    createdAt: {
		type:Date,
		default:Date.now
	},

});

module.exports = mongoose.model("Course",courseSchema);