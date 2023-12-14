const express = require("express");
const router = express.Router()

const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

module.exports = router;