const { Schema } = require('mongoose');

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    background_image: {
        type: String
    },
    metacritic: {
        Number
    },
    released: {
        type: String
    },
    id: {
        Number
    }
});

module.exports = gameSchema;