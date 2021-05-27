const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);
router.get('/comment',usersController.comment);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
router.post('/create-session',usersController.createSession);
router.post('/logout',usersController.logout);
module.exports=router;
