const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());

// Load JSON data
const homeData = require('./data/home_data.json');
const publicWifiData = require('./data/public_wifi.json');
const academicNetworkData = require('./data/academic.json');

// Routes to serve JSON data
app.get('/api/home_data', (req, res) => {
    res.json(homeData);
});

app.get('/api/academic', (req, res) => {
    res.json(academicNetworkData);
});

app.get('/api/public_wifi', (req, res) => {
    res.json(publicWifiData);
});
// Basic test route
app.get('/', (req, res) => {
    res.send('REST API is running');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});