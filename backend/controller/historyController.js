const historyDataSchema = require('../model/historyModel');




exports.addHistoryController = function(req,res){
    const historyInstance = new historyDataSchema({
        
            author:req.body.data.author,
            postTime:req.body.data.postTime,
            tag:req.body.data.tag,
            postTitle:req.body.data.postTitle,
            description:req.body.data.description,
            watchNum:req.body.data.watchNum,
            thumbNum:req.body.data.thumbNum,
            commentNum:req.body.data.commentNum,
            imgUrl:req.body.data.imgUrl,
            id:req.body.data.id
        
    })
    historyInstance.save((err)=>{
        if(err)throw err;
        else{
            
        }
    })
    console.log(req.body.data)
    // res.send(req.body)
    res.send('success')
    // historyDataSchema.find({},(err,data)=>{
    //     if(err)throw err;
    //     else{
    //     }
    // })
}

exports.historyController = function(req,res){
    historyDataSchema.find({},(err,doc)=>{
        if(err)throw err;
        else{
            const loseweight = () => {
                let map = new Map();
                for (let item of doc.reverse()) {
                    if (!map.has(item.id)) {
                        map.set(item.id, item);
                    }
                }
                return [...map.values()];
            }
            let uniqueArr = loseweight()
            res.send(uniqueArr)
        }
    })
}