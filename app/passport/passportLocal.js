const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField : 'email'
} , async (email , password , done) => {
    try {
    // find the user given the email
    const user = User.findOne({ email });

    // if not, handle it
    if(!user) 
        return done(null , false);

    // check if the password is correct
    const isMatch = await user.comparePassword(password);

    // if not, handle it
    if(!isMatch)
        return done(null , false);

    // otherwise, return the user
    return done(null , user);

    } catch (error) {
        done(error , false);
    }
}));