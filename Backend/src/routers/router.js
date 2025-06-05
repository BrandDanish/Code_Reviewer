const express= require('express');
const router = express.Router();
const aiController = require('../controllers/controller');
 router.post('/code-review', aiController.getReview);

module.exports= router;