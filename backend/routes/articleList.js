const express = require('express');
const reptileRes = require('../reptile/index')
const router = express.Router();

router.post('/', function(req, res, next) {
  (async()=>{
    console.log(req.body.route)
    const data = reptileRes(req.body.route,true).catch(err=>{
        if(err){
          reptileRes(req.body.route,true)
          throw err
        }
    })
    return data
  })().then((result)=>{
    (async()=>{
      // result.titleDomTextList.map(item=>{
      //   // console.log(item.imgUrl)
      // })
      res.send(result)

      // res.send(result.tag)
      // newdata= await reptileRes(req.body.route)
      // console.log(newdata.tag)
    })().catch(err=>{
      if(err)throw err;
    })
  }).catch(err=>{
    if(err)throw err;
  })
});
// exports.data = tag;
module.exports = router;