require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');

async function debug() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');

    // Find the test student
    try {
        const student = await Student.findOne({ email: 'test@gmail.com', uniqueCode: 'TEST123' });
        if (student) {
            console.log('Student found:', JSON.stringify(student.toObject(), null, 2));
        } else {
            console.log('Student NOT found');
            // Check if it exists at all
            const all = await Student.find({});
            console.log('All students:', all.length);
            all.forEach(s => console.log(' -', s.email, s.uniqueCode));
        }
    } catch (err) {
        console.error('Error:', err.message);
    }

    await mongoose.disconnect();
}

debug();
