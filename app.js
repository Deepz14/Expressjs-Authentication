const express = require('express');
const app = express();


app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'));



// Export app.js
module.exports = app;