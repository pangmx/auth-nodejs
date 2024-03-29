const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    // verify this username and password and call done with this user
    // if it is the correct username and password
    // otherwise, call done with false
    
    User.findOne({email:email}, function(err, user){
        
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false);
        }else{
            user.comparePassword(password, function(err, isMatch){
                
                if(err){
                    return done(err);
                }
                if(!isMatch){
                    return done(null, false);
                }else{
                    return done(null, user);
                }
            })
        }
    })
});

// setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create the strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // check to see if user id in the payload exists in our database
    // if it does, call done with that user
    // otherwise call done without the user object

    User.findById(payload.sub , function(err, user){
        if(err) {
            return done(err, false);
        }

        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    })
})

// tell passport to use this stratefy
passport.use(jwtLogin);
passport.use(localLogin);