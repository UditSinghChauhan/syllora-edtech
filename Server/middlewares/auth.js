const jwt = require("jsonwebtoken");
require("dotenv").config();





//auth
exports.auth = async (req,res,next)=>{
    try {
         //extract token
         const token = req.cookies.token || req.body.token||req.headers.authorization?.replace("Bearer ", "");
         //if token missing , then return response
         if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
         }

         //verify the token
         try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            next();
         }
         catch(err){
            //verification - issue
            return res.status(401).json({
                success: false,
                message:'token is invalid',
            });
            
         }

    }
    catch (error){

        return res.status(403).json({
            success: false,
            message:'Something went wrong while validating the token',
        });
    }
}



//isStudent
exports.isStudent =  (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(403).json({
                success:false,
                message:'User role cannot be verified , please try again'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified , please try again'
        })
    }
    
}


//isInstructor
exports.isInstructor = (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(403).json({
                success:false,
                message:'User role cannot be verified , please try again'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified , please try again'
        })
    }
    
}


//isAdmin
exports.isAdmin =  (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'User role cannot be verified , please try again'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified , please try again'
        })
    }
    
}