var mongoose = require('mongoose');

// define the schema for our user model
const Schema = mongoose.Schema;
var TrainerSchema = new Schema({
    name:String,
    users:[{type: Schema.Types.ObjectId}],
        email        : String,
        password     : String
    });


// methods ======================
// generating a hash

module.exports = mongoose.model("trainer",TrainerSchema);
