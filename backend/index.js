const express = require('express');
const app = express();
app.get('/', (req, res) => res.status(200).send('API Running'));
module.exports = app;
