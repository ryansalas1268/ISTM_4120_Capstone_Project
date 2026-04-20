const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const { rows } = await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashed]
        );
        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: 'Email or username already taken' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;