const express = require('express');
const { applyForEvent, getApplications, updateApplicationStatus } = require('../controllers/applications');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, authorize('volunteer'), applyForEvent)
    .get(protect, getApplications);

router.route('/:id')
    .put(protect, authorize('organizer'), updateApplicationStatus);

module.exports = router;
