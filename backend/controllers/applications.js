const Application = require('../models/Application');
const Event = require('../models/Event');

exports.applyForEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const event = await Event.findById(eventId);
        
        if (!event) return res.status(404).json({ success: false, error: 'Event not found' });

        const existingApp = await Application.findOne({ eventId, volunteerId: req.user.id });
        if (existingApp) {
            return res.status(400).json({ success: false, error: 'You have already applied' });
        }

        const application = await Application.create({
            eventId,
            volunteerId: req.user.id
        });

        res.status(201).json({ success: true, data: application });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getApplications = async (req, res) => {
    try {
        if (req.user.role === 'volunteer') {
            const apps = await Application.find({ volunteerId: req.user.id }).populate('eventId');
            return res.status(200).json({ success: true, count: apps.length, data: apps });
        }

        if (req.user.role === 'organizer') {
            const events = await Event.find({ organizerId: req.user.id });
            const eventIds = events.map(e => e._id);
            const apps = await Application.find({ eventId: { $in: eventIds } })
                .populate('volunteerId', 'name email skills')
                .populate('eventId', 'title date');
            return res.status(200).json({ success: true, count: apps.length, data: apps });
        }
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        let application = await Application.findById(req.params.id).populate('eventId');
        if (!application) return res.status(404).json({ success: false, error: 'Application not found' });

        if (application.eventId.organizerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, error: 'Not authorized to change this application' });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ success: true, data: application });
    } catch (err) {
        console.error("DEBUG APPLICATION STATUS ERROR:", err);
        res.status(400).json({ success: false, error: err.message });
    }
};
