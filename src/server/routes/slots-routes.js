const express = require('express');
const router = express.Router();
const connection = require('../config.js');

router.get('/slots', (req, res) => {
    connection.query('SELECT * FROM slots', (error, results) => {
        if(error) return res.status(500).send(error);
        res.send(results);
    });
});

router.get('/slots/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM slots WHERE slot_id = ?';

    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error retrieving slot from the database.');
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Slot not found');
        }
    });
});


module.exports = router;