const mongoose = require('mongoose');

DB_URL = 'mongodb://localhost:27017/react_admin';

mongoose.connect(DB_URL);

mongoose.connection.on('connected', function () { 

    console.log('Mongoose connection open to ' + DB_URL); 
}); /** * 连接异常 */ 

mongoose.connection.on('error',function (err) { 

    console.log('Mongoose connection error: ' + err); 
}); /** * 连接断开 */ 

mongoose.connection.on('disconnected', function () { 

    console.log('Mongoose connection disconnected'); 
});

module.exports = mongoose;