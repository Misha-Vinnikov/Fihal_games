const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    developer: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
});

const game = mongoose.model('game', gamesSchema);
module.exports = game;