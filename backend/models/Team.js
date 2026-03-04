const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    isLeader: {
        type: Boolean,
        default: false,
    },
    isPresent: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

const teamSchema = new mongoose.Schema({
    serialNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    teamName: {
        type: String,
        required: true,
    },
    members: [memberSchema],
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
