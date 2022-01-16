const express = require('express');
const router = express.Router();
const history = require('../controller/historyController')
router.get('/',history.historyController)

module.exports = router;