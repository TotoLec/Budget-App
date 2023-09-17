const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    label: {
        type: String,
        required: true,
        min: 2
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('History', historySchema);