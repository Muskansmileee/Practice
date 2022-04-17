const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UsersSchema = Schema({
    name:{
        type:String,
        required:true
    }

})

const UsersBuy = mongoose.model("UsersBuy", UsersSchema);
module.exports = UsersBuy;