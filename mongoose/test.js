// consignor Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let projectSchema = new Schema({
    "name": String,
    "basepath": String,
    "project_type": String,
    "group_id": Number,
});


const projectModel = mongoose.model('project', projectSchema);

// 查询所有
const query = projectModel.find({});
// const query = consignor.find({ hostname: '9ddf22e858df' });
query.exec((err, res) => {
    console.log('所有记录数：', res.length);
});

// 查询一个
let query_doc = { name: /小明/i };
projectModel.findOne(query_doc, function(err, data) {
    if (err) {
        console.log('query one error');
    } else {
        console.log(data); //此时为一个结果对象
    }
});

// 保存一条记录

let saveobj = new projectModel({ name: '小明' + new Date().getTime(), group_id: new Date().getTime() });
saveobj.save(function(err) {
    if (err) {
        console.log('save error')
        console.log(err)
    } else {
        console.log('save successs');
    }
});