var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo')
var db = mongoose.connection;

db.once('open' ,() => {
	console.log('连接数据库成功');
})

db.on('error', console.error.bind(console, 'connection error:'));

module.exports={
    db:db
} 