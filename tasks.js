const express = require('express');
const router = express.Router();
const db = require('../db');
const protect = require('../middleware/auth');

router.get('/:eventId', protect, async (req, res) => {
    try {
        const { rows } = await db.query(
            'SELECT * FROM tasks WHERE event_id = $1',
            [req.params.eventId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', protect, async (req, res) => {
    const { event_id, task_name, priority } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO tasks (event_id, assigned_to, task_name, priority) VALUES ($1, $2, $3, $4) RETURNING *',
            [event_id, req.user.id, task_name, priority]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/:id', protect, async (req, res) => {
    const { status } = req.body;
    try {
        await db.query('UPDATE tasks SET status = $1 WHERE id = $2', [status, req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;