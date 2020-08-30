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

router.get('/login', async (req, res) => res.render('login.ejs'))

router.post('/login', bodyparser.urlencoded({extended: false}), async (req, res) => {
  const UserService = require('../services/users.js')

  var verified
  try {
    verified = await UserService.verify(req.body)
  } catch (e) {
    return res.render('login.ejs')
  }

  if (!verified) return res.render('login.ejs')

  req.session.user = await UserService.getIdFromName(req.body.name)
  res.redirect('/')
})

router.get('/logout', async (req, res) => {
  await req.session.destroy()

  res.redirect('/')
})

module.exports = router
