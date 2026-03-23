const express = require('express');
const { getEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getEvents)
    .post(protect, authorize('organizer'), createEvent);

router.route('/:id')
    .get(getEvent)
    .put(protect, authorize('organizer'), updateEvent)
    .delete(protect, authorize('organizer'), deleteEvent);

module.exports = router;
