var mongoose = require('mongoose');
var user = require('user');
// define the schema for our user model

var TrainerSchema = mongoose.Schema({
    name:String,
    users:[{type: Schema.Types.ObjectId,ref:'user'}],
        email        : String,
        password     : String
    });


// methods ======================
// generating a hash

module.exports = mongoose.model("trainer",TrainerSchema);
