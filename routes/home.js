const express = require('express');
const router = express.Router();
const homePageController  = require('../controllers/homepage');

router.get('/', homePageController.landing);
router.get('/room', homePageController.room);

module.exports = router;