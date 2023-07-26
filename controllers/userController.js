const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const config=require("../config/config");
const jwt=require("jsonwebtoken");
const create_token=async(id,res)=>{
  try{
    const token=await jwt.sign({_id:id},config.secret_jwt);
    return token;
  }
  catch(error){
    res.status(400).send(error.message);
  }
}
const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    throw error;
  }
};

const register_user = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      password: spassword,
      mobile:req.body.mobile,
      image: req.file.filename,
      type: req.body.type,
    });

    const userData = await User.findOne({ phone: req.body.phone });
    if (userData) {
      res.status(200).send({ success: false, msg: "This phone already exists" });
    } else {
      const user_data = await user.save();
      res.status(200).send({ success: true, data: user_data });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const user_login = async (req, res) => {
  try {
    const phone = req.body.phone;
    const password = req.body.password;
    const userData = await User.findOne({ phone: req.body.phone });
    if (userData) {
      const passwordMatch = await bcryptjs.compare(password, userData.password);

      if (passwordMatch) {
        const token=await create_token(userData._id,res)
        const userResult = {
          _id: userData._id,
          name: userData.name,
          phone: userData.phone,
          password: userData.password,
          image: userData.image,
          type: userData.type,
          token:token
        };

        const response = {
          success: true,
          msg: "UserDetail",
          data: userResult,
        };
        res.status(200).send(response);
      } 

      else {
        res.status(200).send({ success: false, msg: "Password is incorrect" });
      }
    } 
    else {
      res.status(200).send({success: false,msg: "Phone number is incorrect"});
    }
  } 
  catch (error) {
    res.status(400).send(error.message);
  }
};
const update_password=async(req,res)=>{
  try {
    const user_id=req.body.user_id;
    const pswd=req.body.password;
    const data=await User.findOne({_id:user_id});
    if(data){
      const NewPassword=await securePassword(pswd);
      const UserData=await User.findByIdAndUpdate({_id:user_id},{$set:{
        pswd:NewPassword
    }});
    res.status(200).send({success:true,msg:"your password has been updated"});
    }
    else{
      res.status(200).send({success:false,msg:"User Id Not Found"});
    }

  } 
  catch (error) {
    res.status(400).send(error.message);
  }

}
module.exports = {
  register_user,
  user_login,
  update_password
};
