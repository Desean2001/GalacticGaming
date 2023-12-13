const mongoose = require('mongoose');

mongoose.connect(import.meta.env.VITE_MONGODB_URI);

module.exports = mongoose.connection;