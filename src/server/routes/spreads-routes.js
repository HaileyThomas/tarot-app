const express = require('express');
const router = express.Router();
const connection = require('../config.js');

router.get('/spreads', (req, res) => {
    connection.query('SELECT * FROM spreads', (error, results) => {
        if(error) return res.status(500).send(error);
        res.send(results);
    });
});

router.get('/spreads/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM spreads WHERE spread_id = ?';

    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error retrieving spread from the database.');
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Spread not found');
        }
    });
});

router.get('/spreads/:id/slots', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM slots WHERE spread_id = ?';

    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error retrieving slots from the database.');
        }
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send('No matching slots for provided Spread ID.');
        }
    });
});

module.exports = router;