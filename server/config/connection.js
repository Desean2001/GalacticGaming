const mongoose = require('mongoose');

mongoose.connect(import.meta.env.MONGODB_URI);

module.exports = mongoose.connection;