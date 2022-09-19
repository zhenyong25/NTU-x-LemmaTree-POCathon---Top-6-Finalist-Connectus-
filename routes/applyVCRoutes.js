const express = require('express')
const applyVCController = require('../controllers/applyVCController')

const router = express.Router()

router.get('/applyVC', applyVCController.applyVCPage);
router.post('/createVC', applyVCController.createVC);
router.post('/signVC', applyVCController.signVC);
//router.get('/store', applyVCController.storeVC);

module.exports = router