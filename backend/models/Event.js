const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add an event title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add an event description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    organizerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: [true, 'Please add an event date']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    requiredVolunteers: {
        type: Number,
        required: [true, 'Please specify the number of volunteers required'],
        min: [1, 'Must require at least 1 volunteer']
    },
    skills: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
