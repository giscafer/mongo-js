var MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://127.0.0.1:27017/test'; // 数据库为 test
// let DB_CONN_STR = 'mongodb://test:123456@127.0.0.1:27017/test'; // 数据库为 test

let insertData = function(db, callback) {
    //连接到表 site
    let collection = db.collection('site');
    //插入数据
    let data = [{ "name": "giscafer首页", "url": "www.giscafer.com" }, { "name": "giscafer博客", "url": "blog.giscafer.com" }];
    collection.insert(data, function(err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}
let selectData = function(db, callback) {
    //连接到表  
    let collection = db.collection('site');
    //查询数据
    let whereStr = { "name": 'giscafer首页' };
    collection.find(whereStr).toArray(function(err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}
let updateData = function(db, callback) {
    //连接到表  
    let collection = db.collection('site');
    //更新数据
    let whereStr = { "name": 'giscafer首页' };
    let updateStr = { $set: { "url": "https://www.giscafer.com" } };
    collection.update(whereStr, updateStr, function(err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}
let delData = function(db, callback) {
    //连接到表  
    let collection = db.collection('site');
    //删除数据
    let whereStr = { "name": 'giscafer首页' };
    collection.remove(whereStr, function(err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}

// 链接数据库并执行操作
MongoClient.connect(DB_CONN_STR, function(err, dbcon) {
    let db = dbcon.db("test");
    if (err) {
        console.log(err);
        return;
    }
    console.log("连接成功！");
    //1、插入
    insertData(db, function(result) {
        console.log(result);
        dbcon.close();
    });
    //2、查询数据
    selectData(db, function(result) {
        console.log(result);
        dbcon.close();
    });
    //3、更新数据
    updateData(db, function(result) {
        console.log(result);
        dbcon.close();
    });
    //4、删除数据
    delData(db, function(result) {
        console.log(result);
        dbcon.close();
    });

});