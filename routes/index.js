const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router loaded');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/contents',require('./contents'));
// for any other routes access from here
module.exports=router;
