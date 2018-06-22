const fs = require('fs');
const Eventproxy = require('eventproxy');
const dbOption = require('../conn-opt');
let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://127.0.0.1:27017'; // 数据库为 test
// let DB_CONN_STR = 'mongodb://test:123456@127.0.0.1:27017/test'; // 数据库为 test

const ep = new Eventproxy();

let errorIds = [];
let timeoutIds = [];




let selectData = function (collection, callback) {
    //查询数据
    let whereStr = {
        "customer.customerType":"consignor",
        "customer.type":"ordinary",
    };
    try {
        collection.find(whereStr).toArray(function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            callback(result);
        });
    } catch (error) {
        console.log(error)
    }
}
let test = function (collection, callback) {
    //更新数据
    let _id = '5b1f79d705801b20205e1279';
    let orderAddTime = '2018-06-23 11:11:11';
    let whereStr = { "_id": _id };
    let updateStr = { $set: { "waybillInfo.waybillBasicInfo.orderAddTime": new Date(orderAddTime) } };
    collection.update(whereStr, updateStr, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        callback(result);
    });
}
let updateData = function (collection, record, callback) {
    //更新数据
    let _id = record._id;
    let orderAddTime = record.waybillInfo.waybillBasicInfo.orderAddTime;
    let whereStr = { "_id": _id };
    let updateStr = { $set: { "waybillInfo.waybillBasicInfo.orderAddTime": new Date(orderAddTime) } };
    collection.update(whereStr, updateStr, function (err, result) {

        ep.fire('update_done');
        ep.fire('update_success_done', _id);

        if (err) {
            console.log('Update Error:' + err);
            timeoutIds.push(_id);
            ep.fire('update_timeout', timeoutIds);
            return;
        }
        callback(result);
    });
}


// 链接数据库并执行操作
MongoClient.connect(DB_CONN_STR, dbOption, function (err, dbcon) {
    let db = dbcon.db("finance");
    if (err) {
        console.log(err);
        return;
    }
    console.log("连接成功！");
    let startTime = new Date().getTime();
    //连接到表  
    let collection = db.collection('flowRecord');

    selectData(collection, function (result) {
        const { length } = result;
        console.log(`总记录数${length}`);
        errorIds = [];
        let num = Math.floor(length / 5000);
        let other = length % 5000;
        // eventHandler(length, startTime);

        // for (let i = 0; i < length; i++) {
        //     let record = result[i];
        //     if (record.waybillInfo && record.waybillInfo.waybillBasicInfo && record.waybillInfo.waybillBasicInfo.orderAddTime) {
        //         updateData(collection, record, (res) => {
        //             if (res.result.ok != 1) {
        //                 console.log(`id为${record._id}更新状态：${res.result.ok}`);
        //                 errorIds.push(record._id);
        //             }
        //             console.log(record._id, ' ' + i);
        //         })
        //     } else {
        //         ep.fire('update_done');
        //         ep.fire('update_success_done', record._id);
        //     }
        // }

        // dbcon.close();
    });

});


function eventHandler(length, startTime) {
    // 所有异步处理完成
    ep.after('update_error_done', length, () => {
        errorIds.push('更新执行完毕');
        fs.writeFileSync('./errorIds.json', JSON.stringify(errorIds));
    });
    ep.after('update_success_done', length, (ids) => {
        let endTime = new Date().getTime();
        console.log(`所用时：${endTime - startTime}ms`);
        console.log('更新执行完毕');
        fs.writeFileSync('./successIds.json', JSON.stringify(ids));
    });
    ep.on('update_timeout', (ids) => {
        console.log('update_timeout------- writeFileSync');
        fs.writeFileSync('./timeoutIds.json', JSON.stringify(ids));
    });
}