const express = require('express');
const router = express.Router();

// @route      GET   api/questions
// @desc       Test Route
// @access     Public
router.get('/', (req, res) => {
    res.send('Questions Route')
});

module.exports = router;