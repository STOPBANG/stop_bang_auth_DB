const express = require('express')
const router = express.Router();
const residentAuthModel = require('../models/residentAuthModel.js');

router.post('/create', residentAuthModel.create);
router.post('/findById', residentAuthModel.findById);
router.put('/update', residentAuthModel.update);
router.put('/updatepw', residentAuthModel.updatepw);
router.post('/delete', residentAuthModel.delete);

module.exports = router