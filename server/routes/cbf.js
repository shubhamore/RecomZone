const express = require('express');
const router = express.Router();

const { recommendations } = require('../controllers/cbf');

router.post('/recommendations', recommendations);

module.exports = router;
