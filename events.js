const express = require('express');
const router = express.Router();
const db = require('../db');
const protect = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
    try {
        const { rows } = await db.query(
            `SELECT e.* FROM events e
             JOIN rsvps r ON r.event_id = e.id
             WHERE r.user_id = $1`,
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/:id/rsvp', protect, async (req, res) => {
    const { status } = req.body;
    try {
        await db.query(
            `INSERT INTO rsvps (event_id, user_id, rsvp_status)
             VALUES ($1, $2, $3)
             ON CONFLICT (event_id, user_id) DO UPDATE SET rsvp_status = $3`,
            [req.params.id, req.user.id, status]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;