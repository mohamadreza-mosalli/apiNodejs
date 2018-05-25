const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email : { type : String , lowercase : true , unique : true , required : true },
    password : { type : String , required : true },
    role : { type : String , default : 'user' }
} , { timestamps : true });
const User = mongoose.model('user' , userSchema);
module.exports = User;