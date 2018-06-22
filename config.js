
const password = encodeURIComponent('密码');

module.exports = {
    //mongodb://127.0.0.1:27017
    DB_CONN_STR: `mongodb://帐号:${password}@127.0.0.1:27017`, // 数据库为 test
    // DB_CONN_STR: `mongodb://127.0.0.1:27017`, // 数据库为 test
}