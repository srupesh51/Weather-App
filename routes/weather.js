const express = require('express');
const router = express.Router();
const weatherAPIController = require('./../controllers/weather');
router.post('/city', weatherAPIController.getWeather);
module.exports = router;
