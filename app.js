const express = require('express');
const app = express();


// IMPORT ALL ROUTES
const authRoutes = require('./routers/auth');


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTER MIDDLEWARES
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'));

// Error Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    .send({status: 'Error', message: error.message})
})

// Export app.js
module.exports = app;