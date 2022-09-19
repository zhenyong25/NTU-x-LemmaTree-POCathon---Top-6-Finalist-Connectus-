// const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const {redisClient} = require('../db/index')
require('dotenv').config()

const baseUrl = 'https://cloud-wallet-api.prod.affinity-project.org/api/v1'

const signup = (req, res, next) => {
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': baseUrl + '/users/signup',
    'headers': {
      'Api-Key': process.env.AFFINIDI_API_KEY_HASH,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": req.body.username,
      "password": req.body.password,
      "options": {
        "didMethod": "elem"
      }
    })

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    else{
      res.status(200).redirect('/auth/login')
    }
  });
}

const signupPage = (req, res) => {
  res.render('./auth/signup', {title: 'Sign Up', loggedIn: false})
}

const loginPage = (req, res) => {
  res.render('./auth/login', {title: 'Login', loggedIn: false})
}

const logout = (req, res) => {
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': baseUrl + '/users/logout',
    'headers': {
      'Api-Key': process.env.AFFINIDI_API_KEY_HASH,
      'Authorization': req.cookies.accessToken
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    else res.render('./auth/logout', {title: 'Logout', loggedIn: false});
  });
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    var request = require('request');
    var options = {
      'method': 'POST',
      'url': baseUrl + '/users/login',
      'headers': {
        'Api-Key': process.env.AFFINIDI_API_KEY_HASH,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })

    };
    request(options, function (error, response) {
      if (error){
        res.status(401).send("Wrong credentials")
      }
      else{
        var responseBody = JSON.parse(response.body)
        var accessToken = responseBody.accessToken;
        var did = responseBody.did;
        res.cookie("did", did);
        res.cookie("accessToken", accessToken);
        if(responseBody.accessToken){
          return res.redirect("/assets"); // jobs page for employees; job posts page for organisations
        }
        
      }
    });
}
// const refresh = (req, res) => {
//     const refreshToken = req.body.token;
//     if(refreshToken == null) return res.status(401).json({"message": "No refresh token"})
//     redisClient.sismember("refreshTokens", refreshToken, function(err, result){
//         if(result === 1){
//             jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//                 if(err) res.sendStatus(403);
//                 let accessToken = generateAccessToken({username: user.username})
//                 res.status(200).json({accessToken: accessToken});
//             })
//         }
//         else{
//             res.status(401).json({"messsage": "no such refresh token"})
//         }
//     })
// };

// function generateAccessToken(user){
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '45m'})
// }

module.exports = {
  signupPage, signup, login, loginPage, logout
};