const express = require('express')
const router = express.Router();
const agentListModel = require('../models/agentListModel.js');

router.get('/findById/:ra_regno', agentListModel.findById);

module.exports = router