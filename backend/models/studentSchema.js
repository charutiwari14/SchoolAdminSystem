const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNum: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    phoneNo: {
        type: String, // Changed type to String for phone number
        required: true,
        // Adding a custom validator to validate phone number format
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Assuming a 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    gender: {
        type: String, // Assuming gender will be a string
        enum: ['Male', 'Female', 'Other'], // Assuming three options: Male, Female, Other
        required: true
    },
    dateOfBirth: {
        type: Date, // Assuming date of birth will be a Date type
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    role: {
        type: String,
        default: "Student"
    },
    examResult: [
        {
            subName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
            required: true
        }
    }]
});

module.exports = mongoose.model("student", studentSchema);