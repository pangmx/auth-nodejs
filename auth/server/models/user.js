const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


// Define our Schema
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});

// on save Hook, encrypt password
// before saving  model, run this function
userSchema.pre('save', function(next) {
    // get access to the current user model
    const user = this;

    // generate a salt, then run callback funtion
    bcrypt.genSalt (10, function(err, salt){
        if(err){
            return next(err);
        }

        // hash encrypt our password with the salt
        bcrypt.hash(user.password, salt, null, function(err, hashedPassword){
            if(err){
                return next(err);
            }

            // no error, set the current user.password to the hash
            user.password = hashedPassword;
            next();
        })
        
    });
});

// declaring a new method in userSchema to compare password
userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){
            return callback(err);
        }
        callback(null, isMatch);
    })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model class 
module.exports = ModelClass;