const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user_id:String,
  trainer_id:String,
  chats:[{
    chat:String,
    time:String,
    p:Boolean
  }]
});

UserSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('chat',ChatSchema);
