const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yapi', function(err) {
    if (err) {
        console.error('connect to %s error: ', err.message);
        // process.exit(1);
    }
});

const dbcon = mongoose.connection;

//监听关闭事件并重连  
dbcon.on('disconnected', function() {
    console.log('disconnected');
    dbcon.close();
});
dbcon.on('open', function() {
    console.log('connection success open');
});
dbcon.on('close', function(err) {
    console.log('closed');
});

module.exports = dbcon;