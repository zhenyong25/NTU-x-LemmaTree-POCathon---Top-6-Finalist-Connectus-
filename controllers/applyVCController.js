//// const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const {redisClient} = require('../db/index')
require('dotenv').config()

const baseUrl_issuer = 'https://affinity-issuer.prod.affinity-project.org/api/v1';
const baseUrl_wallet = 'https://cloud-wallet-api.prod.affinity-project.org/api/v1'

const applyVCPage = (req, res) => {
    res.render('./applyVC/apply', {title: 'Apply Verified Credentials', loggedIn: true})
}

const createVC = (req, res) => {
    var type = req.body.typeVC
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var email = req.body.email
    var country = req.body.country
    var organizationName = req.body.organizationName
    var issuanceDate = req.body.issuanceDate
    var file = req.body.file

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': baseUrl_issuer + '/vc/build-unsigned',
        'headers': {
            'Content-Type': "application/json",
            'Api-Key': process.env.AFFINIDI_API_KEY_HASH
        },
        body: JSON.stringify({
            "type": type,
            "data": {
              "firstName": firstName,
              "lastName": lastName,
              "email": email,
              "country": country,
              "organization": organizationName,
              "issuanceDate": issuanceDate,
              "file": file
            },
            "holderDid": req.cookies.did
          })
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        else {
            var responseBody = JSON.parse(response.body) 
            var unsignedVC = responseBody.unsignedVC;

            console.log(unsignedVC);

            res.cookie("unsignedVC", unsignedVC);
            //return res.redirect("/apply/signVC");
        }
    });
}


const signVC = (req, res) => {
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': baseUrl_wallet + '/wallet/sign-credential',
        'headers': {
            'Api-Key': process.env.AFFINIDI_API_KEY_HASH,
            'Authorization': req.cookies.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "unsignedCredential": req.cookies.unsignedVC,
        })
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        else {
            console.log(response.body)
        }
    });
}

/*const storeVC = (req, res) => {
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': baseUrl + '/wallet/credentials',
        'headers': {
            'Api-Key': process.env.AFFINIDI_API_KEY_HASH,
            'Authorization': req.cookies.accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "data": ,
        })
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        else {
            res.status(200).redirect('/assets')
        }
    });
}*/

module.exports = {
    applyVCPage, createVC, signVC
};