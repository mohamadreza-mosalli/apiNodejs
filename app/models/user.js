const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new schema({
    email : { type : String , lowercase : true , unique : true , required : true },

    password : { type : String , required : true },

    role : { type : String , default : 'user' }

} , { timestamps : true });

userSchema.pre('save' , async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password , salt);
        this.password = passwordHash;
        next();

    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    try {
      return await bcrypt.compare(password , this.password);
      
    } catch(error) {
        throw new Error(error);
    }
};

const User = mongoose.model('user' , userSchema);
module.exports = User;