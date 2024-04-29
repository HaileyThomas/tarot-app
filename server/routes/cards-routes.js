const express = require('express');
const router = express.Router();
const connection = require('../config.js');

router.get('/cards', (req, res) => {
    connection.query('SELECT * FROM cards', (error, results) => {
        if(error) return res.status(500).send(error);
        res.send(results);
    });
});

router.get('/cards/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM cards WHERE card_id = ?';

    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error retrieving card from the database.');
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Card not found');
        }
    });
});

module.exports = router;