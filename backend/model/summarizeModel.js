const mongoose = require('mongoose');
const User = require('../model/authModel');

const summarizedTextSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    originalText: {
        type: String,
        required: true
    },
    summarizedText: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SummarizedText', summarizedTextSchema);