const jwt = require('jsonwebtoken');
const User = require('./../../models/user');


signToken = user => {
    return jwt.sign({ 
        iss : 'Hexzm' ,
        sub : user.id,
        iat : new Date().getTime(),// current time
        exp : new Date().setDate(new Date().getDate() + 3)// current time + 3 day
    } , process.env.SECRET_KEY);
}

module.exports = {

    proccess : async (req , res , next) => {
        const { email , password } = req.value.body;

        // check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if(foundUser){
            return res.status(403).json({error : 'The user has already registered with this email'});
        }
        
        // create user
        const newUser = new User({ email , password });
        await newUser.save( err =>{ 
            if(err) console.log(err)
            else{
                //generat token
                const token = signToken(newUser)
                res.status(200).json({ token });
            }
        });
    }

};