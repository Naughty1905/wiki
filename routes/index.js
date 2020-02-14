const express = require('express');


const router = express.Router();
// const User = require('../models/users');
const Category = require('../models/categories');
/* GET home page. */
router.get('/', async (req, res) => {
  if (req.session.user) {
    const categories = await Category.find();
    return res.render('index', {
      categories,
      title: 'Express',
      username: req.session.user.username,
    });
  }
  res.render('login');
});


router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('token');
      res.redirect('/');
    } catch (err) {
      res.redirect('/');
    }
  }
});

module.exports = router;
