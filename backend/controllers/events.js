const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizerId', 'name email').sort('-createdAt');
        res.status(200).json({ success: true, count: events.length, data: events });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizerId', 'name email');
        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }
        res.status(200).json({ success: true, data: event });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc Create new event
// @access Private (organizers only)
exports.createEvent = async (req, res) => {
    try {
        req.body.organizerId = req.user.id;
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc Update event
// @access Private (organizer owner only)
exports.updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, error: 'Event not found' });

        if (event.organizerId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Not authorized to update' });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: event });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc Delete event
exports.deleteEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, error: 'Event not found' });

        if (event.organizerId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        await event.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
