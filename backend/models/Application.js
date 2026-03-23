const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    volunteerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'attended'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// A volunteer should only be able to apply once to a specific event
applicationSchema.index({ eventId: 1, volunteerId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
