//用户数据模型
var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    updated_time:{type: Date, default: new Date().getTime()}
})

module.exports = mongoose.model('User', UserSchema);