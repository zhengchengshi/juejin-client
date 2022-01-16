const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/juejin_history',(err)=>{
    if(err)throw err;
    else{
        console.log("数据库连接成功");
    }
})

module.exports = mongoose;
