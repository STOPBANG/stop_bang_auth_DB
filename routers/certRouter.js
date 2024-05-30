const express = require('express')
const router = express.Router();
const certModel = require('../models/certModel.js');

router.put('/create', certModel.create);
router.post('/findCertByCode', certModel.findCertByCode);

module.exports = router