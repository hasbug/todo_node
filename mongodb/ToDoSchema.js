//任务清单数据模型

var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({
    note: String,
    completed: Boolean,
    userId:mongoose.Schema.Types.ObjectId,
    updated_time: {type:Date, default:new Date().getTime()}
})

module.exports = mongoose.model('Todo', ToDoSchema);