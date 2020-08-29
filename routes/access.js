const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')
const router = express.Router()

router.get('/register', async (req, res) => res.render('register.ejs'))

router.post('/register', bodyparser.urlencoded({extended: false}), async (req, res) => {
  const UserService = require('../services/users.js')

  UserService.create(req.body)

  res.redirect('/login')
})

module.exports = router
