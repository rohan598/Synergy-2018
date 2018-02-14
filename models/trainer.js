var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
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
TrainerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
TrainerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("trainer",TrainerSchema);
