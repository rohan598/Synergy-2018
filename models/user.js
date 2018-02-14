var mongoose = require('mongoose');
var trainer = require('trainer');
// define the schema for our user model

var UserSchema = mongoose.Schema({
    name:String,
    trainer:{type: Schema.Types.ObjectId,ref:'trainer'},
        email        : String,
        password     : String
    });


// methods ======================
// generating a hash

module.exports = mongoose.model("user",UserSchema);
