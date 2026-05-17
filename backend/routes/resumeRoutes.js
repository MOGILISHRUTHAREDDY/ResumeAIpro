const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.post('/', resumeController.createResume);
router.get('/:id', resumeController.getResume);
router.put('/:id', resumeController.updateResume);

module.exports = router;
