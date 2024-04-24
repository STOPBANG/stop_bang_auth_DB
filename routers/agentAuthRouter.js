const express = require('express')
const router = express.Router();
const agentAuthModel = require('../models/agentAuthModel.js');

router.post('/findById', agentAuthModel.findById);
router.delete('/delete', agentAuthModel.delete);

module.exports = router