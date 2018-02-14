var mongoose = require('mongoose');

// define the schema for our user model
const Schema = mongoose.Schema;
var UserSchema = new Schema({
    name:String,
    trainer:{type: Schema.Types.ObjectId,ref:'trainer'},
        email        : String,
        password     : String
    });


// methods ======================
// generating a hash

module.exports = mongoose.model("user",UserSchema);
