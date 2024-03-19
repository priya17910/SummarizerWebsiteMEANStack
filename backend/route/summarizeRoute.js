const express = require('express');
const router = express.Router();
const summarizeController = require('../controller/summarizeController');

router.get('/summarized-text/:userId', summarizeController.getSummarizedTextByUserId);

router.post('/summarized-text', summarizeController.summarize);

module.exports = router;
