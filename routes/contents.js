const express = require('express');

const router = express.Router();

const contentsController = require('../controllers/contents_controller');

router.get('/details',contentsController.details);
module.exports=router;
  
