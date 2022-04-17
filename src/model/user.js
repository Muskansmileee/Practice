const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const date=new Date();
const hours=date.getHours();
const updatedHours=hours+2;
const UsersSchema = Schema({
   price:{
        type:Number,
        required:true
   },
   noOfItemsToBeSold:{
        type:Number,
        required:true
   },
   startTime:{
       type:String,
       default: hours
   },
   endTime:{
       type:String,
       default:updatedHours
   }
   
});
const User = mongoose.model("Users", UsersSchema);
module.exports = User;