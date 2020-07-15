const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.SERVER_PORT;
app.use(cors());
app.use(bodyParser.json());
const weatherAPIRoutes = require('./routes/weather');
app.use('/api/weather', weatherAPIRoutes);
http.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});
module.exports = app;
