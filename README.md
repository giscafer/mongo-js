# mongo-js

mongodb操作数据库 demo，含批量操作修改mongodb数据库脚本`

- DEMO1——mongodb 目录：使用 mongodb 中间件操作 （不定义schema的时候推荐此方式）
- DEMO2——mongoose 目录：使用 mongoose 中间件操作 （需要定义schema才能使用，无完整schema时建议使用demo1方式）
- DEMO3——mongodbBatch 目录：使用 mongodb 中间件操作 ，批量更新异步统计完成和失败记录情况和总用时

## usage

- npm install
- 执行 mongodb demo : `node ./mongodb/connect.js` 或可以直接执行：`node index.js`
- 执行 mongoose demo : `node ./mongoose/index.js

