const express = require('express')
const router = express.Router();
const agentAuthModel = require('../models/agentAuthModel.js');

router.post('/create', agentAuthModel.create);
router.post('/findById', agentAuthModel.findById);
router.get('/findByRaRegno/:ra_regno', agentAuthModel.findByRaRegno);
router.put('/update', agentAuthModel.update);
router.put('/updatepw', agentAuthModel.updatepw);
router.post('/delete', agentAuthModel.delete);

module.exports = router