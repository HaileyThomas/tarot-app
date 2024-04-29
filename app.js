const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cardsRoutes = require('./server/routes/cards-routes.js');
const spreadsRoutes = require('./server/routes/spreads-routes.js');
const slotsRoutes = require('./server/routes/slots-routes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/api', cardsRoutes);
app.use('/api', spreadsRoutes);
app.use('/api', slotsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});