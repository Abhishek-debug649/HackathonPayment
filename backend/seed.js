// This script inserts a test student into MongoDB so you can test the full flow.
// Run with: node seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');

const testStudent = {
    email: 'test@gmail.com',
    uniqueCode: 'TEST123',
    name: 'Rahul Sharma',
    studentId: 'STU001',
    teamName: 'Team Alpha',
    phoneNumber: 9876543210,
    paymentSubmitted: false,
    utrCode: '',
    screenshotUrl: '',
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if test student already exists
        const existing = await Student.findOne({ email: testStudent.email });
        if (existing) {
            console.log('Test student already exists! Resetting...');
            existing.paymentSubmitted = false;
            existing.utrCode = '';
            existing.screenshotUrl = '';
            existing.phoneNumber = testStudent.phoneNumber;
            existing.isApproved = 'pending';
            await existing.save();
            console.log('Test student reset successfully!');
        } else {
            await Student.create(testStudent);
            console.log('Test student created successfully!');
        }

        console.log('\n--- Test Credentials ---');
        console.log('Email:       test@gmail.com');
        console.log('Unique Code: TEST123');
        console.log('------------------------\n');

        await mongoose.disconnect();
        console.log('Done!');
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
