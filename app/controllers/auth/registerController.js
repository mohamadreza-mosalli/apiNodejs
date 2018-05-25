const User = require('./../../models/user');
module.exports = {

    proccess : async (req , res , next) => {
        const { email , password } = req.value.body;

        //check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if(foundUser){
            return res.status(403).json({error : 'The user has already registered with this email'});
        }
        
        //create user
        const newUser = new User({ email , password });
        await newUser.save( err => {
            if(err) console.log(err);
            res.status(200).json('create User');
        });
    }

};