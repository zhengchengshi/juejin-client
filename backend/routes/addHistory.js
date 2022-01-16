const express = require('express');
const history = require('../controller/historyController')
const router = express.Router();

router.put('/',history.addHistoryController)

module.exports = router;