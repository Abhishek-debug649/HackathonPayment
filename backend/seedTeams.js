// Seed script to insert team data into the 'teams' collection
// Run with: node seedTeams.js

require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./models/Team');

const teamsData = [
    {
        serialNumber: 1,
        teamName: "Code Graphers",
        members: [
            { name: "Himanshu Rawat", phoneNumber: 9068098724, email: "himu35311@gmail.com", studentId: "230111540", isLeader: true, isPresent: false },
            { name: "Abhishek Negi", phoneNumber: 9876543201, email: "abhishek.negi@gmail.com", studentId: "230111541", isLeader: false, isPresent: false },
            { name: "Sneha Verma", phoneNumber: 9876543202, email: "sneha.verma@gmail.com", studentId: "230111542", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 2,
        teamName: "Delta",
        members: [
            { name: "Deepika Nair", phoneNumber: 9501803783, email: "student013@university.edu", studentId: "2026STU113", isLeader: true, isPresent: false },
            { name: "Arjun Mehta", phoneNumber: 9501803784, email: "arjun.mehta@university.edu", studentId: "2026STU114", isLeader: false, isPresent: false },
            { name: "Riya Joshi", phoneNumber: 9501803785, email: "riya.joshi@university.edu", studentId: "2026STU115", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 3,
        teamName: "Zeta",
        members: [
            { name: "Kavya Malhotra", phoneNumber: 8433900992, email: "student014@university.edu", studentId: "2026STU114", isLeader: true, isPresent: false },
            { name: "Rohan Gupta", phoneNumber: 8433900993, email: "rohan.gupta@university.edu", studentId: "2026STU116", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 4,
        teamName: "Beta",
        members: [
            { name: "Rohan Singh", phoneNumber: 8640617350, email: "student017@university.edu", studentId: "2026STU117", isLeader: true, isPresent: false },
            { name: "Ananya Sharma", phoneNumber: 8640617351, email: "ananya.sharma@university.edu", studentId: "2026STU118", isLeader: false, isPresent: false },
            { name: "Vikram Patel", phoneNumber: 8640617352, email: "vikram.patel@university.edu", studentId: "2026STU119", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 5,
        teamName: "Pixel Pirates",
        members: [
            { name: "Deepika Reddy", phoneNumber: 7148461942, email: "student021@university.edu", studentId: "2026STU121", isLeader: true, isPresent: false },
            { name: "Aditya Kumar", phoneNumber: 7148461943, email: "aditya.kumar@university.edu", studentId: "2026STU122", isLeader: false, isPresent: false },
            { name: "Meera Iyer", phoneNumber: 7148461944, email: "meera.iyer@university.edu", studentId: "2026STU123", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 6,
        teamName: "Binary Brains",
        members: [
            { name: "Saurabh Tiwari", phoneNumber: 9312456780, email: "saurabh.tiwari@gmail.com", studentId: "230111601", isLeader: true, isPresent: false },
            { name: "Priya Chauhan", phoneNumber: 9312456781, email: "priya.chauhan@gmail.com", studentId: "230111602", isLeader: false, isPresent: false },
            { name: "Nikhil Rana", phoneNumber: 9312456782, email: "nikhil.rana@gmail.com", studentId: "230111603", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 7,
        teamName: "Debuggers",
        members: [
            { name: "Tanisha Aggarwal", phoneNumber: 8899001122, email: "tanisha.a@university.edu", studentId: "2026STU201", isLeader: true, isPresent: false },
            { name: "Harsh Vardhan", phoneNumber: 8899001123, email: "harsh.v@university.edu", studentId: "2026STU202", isLeader: false, isPresent: false },
            { name: "Sakshi Rao", phoneNumber: 8899001124, email: "sakshi.r@university.edu", studentId: "2026STU203", isLeader: false, isPresent: false },
            { name: "Kunal Bisht", phoneNumber: 8899001125, email: "kunal.b@university.edu", studentId: "2026STU204", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 8,
        teamName: "Stack Overflow",
        members: [
            { name: "Aman Tripathi", phoneNumber: 7788990011, email: "aman.t@gmail.com", studentId: "230111701", isLeader: true, isPresent: false },
            { name: "Divya Saxena", phoneNumber: 7788990012, email: "divya.s@gmail.com", studentId: "230111702", isLeader: false, isPresent: false },
            { name: "Mohit Jain", phoneNumber: 7788990013, email: "mohit.j@gmail.com", studentId: "230111703", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 9,
        teamName: "Cyber Monks",
        members: [
            { name: "Ishaan Kapoor", phoneNumber: 9123456701, email: "ishaan.k@university.edu", studentId: "2026STU301", isLeader: true, isPresent: false },
            { name: "Nandini Bhatt", phoneNumber: 9123456702, email: "nandini.b@university.edu", studentId: "2026STU302", isLeader: false, isPresent: false },
            { name: "Varun Thakur", phoneNumber: 9123456703, email: "varun.t@university.edu", studentId: "2026STU303", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 10,
        teamName: "Hack Hustlers",
        members: [
            { name: "Shreya Pandey", phoneNumber: 9988776601, email: "shreya.p@gmail.com", studentId: "230111801", isLeader: true, isPresent: false },
            { name: "Rajat Mishra", phoneNumber: 9988776602, email: "rajat.m@gmail.com", studentId: "230111802", isLeader: false, isPresent: false },
            { name: "Pooja Rawat", phoneNumber: 9988776603, email: "pooja.r@gmail.com", studentId: "230111803", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 11,
        teamName: "Neural Network",
        members: [
            { name: "Aakash Dubey", phoneNumber: 8877665501, email: "aakash.d@university.edu", studentId: "2026STU401", isLeader: true, isPresent: false },
            { name: "Kritika Singh", phoneNumber: 8877665502, email: "kritika.s@university.edu", studentId: "2026STU402", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 12,
        teamName: "Algo Assassins",
        members: [
            { name: "Yash Chauhan", phoneNumber: 7766554401, email: "yash.c@gmail.com", studentId: "230111901", isLeader: true, isPresent: false },
            { name: "Simran Kaur", phoneNumber: 7766554402, email: "simran.k@gmail.com", studentId: "230111902", isLeader: false, isPresent: false },
            { name: "Dev Prakash", phoneNumber: 7766554403, email: "dev.p@gmail.com", studentId: "230111903", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 13,
        teamName: "Firewall",
        members: [
            { name: "Manish Rawat", phoneNumber: 9654321001, email: "manish.r@university.edu", studentId: "2026STU501", isLeader: true, isPresent: false },
            { name: "Ankita Bhandari", phoneNumber: 9654321002, email: "ankita.b@university.edu", studentId: "2026STU502", isLeader: false, isPresent: false },
            { name: "Gaurav Negi", phoneNumber: 9654321003, email: "gaurav.n@university.edu", studentId: "2026STU503", isLeader: false, isPresent: false },
            { name: "Swati Rawat", phoneNumber: 9654321004, email: "swati.r@university.edu", studentId: "2026STU504", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 14,
        teamName: "Runtime Terror",
        members: [
            { name: "Pankaj Sharma", phoneNumber: 8543210901, email: "pankaj.s@gmail.com", studentId: "230112001", isLeader: true, isPresent: false },
            { name: "Neha Bisht", phoneNumber: 8543210902, email: "neha.b@gmail.com", studentId: "230112002", isLeader: false, isPresent: false },
            { name: "Tushar Joshi", phoneNumber: 8543210903, email: "tushar.j@gmail.com", studentId: "230112003", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 15,
        teamName: "Quantum Coders",
        members: [
            { name: "Aditi Rawat", phoneNumber: 7432109801, email: "aditi.r@university.edu", studentId: "2026STU601", isLeader: true, isPresent: false },
            { name: "Rahul Panwar", phoneNumber: 7432109802, email: "rahul.p@university.edu", studentId: "2026STU602", isLeader: false, isPresent: false },
            { name: "Bhavna Negi", phoneNumber: 7432109803, email: "bhavna.n@university.edu", studentId: "2026STU603", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 16,
        teamName: "Code Crushers",
        members: [
            { name: "Vivek Uniyal", phoneNumber: 6321098701, email: "vivek.u@gmail.com", studentId: "230112101", isLeader: true, isPresent: false },
            { name: "Ritu Sharma", phoneNumber: 6321098702, email: "ritu.s@gmail.com", studentId: "230112102", isLeader: false, isPresent: false },
            { name: "Sagar Rawat", phoneNumber: 6321098703, email: "sagar.r@gmail.com", studentId: "230112103", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 17,
        teamName: "Byte Force",
        members: [
            { name: "Karan Thapa", phoneNumber: 9210987601, email: "karan.t@university.edu", studentId: "2026STU701", isLeader: true, isPresent: false },
            { name: "Megha Joshi", phoneNumber: 9210987602, email: "megha.j@university.edu", studentId: "2026STU702", isLeader: false, isPresent: false },
            { name: "Akash Semwal", phoneNumber: 9210987603, email: "akash.s@university.edu", studentId: "2026STU703", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 18,
        teamName: "Logic Lords",
        members: [
            { name: "Prateek Gusain", phoneNumber: 8109876501, email: "prateek.g@gmail.com", studentId: "230112201", isLeader: true, isPresent: false },
            { name: "Anjali Rawat", phoneNumber: 8109876502, email: "anjali.r@gmail.com", studentId: "230112202", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 19,
        teamName: "Tech Titans",
        members: [
            { name: "Shivam Negi", phoneNumber: 7098765401, email: "shivam.n@university.edu", studentId: "2026STU801", isLeader: true, isPresent: false },
            { name: "Komal Bisht", phoneNumber: 7098765402, email: "komal.b@university.edu", studentId: "2026STU802", isLeader: false, isPresent: false },
            { name: "Deepak Rawat", phoneNumber: 7098765403, email: "deepak.r@university.edu", studentId: "2026STU803", isLeader: false, isPresent: false },
            { name: "Suman Thakur", phoneNumber: 7098765404, email: "suman.t@university.edu", studentId: "2026STU804", isLeader: false, isPresent: false },
        ],
    },
    {
        serialNumber: 20,
        teamName: "Syntax Error",
        members: [
            { name: "Lakshay Rawat", phoneNumber: 9987654301, email: "lakshay.r@gmail.com", studentId: "230112301", isLeader: true, isPresent: false },
            { name: "Tanya Chauhan", phoneNumber: 9987654302, email: "tanya.c@gmail.com", studentId: "230112302", isLeader: false, isPresent: false },
            { name: "Rohit Panwar", phoneNumber: 9987654303, email: "rohit.p@gmail.com", studentId: "230112303", isLeader: false, isPresent: false },
        ],
    },
];

async function seedTeams() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing teams
        await Team.deleteMany({});
        console.log('Cleared existing teams');

        // Insert all teams
        const result = await Team.insertMany(teamsData);
        console.log(`\n✅ Successfully inserted ${result.length} teams!\n`);

        // Print summary
        let totalMembers = 0;
        result.forEach((team) => {
            const leader = team.members.find((m) => m.isLeader);
            console.log(`  #${team.serialNumber} ${team.teamName} — ${team.members.length} members (Captain: ${leader?.name || 'N/A'})`);
            totalMembers += team.members.length;
        });

        console.log(`\n📊 Total: ${result.length} teams, ${totalMembers} members`);

        await mongoose.disconnect();
        console.log('\nDone!');
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seedTeams();
