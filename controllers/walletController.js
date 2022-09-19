const Wallet = require('../models/wallets.js')
var request = require('request');

const baseUrl = 'https://cloud-wallet-api.prod.affinity-project.org/api/v1'

const getAllAssets = (req, res) => {
    var options = {
        'method': 'GET',
        'url': baseUrl + '/wallet/credentials',
        'headers': {
            'Api-Key': process.env.AFFINIDI_API_KEY_HASH,
            'Authorization': req.cookies.accessToken
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.render('wallets/myAsset', {title: 'My Credentials', credentials: response.body, loggedIn: true});
    });
}


module.exports = {
    getAllAssets
}