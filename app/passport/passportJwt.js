const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

passport.use(new jwtStrategy({
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey : process.env.SECRET_KEY
} , async (payLoad , done) => {
    try {
        // find the user specified in token
        const user = await User.findById(payLoad.sub);

        // if user doesn't exists, handle it
        if(!user) return done(null , false);

        // otherwise, return the user
        done(null , user);

    } catch (error) {
        done(error , false);
    }
}));