const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = mongoose.Schema ({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60, //document will be automatically deleted after 5 minutes
    }
});


//a function -> to send emails

// async function sendVerificationEmail(email,otp){
//     try {
//       const mailResponse = await mailSender(email,"Verification Email from StudyNotion", otp);
//       console.log("Email sent Successfully: ", mailResponse);
//     }
//     catch (error) {
//       console.log("error occured while sending mails:", error);
//       throw error;
//     }

    
// }

// otpSchema.pre("save", async function(next) { 
//     await sendVerificationEmail(this.email, this.otp);
//     next();
// });


// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;





