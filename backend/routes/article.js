const express = require('express');
const router = express.Router();
const reptileRe = require('../reptile/getArticle')

router.post('/', function(req, res, next) {
    (async()=>{
        // console.log(req.body.Route,'true')
        return reptileRe(req.body.Route,true)
    })().then(result=>{
        // console.log(result)
        res.status(200).json(result);
    }).catch(err=>{
        if(err)throw err;
    })
});
module.exports = router;