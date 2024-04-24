const express = require('express')
const router = express.Router();
const residentAuthModel = require('../models/residentAuthModel.js');

router.put('/create', residentAuthModel.create);
router.post('/findById', residentAuthModel.findById);
router.delete('/delete', residentAuthModel.delete);

module.exports = router