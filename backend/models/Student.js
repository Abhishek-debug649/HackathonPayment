const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  uniqueCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  isApproved: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  paymentSubmitted: {
    type: Boolean,
    default: false,
  },
  utrCode: {
    type: String,
    default: "",
  },
  screenshotUrl: {
    type: String,
    default: "",
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
