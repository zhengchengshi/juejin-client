const mongoose = require('./core');

const historyDataSchema = new mongoose.Schema({
    
        author:{type:String,required:true},
        postTime:{type:String,required:true},
        tag:{type:String,required:true},
        postTitle:{type:String,required:true},
        description:{type:String,required:true},
        watchNum:{type:String,required:true},
        thumbNum:{type:String,required:true},
        commentNum:{type:String,required:true},
        imgUrl:{type:String},
        id:{type:String,required:true}
    
},{versionKey:false})

const historyModel = mongoose.model('History',historyDataSchema,'history');

module.exports = historyModel
