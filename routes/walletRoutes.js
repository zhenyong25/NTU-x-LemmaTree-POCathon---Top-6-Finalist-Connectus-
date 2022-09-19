const express = require('express')
const walletController = require('../controllers/walletController')

const router = express.Router()

router.get('/', walletController.getAllAssets);
// router.get('/create', walletController.wallet_create_get)
// router.get('/:id', walletController.wallet_details)
// router.post('/', walletController.wallet_create_post);
// router.delete('/:id', walletController.wallet_delete)

module.exports = router