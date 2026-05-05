const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/suggest', aiController.suggestWording);
router.post('/score', aiController.scoreResume);

module.exports = router;
